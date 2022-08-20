import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPost } from "../../../../lib/api";
import Layout from "../../../../components/Layout";
import Post from "../../../../components/Post";
import Comment from "../../../../components/Comment";

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
                                return (
                                    <Comment
                                        comment={comment.data}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
