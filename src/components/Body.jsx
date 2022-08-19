import { useRef, useState, useEffect } from "react";

export default function Body({ compact, html }) {
    const [bodyHeight, setBodyHeight] = useState(0);
    const bodyEl = useRef(null);

    useEffect(() => {
        setBodyHeight(bodyEl.current.offsetHeight);
    }, []);

    return (
        <div
            ref={bodyEl}
            style={{ maxHeight: compact ? "290px" : "auto" }}
            className={`${compact && bodyHeight >= 290 && "compact"} post-body`}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    );
}
