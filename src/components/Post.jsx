import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { FiLink } from "react-icons/fi";

export default function Post({ post, compact = false }) {
    return (
        <div className="mb-4 p-4 rounded-md bg-zinc-800 flex">
            <span className="inline-block mr-4">
                {new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                }).format(post.score)}
            </span>
            <div className="flex-1">
                <div className="mb-3">
                    <p>
                        <span className="font-bold">r/{post.subreddit}</span>{" "}
                        <span className="text-gray-600">&bull;</span> u/
                        {post.author}{" "}
                        <span className="text-gray-600">&bull;</span>{" "}
                        {formatDistanceToNow(fromUnixTime(post.created))}
                    </p>
                    <div>
                        {post.total_awards_received > 0 &&
                            post.all_awardings.map((award, index) => (
                                <img
                                    src={award.icon_url}
                                    key={index}
                                    title={award.name}
                                    className="inline w-4 h-4 mr-1"
                                />
                            ))}
                    </div>
                </div>
                <div className="flex w-full">
                    <h2 className="font-bold text-2xl leading-tight flex-1">
                        {post.link_flair_text && (
                            <span
                                style={{
                                    background:
                                        post.link_flair_background_color == ""
                                            ? "rgb(248 113 113)"
                                            : `${post.link_flair_background_color}`,
                                }}
                                className={`${
                                    post.link_flair_text_color == "light"
                                        ? "text-white"
                                        : "text-black"
                                } inline-block rounded-md px-2 py-1 mr-2 text-xs align-middle`}
                            >
                                {post.link_flair_text}
                            </span>
                        )}
                        {post.title}
                    </h2>
                    {post.post_hint == "link" && (
                        <a
                            href={post.url}
                            target="_blank"
                            className="ml-4 w-28 h-24 bg-zinc-500 flex flex-col items-center justify-center rounded-md text-sm relative overflow-hidden"
                        >
                            {post.thumbnail == "default" ? (
                                <FiLink className="text-2xl flex-1" />
                            ) : (
                                <img className="flex-1" src={post.thumbnail} />
                            )}
                            <span
                                className="inline-block text-center w-full bg-black"
                                style={{ gridArea: "1/1/2/2" }}
                            >
                                {post.domain}
                            </span>
                        </a>
                    )}
                </div>
                <div>
                    {post.post_hint == "image" &&
                        post.preview.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.source.url}
                                className="max-h-[512px] mt-4 mx-auto"
                            />
                        ))}
                    {post.is_self && (
                        <div
                            style={{ maxHeight: compact ? "300px" : "auto" }}
                            className="overflow-hidden"
                            dangerouslySetInnerHTML={{
                                __html: post.selftext_html,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
