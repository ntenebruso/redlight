export default function Body({ compact, html }) {
    return (
        <div
            style={{ maxHeight: compact ? "300px" : "auto" }}
            className="overflow-hidden"
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        />
    );
}
