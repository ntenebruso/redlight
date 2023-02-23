import CommentsList from "@components/CommentsList";
import Post from "@components/Post";
import Spinner from "@components/Spinner";
import { fetchPost } from "@lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
        <div className="mx-auto max-w-3xl">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Post
                        className="mt-4"
                        post={data.post.data}
                        inPost={true}
                    />
                    <div className="mt-4 p-4 rounded-md bg-neutral-900 border-zinc-600 border-[1px] relative">
                        <CommentsList
                            comments={data.comments}
                            numComments={data.post.data.num_comments}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
