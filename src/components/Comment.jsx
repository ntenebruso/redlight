import { useState, useEffect, useRef } from "react";
import { fetchMoreReplies } from "@lib/api";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import Image from "next/image";
import Flair from "./Flair";
import Link from "next/link";

export default function Comment({
    comment,
    scrollContainer = window,
    compact = false,
    ...props
}) {
    const [threadHidden, setThreadHidden] = useState(false);
    const [replies, setReplies] = useState([]);
    const [moreLoaded, setMoreLoaded] = useState(false);
    const parentEl = useRef(null);

    useEffect(() => {
        setReplies(comment.replies?.data?.children);
    }, []);

    function loadMoreReplies(children, id) {
        fetchMoreReplies(comment.link_id, children, id).then((replies) => {
            setReplies((r) => [...r, ...replies]);
            setMoreLoaded(true);
        });
    }

    function scrollElement() {
        if (parentEl.current.getBoundingClientRect().top < 0) {
            scrollContainer.scrollTo({
                top: parentEl.current.offsetTop - 55,
                behavior: "smooth",
            });
        }
    }

    return (
        <div
            className={`mt-9 w-full ${
                compact &&
                "mt-0 mb-4 rounded-md bg-neutral-900 hover:bg-neutral-800 border-zinc-600 border-[1px]"
            } ${props.className}`}
            {...props}
            ref={parentEl}
        >
            {compact && (
                <div className="px-4 py-2 border-zinc-600 border-b-[1px]">
                    <p>
                        Commented on{" "}
                        <Link
                            href={comment.link_permalink.replace(
                                "https://www.reddit.com",
                                ""
                            )}
                            className="text-red-400"
                        >
                            {comment.link_title}
                        </Link>{" "}
                        on {comment.subreddit_name_prefixed}
                    </p>
                </div>
            )}
            <div className={`flex ${compact && "p-4"}`}>
                {!compact && (
                    <div className="mr-4 w-12 flex flex-col items-center text-center">
                        {threadHidden ? (
                            <button
                                className="btn w-7 h-7 leading-none flex items-center justify-center"
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
                                    onClick={() => {
                                        setThreadHidden(true);
                                        scrollElement();
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}
                <div className="flex-1 overflow-hidden">
                    <p className="flex items-center">
                        <Link
                            href={`/u/${comment.author.toLowerCase()}`}
                            className="font-bold text-red-400"
                        >
                            u/{comment.author}
                        </Link>
                        {comment.is_submitter && (
                            <span className="font-semibold text-red-400 ml-2">
                                OP
                            </span>
                        )}
                        {comment.distinguished == "moderator" && (
                            <span className="font-semibold text-green-500 ml-2">
                                MOD
                            </span>
                        )}
                        {comment.author_flair_text && (
                            <Flair
                                backgroundColor={
                                    comment.author_flair_background_color
                                }
                                textColor={comment.author_flair_text_color}
                                type={comment.author_flair_type}
                                richtext={comment.author_flair_richtext}
                                text={comment.author_flair_text}
                                className="ml-2"
                            />
                        )}
                        {compact && (
                            <>
                                <span className="mx-2 text-neutral-400">
                                    &bull;
                                </span>
                                {new Intl.NumberFormat("en-US", {
                                    notation: "compact",
                                    compactDisplay: "short",
                                }).format(comment.score)}{" "}
                                points
                            </>
                        )}
                        <span className="mx-2 text-neutral-400">&bull;</span>
                        <span>
                            {comment.created &&
                                formatDistanceToNowStrict(
                                    fromUnixTime(comment.created)
                                )}{" "}
                            ago
                        </span>
                    </p>
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
                    {replies && !compact && (
                        <div className={threadHidden ? "hidden" : "block"}>
                            {replies.map((reply, index) =>
                                reply.kind == "more" &&
                                reply.data.count > 0 &&
                                !moreLoaded ? (
                                    <button
                                        className="btn alternative mt-4"
                                        key={index}
                                        onClick={() =>
                                            loadMoreReplies(
                                                reply.data.children,
                                                reply.data.id
                                            )
                                        }
                                    >
                                        load more
                                    </button>
                                ) : (
                                    reply.kind !== "more" && (
                                        <Comment
                                            comment={reply.data}
                                            key={index}
                                        />
                                    )
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
