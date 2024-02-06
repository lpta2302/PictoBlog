import { useEffect, useLayoutEffect, useState } from 'react';
import {
  deleteSaveIcon,
  saveIcon,
  savedIcon,
} from '../../../public/assets/icons';
import { Empty, Loader, Title } from '../../components';

import { Link } from 'react-router-dom';
import {
  useGetCurrentUser,
  useUnSavePost,
} from '../../lib/react-query/queries';
import { useToastContext } from '../../context';

export default function Saved() {
  const [savedPosts, setSavedPosts] = useState();

  const { toast } = useToastContext();

  const { data: currentUser, isSuccess: hasCurrentUser } = useGetCurrentUser();

  useEffect(() => {
    console.log(hasCurrentUser);
    console.log(currentUser?.save.map((save) => save));
    if (currentUser) setSavedPosts(currentUser.save.map((save) => save));
  }, [currentUser]);

  const { mutateAsync: unsavePost } = useUnSavePost();

  const handleUnsave = async (e, saveRecord) => {
    e.preventDefault();
    const deletedSave = await unsavePost(saveRecord);

    if (!deletedSave) {
      toast({
        type: 'error',
        title: 'Failed to unsave post, please try again.',
      });
      throw Error;
    }

    toast({
      type: 'success',
      title: 'You have unsaved a post.',
    });

    setSavedPosts(currentUser.save.map((save) => save));
  };

  return (
    <div className="flex-center flex-col lg:pr-[328px]">
      <Title imageUrl={saveIcon} title={'Saved Posts'} />
      <section className="flex flex-col flex-1 max-w-[636px] gap-3 px-2 mx-auto">
        <div className="flex flex-col gap-3">
          {!savedPosts ? (
            <Loader />
          ) : savedPosts.length === 0 ? (
            <Empty
              imageUrl="surfing"
              content={"You haven't saved any post"}
              icon="hug"
            />
          ) : (
            savedPosts.map(({ post, $id }) => (
              <Link
                key={$id}
                to={`/post-detail/` + post.$id}
                className="flex w-full rounded-md overflow-hidden bg-dark-item sm:gap-2 gap-1 sm:p-2 [&:not(:has(button:hover))]:hover:opacity-80"
              >
                <div>
                  <img
                    src={post.imageUrl}
                    alt="post-image"
                    className="sm:w-40 sm:h-40 w-20 h-20 object-cover object-center rounded-sm"
                  />
                </div>
                <div className="flex-between flex-col flex-1 p-3 sm:gap-2 gap-1">
                  <h3 className="max-sm:text-[0.65rem] leading-tight font-system font-semibold sm:line-clamp-2 line-clamp-3">
                    {post.caption}
                  </h3>
                  <div className="flex-end w-full">
                    <button onClick={(e) => handleUnsave(e, { post, $id })}>
                      <img
                        src={deleteSaveIcon}
                        alt="delete-save"
                        className="sm:w-6 sm:h-6 w-4 h-4 dark:make-white hover:opacity-80"
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
