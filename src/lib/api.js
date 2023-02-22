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

async function authFetch(path, localParams) {
    const token = await getToken();

    const basePath = token ? REDDIT_OAUTH : REDDIT;
    const headers = token && {
        authorization: `bearer ${token}`,
    };

    const res = await axios.get(basePath + path, {
        params: {
            ...params,
            ...localParams,
        },
        headers,
    });
    return res.data;
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

export async function fetchFeed(feed, last) {
    return await authFetch(`/${feed}.json`, { after: last });
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

export async function fetchSearchResults(query) {
    const res = await axios.get(REDDIT + "/search.json", {
        params: {
            q: query,
            ...params,
        },
    });
    return res.data;
}

export async function fetchUserInfo(username) {
    try {
        const res = await axios.get(REDDIT + `/user/${username}/about.json`, {
            params,
        });
        return res.data;
    } catch (error) {
        if (error.response.status == 404) {
            return null;
        }
    }
}

export async function fetchUserListings(username) {
    try {
        const res = await axios.get(REDDIT + `/user/${username}.json`, {
            params,
        });
        return res.data;
    } catch (error) {
        if (error.response.status == 404) {
            return null;
        }
    }
}
