import { Link, useParams } from 'react-router-dom';

import { useGetPostById } from '../../lib/react-query/queries';
import { edit, locationPin } from '../../../public/assets/icons';
import ToStringTime from '../../utilities/handleTime';
import { Loader, PostState, ReadMoreP } from '../../components';
import { useEffect, useRef, useState } from 'react';
import Toolbar from '../../components/shared/Toolbar';
import { useUserContext } from '../../context';

function PostDetail() {
  const { id: postId } = useParams();
  const { data: post } = useGetPostById(postId);
  const { user } = useUserContext();

  const captionRef = useRef();
  const [captionState, setCaptionState] = useState(null);

  useEffect(() => {
    if (captionRef?.current?.offsetHeight > 120) setCaptionState('read more');
  }, [post]);

  const handleCaptionState = () => {
    if (captionState === 'read more') setCaptionState('read less');
    else setCaptionState('read more');
  };

  if (!post || !user.$id) {
    return (
      <div className="flex-center w-full h-20">
        <Loader />
      </div>
    );
  }

  const isAnotherUser = user.$id === post.creator.$id;

  return (
    <div
      className="
        lg:h-screen max-container
        flex max-lg:flex-col max-lg:pt-16
        rounded-md
      "
    >
      <Toolbar />
      <div className="flex-center flex-1 bg-dark-1 lg:h-screen h-[50vh] bg-dark-4">
        <img
          src={post.imageUrl}
          alt="post-image"
          className="object-contain lg:max-h-screen max-h-[50vh]"
        />
      </div>
      <div
        className="flex flex-col gap-4
        px-4 lg:pt-16 pt-4 pb-4 lg:w-sm
        overflow-auto"
      >
        <div
          className="
          flex flex-col gap-2 py-2
          border-y border-primary
        "
        >
          <div className="flex-between">
            <div className="flex gap-4">
              <img
                src={post.creator.imageUrl}
                alt="avatar"
                className="xs:w-11 w-10 object-cover rounded-md"
              />
              <div className="flex-1 flex flex-col">
                <h3 className="text-large font-system font-semibold">
                  {post.creator.name}
                </h3>
                <div className="flex-1 flex-between pr-4 text-small text-subtitle">
                  <p>{ToStringTime(post.$createdAt)}</p>
                </div>
              </div>
            </div>
            <Link
              to={!isAnotherUser && '/edit-post/' + post.$id}
              className="flex-center"
            >
              <img
                src={edit}
                alt=""
                height={24}
                width={24}
                className="dark:make-white"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <ReadMoreP>
                {post.caption}
            </ReadMoreP>
            {captionState && (
              <span
                className="text-subtitle cursor-pointer"
                onClick={handleCaptionState}
              >
                {captionState}
              </span>
            )}
            {post.location && (
              <div className="flex-start gap-2">
                <img
                  src={locationPin}
                  alt="location-pin"
                  height={24}
                  width={24}
                  className="dark:make-white"
                />
                <p className="text-medium font-normal">{post.location}</p>
              </div>
            )}
            {post.tags?.length > 0 && (
              <p className="text-medium text-subtitle font-normal">
                #{post.tags.join('#')}
              </p>
            )}
          </div>
        </div>
        {post && user.$id !== post.creator.$id && (
          <PostState post={post} userId={user.$id} />
        )}
      </div>
    </div>
  );
}

export default PostDetail;
