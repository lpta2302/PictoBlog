import Post from './Post';

export default function GridPostList({ posts }) {
    return (
        <div className="flex flex-col gap-3">
            {posts.map((post) => (
                <Post key={post.$id} post={post} />
            ))}
        </div>
    );
}
