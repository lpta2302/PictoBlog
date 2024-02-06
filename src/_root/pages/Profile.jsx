import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    useCreateFollow,
    useDeleteFollow,
    useGetCurrentUser,
    useGetUserById,
} from '../../lib/react-query/queries';

import {
    Button,
    PeopleGrid,
    GhostButton,
    Loader,
    ReadMoreP,
    FilterNavbar,
    GridStatus,
    GridPost,
} from '../../components';
import { edit, returnIcon } from '../../../public/assets/icons';
import { useToastContext } from '../../context';
import { profileFilterNav } from '../../constants';
import DynamicComponents from '../../components/shared/DynamicComponents';
import { spread } from '../../utilities/reduceArray';

const listComponent = {
    post: GridPost,
    follower: PeopleGrid,
    following: PeopleGrid,
    liked: GridPost,
};

const typeArg = {
    follower({ currentUser, user, filter }) {
        return {
            users: spread[filter](user),
            currentUser,
        };
    },
    following({ currentUser, user, filter }) {
        return { users: spread[filter](user), currentUser };
    },
    post({ user }) {
        return { posts: user.posts };
    },
    liked({ user }) {
        return { posts: user.liked };
    },
};

export default function Profile() {
    const { id: userId } = useParams();

    const { data: user, isSuccess: hasUser } = useGetUserById(userId);
    const { data: currentUser, isSuccess: hasCurrentUser } =
        useGetCurrentUser();

    const { mutateAsync: createFollow } = useCreateFollow();
    const { mutateAsync: deleteFollow } = useDeleteFollow();

    const { toast } = useToastContext();

    const [followId, setFollowId] = useState();
    const [isFollowing, setIsFollowing] = useState();

    const [filter, setFilter] = useState(profileFilterNav[0]);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (user && currentUser) {
            const followId = currentUser.following.find(
                (follow) => follow.following.$id === user.$id,
            )?.$id;

            setIsFollowing(!!followId);
            setFollowId(followId);
        }
    }, [hasUser, hasCurrentUser]);

    const handleFollow = async () => {
        setIsFollowing(true);

        const createdFollow = await createFollow({
            followerId: currentUser.$id,
            followedId: user.$id,
        });

        if (!createdFollow) {
            toast({
                type: 'error',
                title: 'Failed to follow, please try again',
            });
            setIsFollowing(false);
            return;
        }

        setFollowId(createdFollow.$id);
    };

    const handleUnfollow = async () => {
        setIsFollowing(false);

        const deletedFollow = await deleteFollow(followId);

        if (!deletedFollow) {
            toast({
                type: 'error',
                title: 'Failed to unfollow, please try again',
            });
            setIsFollowing(true);
            return;
        }

        setFollowId(undefined);
    };

    if (!hasUser || !hasCurrentUser) {
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );
    }

    const isAnother = currentUser.$id != user.$id;

    return (
        <div
            className="
        flex-start flex-col sm:px-16 px-3 max-lg:py-12 gap-2 relative
      "
        >
            <GhostButton
                style="absolute md:top-4 lg:-top-4 left-4 top-0"
                rounded="rounded-full"
                onClick={() => navigate(-1)}
            >
                <img
                    src={returnIcon}
                    alt="back"
                    className="brightness-0 dark:invert sm:w-6 sm:h-6 w-5 h-5"
                />
            </GhostButton>
            <div className="flex justify-evenly max-sm:px-4 w-full max-lg:flex-col max-lg:gap-4">
                <div className="flex gap-10">
                    <Link
                        to={!isAnother && `/edit-profile/${user.$id}`}
                        className="block sm:w-36 sm:h-36 w-24 h-24 rounded-full overflow-hidden shadow-sm"
                    >
                        <img
                            src={user.imageUrl}
                            alt="avatar"
                            className="sm:w-36 sm:h-36 w-24 h-24 object-cover object-center"
                        />
                    </Link>
                    <div className="flex flex-col gap-4 flex-1 max-w-[352px]">
                        <div className="flex-start gap-4">
                            <div className="flex max-sm:flex-col sm:items-center sm:gap-2">
                                <p className="text-large font-system font-semibold leading-tight">
                                    {user.name}
                                </p>
                                <p className="text-small text-subtitle dark:text-subtitle leading-tight">
                                    @{user.username}
                                </p>
                            </div>
                            {!isAnother && (
                                <Link to={'/edit-profile/' + user.$id}>
                                    <img
                                        src={edit}
                                        alt="edit-profile"
                                        className="w-6 h-6 dark:make-white"
                                    />
                                </Link>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="max-lg:hidden">
                                <ReadMoreP maxLine={5}>{user.bio}</ReadMoreP>
                            </div>
                            <GridStatus
                                statuses={[
                                    {
                                        type: 'Post',
                                        payload: user.posts,
                                    },
                                    {
                                        type: 'Follower',
                                        payload: user.follower,
                                    },
                                    {
                                        type: 'Following',
                                        payload: user.following,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:hidden w-full">
                    <ReadMoreP font="text-small lg:text-sm">
                        {user.bio}
                    </ReadMoreP>
                </div>
                <div className=" max-lg:w-1/2 max-lg:mx-auto">
                    {isAnother &&
                        (isFollowing ? (
                            <Button
                                size="px-4 py-2"
                                bgColor={'bg-error'}
                                onClick={handleUnfollow}
                            >
                                Unfollow
                            </Button>
                        ) : (
                            isAnother && (
                                <Button size="px-4 py-2" onClick={handleFollow}>
                                    Follow
                                </Button>
                            )
                        ))}
                </div>
            </div>
            <FilterNavbar
                filter={filter}
                setFilter={setFilter}
                filterList={profileFilterNav}
                horizontal
            />
            {console.log(typeArg[filter]({ currentUser, user, filter }))}
            <DynamicComponents
                filter={filter}
                listComponent={listComponent}
                args={typeArg[filter]({ currentUser, user, filter })}
            />
        </div>
    );
}
