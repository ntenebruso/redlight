import axios from "axios";
const REDDIT = "https://api.reddit.com";
const REDDIT_OAUTH = "https://oauth.reddit.com";
const params = {
    raw_json: 1,
};
import { getSession } from "next-auth/react";

async function getToken() {
    const session = await getSession();
    if (session) {
        return session.accessToken;
    }
    return undefined;
}

async function authFetch(path, token, localParams) {
    const res = await axios.get(REDDIT_OAUTH + path, {
        params: {
            ...params,
            ...localParams,
        },
        headers: {
            authorization: `bearer ${token}`,
        },
    });
    return res.data;
}

async function noAuthFetch(path, localParams) {
    const res = await axios.get(REDDIT + path, {
        params: {
            ...params,
            ...localParams,
        },
    });
    return res.data;
}

export async function fetchMoreReplies(linkId, children, id) {
    const res = await axios.get(REDDIT + "/api/morechildren", {
        params: {
            api_type: "json",
            link_id: linkId,
            children: children.join(","),
            limit_children: false,
            sort: "top",
            ...params,
        },
    });

    return await fixCommentsFormat(res.data.json.data.things);
}

function fixCommentsFormat(comments) {
    if (comments.length > 0) {
        const ogDepth = comments[0].data.depth;
        const ids = new Map();
        comments.forEach((comment) => {
            ids.set(comment.data.name, comment);
        });

        comments.forEach((comment) => {
            const c = ids.get(comment.data.parent_id);

            if (c && c.data.replies.data && c.data.replies.data.children) {
                console.log("comment", comment);
                c.data.replies.data.children.push(comment);
            } else if (c) {
                console.log("comment", comment);
                c.data.replies = {
                    kind: "Listing",
                    data: {
                        children: [comment],
                    },
                };
            }
            c && ids.set(comment.data.parent_id, c);
        });

        const fixedComments = [];
        ids.forEach((comment) => {
            if (comment.data.depth == ogDepth) {
                fixedComments.push(comment);
            }
        });
        return fixedComments;
    }
    return comments;
}

export async function fetchFeed(last) {
    const token = await getToken();

    if (token) {
        console.log("FETCHING FEED WITH AUTH");
        return await authFetch("/hot.json", token, { after: last });
    }

    console.log("FETCHING FEED WITH NO AUTH");
    return await noAuthFetch("/hot.json", { after: last });
}

export async function fetchPost(subreddit, id) {
    if (!subreddit || !id) return;
    const response = await axios.get(
        `${REDDIT}/r/${subreddit}/comments/${id}.json`,
        { params: { ...params, depth: 5 } }
    );

    return {
        post: response.data[0].data.children[0],
        comments: response.data[1].data.children,
    };
}
