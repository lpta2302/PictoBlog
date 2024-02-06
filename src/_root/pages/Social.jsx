import { useEffect, useRef, useState } from 'react';
import { close, people, search } from '../../../public/assets/icons';
import {
  Loader,
  SearchBar,
  FilterNavbar,
  FilterRightNavbar,
  GhostButton,
  DynamicComponents,
  PeopleGrid,
} from '../../components';
import { socialFilterNav } from '../../constants';
import {
  useGetCurrentUser,
  useGetSuggestedPeople,
  useSearchUser,
} from '../../lib/react-query/queries';
import { spread } from '../../utilities/reduceArray';
import { usePassParam } from '../../hooks';
import { searchParam } from '../../utilities';
import { useInView } from 'react-intersection-observer';

const Suggest = ({ currentUser }) => {
  const { inView, ref } = useInView();

  const {
    data: people,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useGetSuggestedPeople([...spread.following(currentUser), currentUser]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      {!isSuccess ? (
        <Loader />
      ) : (
        <>
          <PeopleGrid
            hasRightNav
            users={spread.pages(people)}
            currentUser={currentUser}
          />
          {hasNextPage && <Loader ref={ref} />}
        </>
      )}
    </>
  );
};

const Follow = ({ currentUser, filter }) => {
  return currentUser ? (
    <PeopleGrid
      hasRightNav
      users={spread[filter](currentUser)}
      currentUser={currentUser}
      filter={filter}
    />
  ) : (
    <Loader />
  );
};

const typePeople = {
  suggest: Suggest,
  follower: Follow,
  following: Follow,
};

export default function Social() {
  const searchbarRef = useRef();

  const [filter, setFilter] = useState(socialFilterNav[0]);

  const [searchResult, setSearchResult] = useState();

  const [isSearching, setIsSearching] = useState(false);

  const { param, setParam } = usePassParam();

  const { data: currentUser, isSuccess: hasCurrentUser } = useGetCurrentUser();

  const { data: searchedUsers } = useSearchUser(param);

  const handleSearch = async ({ search: data }) => {
    data = data.toLowerCase();

    const { searchTerm, searchType } = searchParam(data, 'user');

    if (filter.includes('follow')) {
      setSearchResult(
        spread[filter](currentUser).filter((user) =>
          user[searchType].toLowerCase().includes(searchTerm),
        ),
      );
    } else {
      setParam({
        searchTerm,
        searchType,
        filter: currentUser,
      });
    }
  };

  useEffect(() => {
    setSearchResult(searchedUsers);
  }, [searchedUsers, param]);

  useEffect(() => {
    setSearchResult(undefined);
  }, [filter]);

  return (
    <div className="max-lg:pt-4 lg:pr-56">
      <div className="lg:px-16 px-4">
        <div className="flex-between">
          <div className="flex-start gap-4">
            <img
              src={people}
              alt="social"
              className="dark:make-white
                            sm:w-10 sm:h-10 w-8 h-8"
            />
            <h1 className="sm:text-2xl font-semibold font-system text-primary-1 dark:text-white">
              Social
            </h1>
          </div>
          <GhostButton
            rounded="rounded-full"
            size="h-10 w-10 xs:w-11 xs:h-11"
            style="flex-center"
            bgColor="dark:bg-dark-4 bg-off-white"
            onClick={
              isSearching
                ? () => {
                    searchbarRef.current.classList.add('animate-slideUp');
                    setTimeout(() => {
                      setIsSearching(false);
                    }, 100);
                  }
                : () => setIsSearching(true)
            }
          >
            <img
              src={isSearching ? close : search}
              alt="search"
              className={`
                  ${
                    isSearching
                      ? 'w-4 h-4 dark:invert dark:contrast-0 brightness-0'
                      : 'xs:w-7 xs:h-7 w-6 h-6 dark:grayscale dark:brightness-100 brightness-0'
                  }
                `}
            />
          </GhostButton>
        </div>
        {isSearching && (
          <div className="py-3 animate-slideDown" ref={searchbarRef}>
            <SearchBar
              onSubmit={handleSearch}
              placeholder="Search by name or @username"
            />
          </div>
        )}
        <div
          className={`
                      lg:pb-4 mb-8 border-b border-primary w-full
                    `}
        >
          <FilterNavbar
            filter={filter}
            setFilter={setFilter}
            horizontal
            filterList={socialFilterNav}
            style="lg:hidden"
          />
        </div>
      </div>
      {searchResult ? (
        <PeopleGrid
          hasRightNav
          currentUser={currentUser}
          users={searchResult}
        />
      ) : currentUser ? (
        <DynamicComponents
          filter={filter}
          listComponent={typePeople}
          args={{ currentUser, filter }}
        />
      ) : (
        <Loader />
      )}

      <FilterRightNavbar
        filterState={{ filter, setFilter }}
        filterList={socialFilterNav}
        title="From"
      />
    </div>
  );
}
