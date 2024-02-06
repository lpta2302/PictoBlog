import { useEffect } from 'react';
import {
  CreateCard,
  Empty,
  GridPostList,
  Loader,
  SuggestedPeople,
} from '../../components';
import {
  useGetCurrentUser,
  useGetRecentPosts,
} from '../../lib/react-query/queries';

export default function Home() {
  const {
    data: recentPosts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex lg:pr-[368px]">
        <section className="flex flex-col w-[500px] mx-auto gap-3">
          <CreateCard currentUser={currentUser} />
          {isPostLoading || isErrorPosts ? (
            <Loader />
          ) : recentPosts.length === 0 ? (
            <Empty />
          ) : (
            <GridPostList posts={recentPosts} />
          )}
        </section>
        <section className="right-navbar w-[368px]">
          <SuggestedPeople currentUser={currentUser} />
        </section>
      </div>
    </div>
  );
}
