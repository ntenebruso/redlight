import Post from "./Post";

export default function PostsList({ posts, ...props }) {
    return (
        <div {...props}>
            {posts.map((post, index) => (
                <Post compact={true} post={post.data} key={index} />
            ))}
        </div>
    );
}
