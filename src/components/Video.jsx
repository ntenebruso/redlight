export default function Video({ video }) {
    return (
        <video controls className="w-full h-[500px] mx-auto bg-black">
            <source src={video.dash_url} />
            <source src={video.fallback_url} />
            <source src={video.hls_url} />
        </video>
    );
}
