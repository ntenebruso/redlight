import { useState } from "react";

export default function Comment({ comment, ...props }) {
    const [threadHidden, setThreadHidden] = useState(false);
    const [replies, setReplies] = useState(comment.replies);

    return (
        <div className={`flex mt-9 ${props.className}`} {...props}>
            <div className="mr-4 w-12 flex flex-col items-center text-center">
                {threadHidden ? (
                    <button
                        className="btn w-7 h-7 leading-none"
                        onClick={() => setThreadHidden(false)}
                    >
                        +
                    </button>
                ) : (
                    <>
                        <span className="bg-neutral-600 inline-block p-2 w-full rounded-md mb-4">
                            {new Intl.NumberFormat("en-US", {
                                notation: "compact",
                                compactDisplay: "short",
                            }).format(comment.score)}
                        </span>
                        <div
                            className="h-full w-1 bg-neutral-600 hover:cursor-pointer hover:bg-white"
                            onClick={() => setThreadHidden(true)}
                        />
                    </>
                )}
            </div>
            <div className="flex-1">
                <p className="font-bold">u/{comment.author}</p>
                {comment.total_awards_received > 0 && (
                    <div>
                        {comment.all_awardings.map((award, index) => (
                            <img
                                src={award.icon_url}
                                key={index}
                                title={award.name}
                                className="inline w-4 h-4 mr-1"
                            />
                        ))}
                    </div>
                )}
                <div
                    className={`post-body mt-2 ${
                        threadHidden ? "hidden" : "block"
                    }`}
                    dangerouslySetInnerHTML={{
                        __html: comment.body_html,
                    }}
                />
                {replies && (
                    <div className={threadHidden ? "hidden" : "block"}>
                        {replies.data.children.map((reply, index) =>
                            reply.kind == "more" ? (
                                <button
                                    className="btn alternative mt-4"
                                    key={index}
                                >
                                    load more
                                </button>
                            ) : (
                                <Comment comment={reply.data} key={index} />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
