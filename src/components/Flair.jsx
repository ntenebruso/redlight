export default function Flair({
    backgroundColor,
    textColor,
    type,
    richtext,
    text,
    className,
}) {
    const bgColor =
        backgroundColor == "" || backgroundColor == null
            ? "transparent"
            : backgroundColor;
    return (
        <span
            style={{
                background: bgColor,
            }}
            className={`${
                textColor == "light" || bgColor == "transparent"
                    ? "text-white"
                    : "text-black"
            } ${
                bgColor !== "transparent" && "px-2 py-1 text-xs"
            } inline-block rounded-md align-middle ${className}`}
        >
            {type == "richtext"
                ? richtext.map((item, index) =>
                      item.e == "emoji" ? (
                          <img
                              src={item.u}
                              className="inline w-4 h-4"
                              key={index}
                          />
                      ) : (
                          item.e == "text" && item.t
                      )
                  )
                : type == "text" && text}
        </span>
    );
}
