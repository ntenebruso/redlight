import Link from "next/link";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { FiLink } from "react-icons/fi";
import Preview from "./Preview";
import Flair from "./Flair";

export default function Post({
    post,
    compact = false,
    inPost = false,
    modal = false,
    ...props
}) {
    return (
        <div
            {...props}
            className={`mb-4 p-4 rounded-md bg-neutral-900 hover:bg-neutral-800 border-zinc-600 border-[1px] flex ${props.className}`}
        >
            <div>
                <span className="block mr-4">
                    {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                    }).format(post.score)}
                </span>
                {post.stickied && (
                    <RiPushpinLine className="block text-xl mr-2 text-green-500" />
                )}
                {post.locked && (
                    <FiLock className="block text-xl mr-2 text-yellow-300" />
                )}
            </div>
            <div className="flex-1">
                <div className="mb-3">
                    <p>
                        {post.link_flair_text && (
                            <Flair
                                backgroundColor={
                                    post.link_flair_background_color
                                }
                                textColor={post.link_flair_text_color}
                                type={post.link_flair_type}
                                richtext={post.link_flair_richtext}
                                text={post.link_flair_text}
                                className="mr-2"
                            />
                        )}
                        <span className="font-bold">r/{post.subreddit}</span>
                        <span className="text-neutral-400 mx-2">&bull;</span>
                        <Link
                            href={`/u/${post.author.toLowerCase()}`}
                            className="text-red-400"
                        >
                            u/
                            {post.author}
                        </Link>
                        {post.author_flair_text && (
                            <Flair
                                backgroundColor={
                                    post.author_flair_background_color
                                }
                                textColor={post.author_flair_text_color}
                                type={post.author_flair_type}
                                richtext={post.author_flair_richtext}
                                text={post.author_flair_text}
                                className="ml-2"
                            />
                        )}
                        <span className="text-neutral-400 mx-2">&bull;</span>
                        {formatDistanceToNow(fromUnixTime(post.created))} ago
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
                    <div className="flex-1">
                        <h2 className="font-medium text-xl leading-tight">
                            {inPost ? (
                                post.title
                            ) : (
                                <Link
                                    href={
                                        modal
                                            ? `/?sub=${post.subreddit}&id=${post.id}`
                                            : post.permalink
                                    }
                                    as={modal ? post.permalink : undefined}
                                    scroll={false}
                                    className="hover:underline"
                                >
                                    {post.title}
                                </Link>
                            )}
                        </h2>
                        {post.url_overridden_by_dest && (
                            <a
                                className="inline-block mt-1 text-neutral-500 hover:text-gray-200 hover:underline"
                                href={post.url}
                                target="_blank"
                            >
                                {post.domain}
                            </a>
                        )}
                    </div>
                    {!post.is_self &&
                        (!post.preview ||
                            (post.preview && !post.preview.enabled)) &&
                        !post.media && (
                            <a
                                href={post.url}
                                target="_blank"
                                className="ml-4 w-28 h-24 bg-zinc-500 flex flex-col items-center justify-center rounded-md text-sm relative overflow-hidden"
                            >
                                {post.thumbnail == "default" ||
                                post.thumbnail == "" ? (
                                    <FiLink className="text-2xl flex-1" />
                                ) : (
                                    <img
                                        className="flex-1"
                                        src={post.thumbnail}
                                    />
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
                <Preview
                    compact={compact}
                    html={post.selftext_html}
                    isSelf={post.is_self}
                    media={post.media}
                    postHint={post.post_hint}
                    preview={post.preview}
                    galleryData={post.gallery_data}
                    mediaMetadata={post.media_metadata}
                    nsfw={post.over_18}
                />
                <p className="mt-4">
                    <a
                        className="text-neutral-500 hover:text-gray-200 hover:underline"
                        href="#"
                    >
                        {post.num_comments} comments
                    </a>
                </p>
            </div>
        </div>
    );
}
