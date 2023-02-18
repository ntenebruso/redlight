import { fetchFeed } from "@lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PostsModal from "@components/PostsModal";
import PostsList from "@components/PostsList";
import Spinner from "@components/Spinner";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { sub, id } = router.query;

    useEffect(() => {
        fetchFeed().then((posts) => {
            setPosts(posts.data.children);
        });
    }, []);

    function fetchMorePosts() {
        const lastPostName = posts[posts.length - 1].data.name;
        fetchFeed(lastPostName).then((newPosts) =>
            setPosts([...posts, ...newPosts.data.children])
        );
    }

    return (
        <div className="mx-auto max-w-3xl">
            {!posts.length ? (
                <Spinner />
            ) : (
                <>
                    <PostsList className="mt-9" posts={posts} modal={true} />
                    <button
                        className="btn inline-block mx-auto mb-4"
                        onClick={fetchMorePosts}
                    >
                        Fetch more...
                    </button>
                </>
            )}
            {sub && id && <PostsModal sub={sub} id={id} />}
        </div>
    );
}
