import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchSearchResults } from "@lib/api";
import PostsList from "@components/PostsList";
import Spinner from "@components/Spinner";

export default function Search() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const { q: query } = router.query;

    useEffect(() => {
        if (!query) return;
        console.log("fetching...");
        fetchSearchResults(query).then((posts) => {
            setPosts(posts.data.children);
            setLoading(false);
        });
    }, [query]);

    return (
        <div className="mx-auto max-w-3xl">
            <p className="mt-4 text-xl">Results for {query}</p>
            {loading ? (
                <Spinner />
            ) : (
                <PostsList
                    className="mt-4"
                    posts={posts}
                    modal={false}
                ></PostsList>
            )}
        </div>
    );
}
