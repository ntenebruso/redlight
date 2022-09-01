import { useState } from "react";

export default function PostImages({ images, nsfw }) {
    const [hidden, setHidden] = useState(nsfw);

    return (
        <div>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`mt-4 block relative ${hidden && "blur-md"}`}
                    onClick={() => setHidden(false)}
                >
                    <img
                        className="max-h-[512px] mx-auto"
                        src={image.source.url}
                    />
                </div>
            ))}
        </div>
    );
}
