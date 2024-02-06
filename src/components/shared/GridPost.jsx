import { Link } from 'react-router-dom';
import Loader from './Loader';
import Empty from './Empty';

function PostsGrid({ posts }) {
    if (!posts) {
        return (
            <div className="flex-center w-full h-20">
                <Loader />
            </div>
        );
    }

    return (
        <>
            {posts.length === 0 ? (
                <Empty
                    imageUrl="sad"
                    content="Ah...There aren't any posts"
                    icon="cry"
                />
            ) : (
                <div
                    className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3
                    sm:gap-2 gap-1"
                >
                    {posts.map((post) => {
                        return (
                            <Link
                                to={'/post-detail/' + post.$id}
                                key={post.$id}
                                className="relative block mb-4"
                            >
                                <img
                                    src={post.imageUrl}
                                    alt="post-image"
                                    className="object-cover w-full aspect-[1] rounded-lg"
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 top-0
                    h-full w-full overflow-hidden rounded-lg
                    bg-white bg-fixed opacity-0
                    transition duration-300 ease-in-out
                    hover:opacity-40"
                                ></div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default PostsGrid;
