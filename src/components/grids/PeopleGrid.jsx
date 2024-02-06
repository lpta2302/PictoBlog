import { ColumnPersonCard, Empty } from '../index';
import Loader from '../shared/Loader';

const content = {
  follower: "Rain or shine, I'm your forever friend!",
  following: 'Aye  follow for updates and shared moments!',
};

const icon = {
    follower: 'hug',
    following: 'enjoy',
}

function PeopleGrid({ users, hasRightNav, currentUser,filter }) {
  if (!users) {
    return (
      <div className="flex-center w-full h-20">
        <Loader />
      </div>
    );
  }

  return users.length === 0 ? (
    <Empty
      content={content[filter] || "Rain or shine, I'm your forever friend!"}
      icon={icon[filter] || "fun"}
    />
  ) : (
    <div
      className={`lg:px-4 px-2 gap-1 sm:gap-2 grid md:grid-cols-4 grid-cols-3
            ${hasRightNav ? 'lg:grid-cols-4' : 'lg:grid-cols-5'}
          `}
    >
      {users.map((user) => {
        return (
          <ColumnPersonCard
            key={user.$id}
            user={user}
            currentUser={currentUser}
          />
        );
      })}
    </div>
  );
}

export default PeopleGrid;
