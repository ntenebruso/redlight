import { usePostsHot } from "../lib/api";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";

export default function Home() {
    const { posts, isLoading, isError } = usePostsHot();

    return (
        <div className="mx-auto max-w-3xl">
            {isLoading ? (
                <Spinner />
            ) : (
                <PostsList className="mt-9" posts={posts.data.children} />
            )}
        </div>
    );
}
