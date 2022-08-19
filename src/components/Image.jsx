export default function PostImages({ images }) {
    return (
        <div>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image.source.url}
                    className="max-h-[512px] mt-4 mx-auto"
                />
            ))}
        </div>
    );
}
