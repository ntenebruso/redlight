import { fetchFeed } from "../lib/api";
import { useSession } from "next-auth/react";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (session === undefined) return;

        fetchFeed(session && session.accessToken).then((posts) =>
            setPosts(posts)
        );
    }, [session]);

    return (
        <div className="mx-auto max-w-3xl">
            {!posts ? (
                <Spinner />
            ) : (
                <PostsList className="mt-9" posts={posts.data.children} />
            )}
        </div>
    );
}
