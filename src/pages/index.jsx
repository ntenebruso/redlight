import { fetchFeed } from "@lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PostsModal from "@components/PostsModal";
import PostsList from "@components/PostsList";
import Spinner from "@components/Spinner";

export default function Home() {
    const [posts, setPosts] = useState(null);
    const router = useRouter();
    const { sub, id } = router.query;

    useEffect(() => {
        fetchFeed().then((posts) => setPosts(posts));
    });

    return (
        <div className="mx-auto max-w-3xl">
            {!posts ? (
                <Spinner />
            ) : (
                <PostsList
                    className="mt-9"
                    posts={posts.data.children}
                    modal={true}
                />
            )}
            {sub && id && <PostsModal sub={sub} id={id} />}
        </div>
    );
}
