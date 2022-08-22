import Body from "./Body";
import PostImages from "./Image";
import Video from "./Video";
import Gallery from "./Gallery";
import Embed from "./Embed";
import Tweet from "./Tweet";
import { useState, useEffect } from "react";

export default function Preview({
    compact,
    isSelf,
    html,
    media,
    postHint,
    preview,
    galleryData,
    mediaMetadata,
}) {
    const [Preview, setPreview] = useState();

    useEffect(() => {
        let Preview;

        if (isSelf && html) {
            Preview = {
                component: Body,
                props: {
                    html,
                    compact,
                },
            };
        } else if (media && media.reddit_video) {
            Preview = {
                component: Video,
                props: {
                    video: media.reddit_video,
                },
            };
        } else if (preview && preview.reddit_video_preview) {
            Preview = {
                component: Video,
                props: {
                    video: preview.reddit_video_preview,
                },
            };
        } else if (preview && preview.images && preview.enabled) {
            Preview = {
                component: PostImages,
                props: {
                    images: preview.images,
                },
            };
        } else if (media && media.oembed) {
            if (media.type == "twitter.com") {
                Preview = {
                    component: Tweet,
                    props: {
                        id: media.oembed.url.match(
                            /https:\/\/twitter.com\/.*\/status\/([0-9]*)/
                        )[1],
                    },
                };
            } else {
                Preview = {
                    component: Embed,
                    props: {
                        html: media.oembed.html,
                    },
                };
            }
        } else if (galleryData) {
            Preview = {
                component: Gallery,
                props: {
                    galleryData,
                    mediaMetadata,
                },
            };
        }

        setPreview(Preview);
    }, []);

    if (!Preview) return null;
    return (
        <div className="mt-4 w-full">
            <Preview.component {...Preview.props}></Preview.component>
        </div>
    );
}
