import { useEffect, useState } from "react";
import { fetchPostsHot } from "../lib/api";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPostsHot().then((posts) => {
            console.log(posts);
            setPosts(posts);
            setLoading(false);
        });
    }, []);

    return (
        <Layout>
            <div className="mx-auto max-w-3xl">
                {loading ? (
                    <h1>loading...</h1>
                ) : (
                    <PostsList className="mt-9" posts={posts} />
                )}
            </div>
        </Layout>
    );
}
