import { Link } from "react-router-dom";
import Button from "../button/Button";
import {
  useCreateFollow,
  useDeleteFollow,
} from "../../lib/react-query/queries";
import { useLayoutEffect, useState } from "react";

export default function ColumnPersonCard({
  user,
  currentUser,
}) {
  const { mutateAsync: createFollow } =
    useCreateFollow();

  const { mutateAsync: deleteFollow } =
    useDeleteFollow();

  const [isFollowing, setIsFollowing] =
    useState();

  const [followId, setFollowId] = useState();

  useLayoutEffect(() => {
    const followId = currentUser.following.find(
      (follow) =>
        follow.following.$id === user.$id,
    )?.$id;

    setIsFollowing(!!followId);
    setFollowId(followId);
  }, []);

  const handleFollow = async (e) => {
    e.preventDefault();
    setIsFollowing(true);

    const createdFollow = await createFollow({
      followerId: currentUser.$id,
      followedId: user.$id,
    });

    if (!createdFollow) {
      toast({
        type: "error",
        title:
          "Failed to follow, please try again",
      });
      setIsFollowing(false);
      return;
    }

    setFollowId(createdFollow.$id);
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    setIsFollowing(false);

    const deletedFollow = await deleteFollow(
      followId,
    );

    if (!deletedFollow) {
      toast({
        type: "error",
        title:
          "Failed to unfollow, please try again",
      });
      setIsFollowing(true);
      return;
    }

    setFollowId(undefined);
  };

  return (
    <Link
      to={"/profile/" + user.$id}
      className="block mb-4 rounded-lg bg-white dark:bg-dark-item
      overflow-hidden box hover:opacity-90 transition shadow-primary
      max-w-48"
    >
      <img
        src={user.imageUrl}
        alt="post-image"
        className="object-cover aspect-[1]"
      />
      <div className="flex flex-col leading-tight sm:p-4 p-2">
        <p className="font-system text-medium truncate">
          {user.name}
        </p>
        <p className="text-subtitle text-small truncate">
          @{user.username}
        </p>
        <div className="pt-2">
          <Button
            size="px-3 py-2"
            bgColor={
              isFollowing ? "bg-error" : null
            }
            onClick={
              isFollowing
                ? handleUnfollow
                : handleFollow
            }
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
