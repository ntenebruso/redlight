import { fetchFeed } from "@lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import PostsModal from "@components/PostsModal";
import PostsList from "@components/PostsList";
import Spinner from "@components/Spinner";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { sub, id } = router.query;

    const feeds = ["Best", "Hot", "New", "Top"];
    const [currentFeed, setCurrentFeed] = useState("best");

    useEffect(() => {
        console.log("fetching...");
        fetchFeed(currentFeed).then((posts) => {
            setPosts(posts.data.children);
            setLoading(false);
        });
    }, [currentFeed]);

    function fetchMorePosts() {
        const lastPostName = posts[posts.length - 1].data.name;
        fetchFeed(currentFeed, lastPostName).then((newPosts) =>
            setPosts([...posts, ...newPosts.data.children])
        );
    }

    return (
        <div className="mx-auto max-w-3xl">
            <Tab.Group
                onChange={(index) => {
                    setLoading(true);
                    setCurrentFeed(feeds[index].toLowerCase());
                }}
            >
                <Tab.List className="mt-4 inline-flex rounded-md bg-neutral-900 overflow-hidden">
                    {feeds.map((feed, index) => (
                        <Tab
                            key={index}
                            className={({ selected }) =>
                                `inline-block py-2 px-3 transition-colors outline-none ${
                                    selected
                                        ? "bg-red-400"
                                        : "hover:underline hover:bg-neutral-800"
                                }`
                            }
                        >
                            {feed}
                        </Tab>
                    ))}
                </Tab.List>
            </Tab.Group>
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
