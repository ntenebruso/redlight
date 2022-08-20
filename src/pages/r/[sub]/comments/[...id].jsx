import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPost } from "../../../../lib/api";
import Layout from "../../../../components/Layout";
import Post from "../../../../components/Post";

export default function PostPage() {
    const router = useRouter();
    const { sub, id } = router.query;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        if (!router.isReady) return;
        console.log(sub, id);
        fetchPost(sub, id[0]).then((data) => {
            console.log(data);
            setData(data);
            setLoading(false);
        });
    }, [router.isReady]);

    return (
        <Layout>
            <div className="mx-auto max-w-3xl">
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <>
                        <Post
                            className="mt-4"
                            post={data.post.data}
                            inPost={true}
                        />
                        <div className="mt-4">
                            {data.comments.map((comment, index) => {
                                comment = comment.data;
                                return (
                                    <div className="flex mb-9">
                                        <div className="mr-4 w-12 text-center">
                                            <span className="bg-neutral-600 inline-block p-2 w-full rounded-md">
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        notation: "compact",
                                                        compactDisplay: "short",
                                                    }
                                                ).format(comment.score)}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p>u/{comment.author}</p>
                                            <div
                                                className="post-body mt-2"
                                                dangerouslySetInnerHTML={{
                                                    __html: comment.body_html,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
