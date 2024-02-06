export function reduceFollowing(followingList) {
    return followingList.following.map((follow) => follow.following);
}

export function reduceFollower(followerList) {
    return followerList.follower.map((follow) => follow.follower);
}

export function reducePages(data) {
    return data?.pages.reduce((acc, cur) => [...acc, ...cur], []);
}

export function spread() {}

spread.save = (currenUser) => {
    return currenUser?.save.reduce((acc, cur) => [...acc, cur.post.$id], []);
};

spread.pages = (data) => {
    return data?.pages.reduce((acc, cur) => [...acc, ...cur], []);
};

spread.follower = (followerList) => {
    return followerList.follower.map((follow) => follow.follower);
};

spread.following = (followingList) => {
    return followingList.following.map((follow) => follow.following);
};
