import Post from "./Post";

export default function PostsList({ posts, modal = false, ...props }) {
    return (
        <div {...props}>
            {posts.map((post, index) => (
                <Post
                    compact={true}
                    post={post.data}
                    key={index}
                    modal={modal}
                />
            ))}
        </div>
    );
}
