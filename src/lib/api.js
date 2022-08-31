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

async function authFetch(path, token) {
    const res = await axios.get(REDDIT_OAUTH + path, {
        params,
        headers: {
            authorization: `bearer ${token}`,
        },
    });
    return res.data;
}

async function noAuthFetch(path) {
    const res = await axios.get(REDDIT + path, {
        params,
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
    console.log(res.data.json.data.things);
    console.log(fixCommentsFormat(res.data.json.data.things));
    return fixCommentsFormat(res.data.json.data.things);
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
            if (c && c.data.replies?.data?.children) {
                c.data.replies.data.children.push(comment);
            } else if (c) {
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

export async function fetchFeed() {
    const token = await getToken();

    if (token) {
        console.log("FETCHING FEED WITH AUTH");
        return await authFetch("/hot.json", token);
    }

    console.log("FETCHING FEED WITH NO AUTH");
    return await noAuthFetch("/hot.json");
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
