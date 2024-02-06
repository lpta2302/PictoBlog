import GridStatus from "./GridStatus";

export default function ProfileIntroduce({
  user,
}) {
  return (
    <div className="flex justify-evenly max-sm:px-4 w-full max-lg:flex-col max-lg:gap-4">
      <div className="flex gap-10">
        <div className="block sm:w-36 sm:h-36 w-24 h-24 rounded-full overflow-hidden shadow-sm">
          <img
            src={user.imageUrl}
            alt="avatar"
            className="sm:w-36 sm:h-36 w-24 h-24 relative"
          />
        </div>
        <div className="flex flex-col gap-4 flex-1 max-w-[352px]">
          <div className="flex-start gap-4">
            <div className="flex max-sm:flex-col sm:items-center sm:gap-2">
              <p className="text-large font-system leading-tight">
                {user.name}
              </p>
              <p className="text-small text-subtitle font-system dark:text-subtitle leading-tight">
                @{user.username}
              </p>
            </div>
          </div>
          <div className="flex flex-col max-sm:flex-col-reverse gap-2">
            <GridStatus
              statuses={[
                {
                  type: "Post",
                  payload: user.posts,
                },
                {
                  type: "Follower",
                  payload: user.follower,
                },
                {
                  type: "Following",
                  payload: user.following,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
