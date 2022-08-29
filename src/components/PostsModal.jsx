import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { fetchPost } from "../lib/api";
import Post from "./Post";
import CommentsList from "./CommentsList";
import Spinner from "./Spinner";

export default function PostsModal({ sub, id }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const router = useRouter();

    useEffect(() => {
        console.log(sub, id);
        fetchPost(sub, id).then((data) => {
            console.log(data);
            setData(data);
            setLoading(false);
        });
    }, []);

    function handleClose() {
        router.push("/");
    }

    return (
        <Dialog open={true} onClose={handleClose}>
            <div className="fixed inset-0 bg-black opacity-30" />
            <Dialog.Panel>
                <div className="fixed inset-0 mt-10 max-w-6xl mx-auto overflow-scroll">
                    <button
                        onClick={handleClose}
                        className="btn fixed top-16 left-10"
                    >
                        Close
                    </button>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Post
                                className="mt-4"
                                post={data.post.data}
                                inPost={true}
                            />
                            <div className="mt-4 bg-neutral-900 p-4 rounded-md border-zinc-600 border-[1px]">
                                <CommentsList
                                    comments={data.comments}
                                    numComments={data.post.data.num_comments}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
