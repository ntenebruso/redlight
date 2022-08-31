import Comment from "./Comment";
import { FiMessageSquare } from "react-icons/fi";

export default function CommentsList({
    comments,
    numComments,
    scrollContainer,
    ...props
}) {
    return (
        <div {...props}>
            <h2>
                <FiMessageSquare className="inline-block" /> {numComments}{" "}
                comments
            </h2>
            {comments.map((comment, index) => {
                return (
                    <Comment
                        scrollContainer={scrollContainer}
                        comment={comment.data}
                        key={index}
                    />
                );
            })}
        </div>
    );
}
