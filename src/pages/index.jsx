import { useEffect, useState } from "react";
import { usePostsHot } from "../lib/api";
import PostsList from "../components/PostsList";
import Layout from "../components/Layout";

export default function Home() {
    const { posts, isLoading, isError } = usePostsHot();

    return (
        <Layout>
            <div className="mx-auto max-w-3xl">
                {isLoading ? (
                    <h1>loading...</h1>
                ) : (
                    <PostsList className="mt-9" posts={posts.data.children} />
                )}
            </div>
        </Layout>
    );
}
