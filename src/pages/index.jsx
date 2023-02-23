import { fetchFeed } from "@lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PostsModal from "@components/PostsModal";
import PostsList from "@components/PostsList";
import Spinner from "@components/Spinner";
import FilterTabs from "@components/FilterTabs";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { sub, id } = router.query;

    const filters = ["Best", "Hot", "New", "Top"];
    const [currentFilter, setCurrentFilter] = useState("best");

    useEffect(() => {
        console.log("fetching...");
        fetchFeed(currentFilter).then((posts) => {
            setPosts(posts.data.children);
            console.log("full list", posts.data.children);
            setLoading(false);
        });
    }, [currentFilter]);

    function fetchMorePosts() {
        const lastPostName = posts[posts.length - 1].data.name;
        fetchFeed(currentFilter, lastPostName).then((newPosts) =>
            setPosts([...posts, ...newPosts.data.children])
        );
    }

    return (
        <div className="mx-auto max-w-3xl">
            <FilterTabs
                filters={filters}
                onChange={(index) => {
                    setLoading(true);
                    setCurrentFilter(filters[index].toLowerCase());
                }}
            />
            {loading ? (
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
