import { fetchSubInfo, fetchSubPosts } from "@lib/api";
import PostsList from "@components/PostsList";
import FilterTabs from "@components/FilterTabs";
import { useState, useEffect } from "react";
import Spinner from "@components/Spinner";
import { useRouter } from "next/router";

export default function SubPage() {
    const router = useRouter();
    const { sub } = router.query;

    const filters = ["Hot", "New"];
    const [currentFilter, setCurrentFilter] = useState("hot");

    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [data, setData] = useState();
    const [posts, setPosts] = useState();

    useEffect(() => {
        if (!router.isReady) return;

        fetchSubInfo(sub).then((data) => {
            console.log("info", data);
            setData(data?.data);
            setLoading(false);
        });
    }, [router.isReady]);

    useEffect(() => {
        if (!router.isReady) return;

        fetchSubPosts(sub, currentFilter).then((data) => {
            console.log("posts", data);
            setPosts(data?.data?.children);
            setPostsLoading(false);
        });
    }, [router.isReady, currentFilter]);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : data ? (
                <>
                    <div
                        className="w-full h-[230px] flex items-center justify-center bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${data.banner_background_image})`,
                            backgroundColor: data.banner_background_color,
                        }}
                    >
                        {data.community_icon && data.community_icon.length ? (
                            <img
                                src={data.community_icon}
                                className="w-24 h-24 rounded-full border-4 border-white"
                            />
                        ) : (
                            <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-white text-7xl bg-white text-black">
                                {data.display_name[0]}
                            </div>
                        )}
                    </div>
                    <div className="max-w-5xl mx-auto mt-4">
                        <h2 className="text-2xl font-bold">
                            r/{data.display_name}
                        </h2>
                        <FilterTabs
                            className="mt-4"
                            filters={filters}
                            onChange={(index) => {
                                setCurrentFilter(filters[index].toLowerCase());
                                setPostsLoading(true);
                            }}
                        />
                        {postsLoading ? (
                            <Spinner />
                        ) : posts ? (
                            <PostsList
                                className="mt-4"
                                posts={posts}
                                modal={false}
                            />
                        ) : (
                            <p>Nothing to see here</p>
                        )}
                    </div>
                </>
            ) : (
                <h2 className="mt-4 text-2xl text-center">Sub not found.</h2>
            )}
        </div>
    );
}
