import Body from "./Body";
import PostImages from "./Image";
import Video from "./Video";
import Gallery from "./Gallery";
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
        } else if (postHint == "image") {
            Preview = {
                component: PostImages,
                props: {
                    images: preview.images,
                },
            };
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
