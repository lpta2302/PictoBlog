import { useRef, useState } from 'react';
import { close, search } from '../../../public/assets/icons';
import {
    SearchBar,
    FilterNavbar,
    FilterRightNavbar,
    GhostButton,
    Empty,
    Loader,
    GridPostList,
    PeopleGrid,
    DynamicComponents,
} from '../../components';
import { searchFilterNav } from '../../constants';
import { usePassParam } from '../../hooks';
import {
    useGetCurrentUser,
    useSearchPosts,
    useSearchUser,
} from '../../lib/react-query/queries';
import { searchParam } from '../../utilities';

const Post = ({ param }) => {
    const { data: posts, isSuccess: hasPosts } = useSearchPosts(param);

    return !hasPosts ? (
        <Loader />
    ) : posts.length === 0 ? (
        <Empty
            imageUrl="worry"
            content={`Sorry,... We can't find any post has caption having keyword "${param.searchTerm}"`}
            icon="sorry"
        />
    ) : (
        <div className="flex flex-col sm:max-w-[636px] gap-3 px-2 mx-auto">
            <GridPostList posts={posts} />
        </div>
    );
};

const People = ({ currentUser, param }) => {
    const { data: users, isSuccess: hasUsers } = useSearchUser(param);

    return !hasUsers ? (
        <Loader />
    ) : users.length === 0 ? (
        <Empty
            content={`Sorry,... We can't find any user has ${param.searchType} having keyword "${param.searchTerm}"`}
            icon="sorry"
        />
    ) : (
        <PeopleGrid users={users} currentUser={currentUser} hasRightNav />
    );
};

const typeSearching = {
    post: Post,
    people: People,
    location: Post,
};

export default function Search() {
    const { param, setParam } = usePassParam();
    const searchbarRef = useRef();
    const { data: currentUser, isLoading: isGettingCurrentUser } =
        useGetCurrentUser();

    const [filter, setFilter] = useState(searchFilterNav[0]);

    const [isSearching, setIsSearching] = useState(true);

    const handleSearch = ({ search: data }) => {
        data = data.toLowerCase();
        setParam(
            searchParam(
                data,
                filter === 'people' ? 'user' : filter,
                currentUser,
            ),
        );
    };

    const handleSetFilter = (item) => {
        if (param)
            setParam(
                searchParam(
                    param.searchTerm,
                    item === 'people' ? 'user' : item,
                    currentUser,
                ),
            );

        setFilter(item);
    };

    return (
        <div className=" max-lg:pt-4 lg:pr-56">
            <div className="lg:px-16 px-4">
                <div className="flex-between">
                    <div className="flex-start gap-4">
                        <img
                            src={search}
                            alt="search"
                            className="dark:make-white
                sm:w-10 sm:h-10 w-8 h-8"
                        />
                        <h1 className="sm:text-2xl font-semibold font-system text-primary-1 dark:text-white">
                            Search
                        </h1>
                    </div>
                    <GhostButton
                        rounded="rounded-full"
                        size="h-8 w-8 xs:w-11 xs:h-11"
                        style="flex-center"
                        bgColor="dark:bg-dark-4 bg-off-white"
                        onClick={
                            isSearching
                                ? () => {
                                      searchbarRef.current.classList.add(
                                          'animate-slideUp',
                                      );
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
                          ? 'xs:w-4 xs:h-4 w-3 h-3 dark:grayscale dark:contrast-0 brightness-0'
                          : 'xs:w-7 xs:h-7 w-6 h-6 dark:grayscale dark:brightness-100 brightness-0'
                  }
                `}
                        />
                    </GhostButton>
                </div>
                {isSearching && (
                    <div className="py-1 animate-slideDown" ref={searchbarRef}>
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
                        setFilter={handleSetFilter}
                        horizontal
                        filterList={searchFilterNav}
                        style="lg:hidden"
                    />
                </div>
            </div>
            {isGettingCurrentUser ? (
                <Loader />
            ) : param ? (
                <DynamicComponents
                    filter={filter}
                    listComponent={typeSearching}
                    args={{ currentUser, param }}
                />
            ) : (
                <Empty
                    imageUrl="surfing"
                    content="What're you looking for?"
                    icon="sleepy"
                />
            )}

            <FilterRightNavbar
                filterState={{
                    filter,
                    setFilter: handleSetFilter,
                }}
                filterList={searchFilterNav}
                title="Finding"
            />
        </div>
    );
}
