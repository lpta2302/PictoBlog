import {
  useGetCurrentUser,
  useGetExplorePosts,
  useSearchPosts,
} from '../../lib/react-query/queries';

import { usePassParam } from '../../hooks';
import {
  Empty,
  GhostButton,
  GridPostList,
  Loader,
  Post,
  SearchBar,
  Title,
} from '../../components';
import { useEffect, useState } from 'react';
import { close, explore } from '../../../public/assets/icons';
import { spread } from '../../utilities/reduceArray';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

export default function Explore() {
  const [showSearchPost, setShowSearchPost] = useState(false);
  const { inView, ref } = useInView();

  const { data: currentUser } = useGetCurrentUser();

  const { param: searchParam, setParam: setSearchParam } = usePassParam();

  const { param: postParam, setParam: setPostParam } = usePassParam();

  let {
    data: posts,
    isSuccess: hasPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetExplorePosts(postParam);

  if (posts) posts = spread.pages(posts);

  const { data: searchResult, isSuccess: hasSearchResult } =
    useSearchPosts(searchParam);

  useEffect(() => {
    if (currentUser) setPostParam(currentUser.posts.map((post) => post.$id));
  }, [currentUser]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const handleSearch = async ({ search: data }) => {
    if (!data) return;

    setShowSearchPost(true);

    setSearchParam({
      searchType: 'caption',
      searchTerm: data,
    });
  };

  return (
    <div className="lg:pr-[386px]">
      <Title imageUrl={explore} title={'Explore'} />
      <section className="flex flex-col max-w-[636px] gap-3 px-2 mx-auto">
        {showSearchPost ? (
          !hasSearchResult ? (
            <div className="flex-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="flex-between">
                <h1 className="text-2xl font-system">Search Result</h1>
                <GhostButton
                  size="w-10 h-10"
                  onClick={() => setShowSearchPost(false)}
                >
                  <img
                    src={close}
                    alt="close"
                    className="w-5 h-5 dark:make-white"
                  />
                </GhostButton>
              </div>
              <GridPostList posts={searchResult} />
            </>
          )
        ) : !hasPosts ? (
          <Loader />
        ) : posts.length === 0 ? (
          <Empty
            imageUrl="surfing"
            content={
              <Link to="/create-post/">
                So silent right? Let's make some noise{' '}
                <span className="text-primary">ClickMe</span>
              </Link>
            }
          />
        ) : (
          posts.map((post) => <Post key={post.$id} post={post} />)
        )}
        {hasNextPage && (
          <div ref={ref}>
            <Loader />
          </div>
        )}
      </section>
      <div className="right-navbar w-[386px]">
        <div className="p-4 border-b border-primary">
          <SearchBar onSubmit={handleSearch} />
        </div>
      </div>
    </div>
  );
}
