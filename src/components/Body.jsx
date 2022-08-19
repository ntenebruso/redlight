import { useRef } from "react";

export default function Body({ compact, html }) {
    const bodyEl = useRef(null);

    return (
        <div
            ref={bodyEl}
            style={{ maxHeight: compact ? "290px" : "auto" }}
            className={`${
                compact && bodyEl.current.offsetHeight >= 290 && "compact"
            } post-body`}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    );
}
