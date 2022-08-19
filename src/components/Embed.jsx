export default function Embed({ html }) {
    return (
        <div className="mx-auto" dangerouslySetInnerHTML={{ __html: html }} />
    );
}
