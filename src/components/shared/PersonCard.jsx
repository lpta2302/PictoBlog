import Loader from "./Loader";
import { Button } from "../index";
import { Link } from "react-router-dom";
import { useCreateFollow, useGetCurrentUser } from "../../lib/react-query/queries";
import {
  useToastContext,
} from "../../context";
import { useEffect, useState } from "react";

export default function PersonCard({ user }) {
  const { mutateAsync: createFollow } =
    useCreateFollow();

  const { data: currentUser } = useGetCurrentUser();

  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(()=>{
    setIsFollowing(currentUser
      .following.some(({following:{$id:accountId}})=>accountId===user.$id))
  },[currentUser])

  const { toast } = useToastContext();

  if (!user || !currentUser) {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }

  const handleFollow = async (e) => {
    e.preventDefault();

    const follow = createFollow({
      followerId: currentUser.$id,
      followedId: user.$id,
    });

    if (!follow) {
      toast({
        type: "error",
        title:
          "Failed to follow, please try again",
      });
      return;
    }

    setIsFollowing(true)
  };

  return (
    <Link
      to={"/profile/" + user.$id}
      className="flex w-full p-4 gap-2"
    >
      <div>
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="flex-center w-20 h-20">
            <Loader />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <p className="font-system line-clamp-1">
          {user.name}
        </p>
        <p className="font-system text-subtitle line-clamp-1">
          @{user.username}
        </p>
      </div>
      {!isFollowing && 
      (
        <div className="pt-1">
          <Button
            size="px-3 py-2"
            onClick={handleFollow}
          >
            Follow
          </Button>
        </div>
      )}
    </Link>
  );
}
