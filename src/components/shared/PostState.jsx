import { useEffect, useState } from 'react';

import {
    likeIcon,
    likedIcon,
    saveIcon,
    savedIcon,
} from '../../../public/assets/icons';
import {
    useGetCurrentUser,
    useSavePost,
    useUnSavePost,
    useUpdateLikePost,
} from '../../lib/react-query/queries';

function PostState({ post, userId }) {
    const likeList = post.likes.map((user) => user.$id);
    const [likes, setLikes] = useState(likeList);
    const [isSaved, setIsSaved] = useState();

    const { mutate: likePost } = useUpdateLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: unsavePost } = useUnSavePost();

    const { data: currentUser } = useGetCurrentUser();

    const saveRecord = currentUser?.save?.find(
        (saveRecord) => saveRecord.post.$id === post.$id,
    );

    const handleLike = () => {
        let likeArray = [...likes];

        if (likes.includes(userId)) {
            likeArray = likeArray.filter((id) => id !== userId);
        } else {
            likeArray.push(userId);
        }

        likePost({ postId: post.$id, likeArray });

        setLikes(likeArray);
    };

    const handleSave = () => {
        if (saveRecord) {
            unsavePost(saveRecord);
            return setIsSaved(false);
        }

        savePost({ userId, postId: post.$id });
        setIsSaved(true);
    };

    useEffect(() => {
        setIsSaved(!!saveRecord);
    }, [currentUser]);

    return (
        <div className="flex-between px-2">
            <div className="flex gap-4">
                <button>
                    <img
                        src={likes.includes(userId) ? likedIcon : likeIcon}
                        alt="like"
                        onClick={handleLike}
                        className="hover:brightness-125 dark:hover:opacity-80 dark:make-white transition w-5 h-5"
                    />
                </button>
                <p className="text-slate-gray">{likes?.length}</p>
            </div>
            <button onClick={handleSave}>
                <img
                    src={isSaved ? savedIcon : saveIcon}
                    alt="save"
                    className="hover:brightness-125 dark:hover:opacity-80 dark:make-white transition w-5 h-5"
                />
            </button>
        </div>
    );
}

export default PostState;
