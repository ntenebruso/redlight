import { useRef, useEffect } from "react";

export default function Tweet({ id }) {
    const iframeEl = useRef(null);

    const srcStyle = `
    body {
        margin: 0;
        overflow: hidden;
    }

    #tweet {
        margin: 0;
        overflow: hidden;
    }
    `;

    const srcDoc = `
    <script>window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    
        t._e = [];
        t.ready = function(f) {
        t._e.push(f);
        };
    
        return t;
    }(document, "script", "twitter-wjs"));</script>

    <style>${srcStyle}</style>

    <div id="tweet"></div>
    `;

    function handleLoad() {
        const twitter = iframeEl.current.contentWindow.twttr;
        const container =
            iframeEl.current.contentDocument.getElementById("tweet");

        twitter.ready(function () {
            twitter.widgets
                .createTweet(id, container, {
                    theme: "dark",
                    align: "center",
                })
                .then(() => {
                    iframeEl.current.style.height =
                        container.offsetHeight + "px";
                });
        });
    }

    return (
        <iframe
            className="w-full"
            srcDoc={srcDoc}
            onLoad={handleLoad}
            ref={iframeEl}
        />
    );
}
