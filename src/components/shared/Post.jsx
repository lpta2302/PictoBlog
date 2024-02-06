import { Link } from 'react-router-dom';

import {
  edit,
  locationPin,
  deleteIcon,
  globe,
  people,
} from '../../../public/assets/icons';
import ToStringTime from '../../utilities/handleTime';
import PostState from './PostState';
import ReadMoreP from '../paragraph/ReadMoreP';
import { useToastContext, useUserContext } from '../../context';
import { useDeletePost } from '../../lib/react-query/queries';

function Post({ post }) {
  const {
    $id,
    caption,
    tags,
    location,
    imageUrl,
    creator: { name: creatorName, $id: creatorId, imageUrl: avatar },
    $createdAt,
    isPublic,
  } = post;

  const { user: currentUser } = useUserContext();

  const { toast } = useToastContext();

  const { mutateAsync: deletePost } = useDeletePost();

  const isOwnPost = creatorId === currentUser.$id;

  const handleDelete = async () => {
    const deletedPost = await deletePost(post);

    if (!deletedPost) {
      toast({
        title: 'Some thing went wrong, please try again!',
        type: 'error',
      });
      return;
    }

    toast({
      title: 'You have deleted a post',
      type: 'success',
    });
  };

  return (
    <div
      className="
    flex flex-col lg:gap-4 gap-2 py-4 rounded-md
    w-full bg-white dark:bg-dark-item shadow-primary"
    >
      <div className="flex flex-col gap-4 px-4">
        <div className="flex-between">
          <div className="flex gap-4">
            <Link to={`/profile/${creatorId}`}>
              <img
                src={avatar}
                alt="avatar"
                className="xs:w-11 xs:h-11 w-10 h-10 object-cover rounded-md"
              />
            </Link>
            <div className="flex-1 flex flex-col">
              <Link to={`/profile/${creatorId}`}>
                <h3 className="text-medium font-system font-bold">
                  {creatorName}
                </h3>
              </Link>
              <div className="flex-1 flex-between pr-4 text-small font-system font-semibold text-subtitle gap-1">
                {ToStringTime($createdAt)}
                <img
                  src={isPublic ? globe : people}
                  alt="scope"
                  width={16}
                  height={16}
                  className="dark:grayscale"
                />
              </div>
            </div>
          </div>
          {isOwnPost && (
            <div className="flex gap-3">
              <button onClick={handleDelete}>
                <img
                  src={deleteIcon}
                  alt="delete"
                  height={24}
                  width={24}
                  className="hover:opacity-80"
                />
              </button>
              <Link to={'/edit-post/' + $id} className="flex-center">
                <img
                  src={edit}
                  alt=""
                  height={24}
                  width={24}
                  className="hover:brightness-125 dark:hover:opacity-80 dark:make-white transition"
                />
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <ReadMoreP>{caption}</ReadMoreP>
          {location && (
            <div className="flex-start gap-2">
              <img
                src={locationPin}
                alt="location-pin"
                height={20}
                width={20}
                className="dark:make-white"
              />
              <p className="text-medium font-system">{location}</p>
            </div>
          )}
          {tags?.length > 0 && (
            <p className="text-medium text-subtitle dark:text-subtitle font-normal font-system">
              #{tags.join('#')}
            </p>
          )}
        </div>
      </div>
      <Link to={'/post-detail/' + $id}>
        <img
          src={imageUrl}
          alt="post-image"
          className={`
                      object-cover w-full
                    `}
          onLoad={(e) => {
            if (e.target.offsetHeight > (e.target.offsetWidth * 3) / 2)
              e.target.classList.add('aspect-[2/3]');
          }}
        />
      </Link>
      {currentUser.$id !== creatorId && (
        <PostState post={post} userId={currentUser.$id} />
      )}
    </div>
  );
}

export default Post;
