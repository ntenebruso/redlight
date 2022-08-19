import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function Video({ video }) {
    const videoEl = useRef(null);

    useEffect(() => {
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(video.hls_url);
            hls.attachMedia(videoEl.current);
        } else if (
            videoEl.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
            videoEl.current.src = video.hls_url;
        }
    }, []);

    return (
        <video
            ref={videoEl}
            controls
            className="w-full h-[500px] mx-auto bg-black"
        />
    );
}
