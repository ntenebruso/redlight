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

export async function fetchMoreReplies(linkId, children) {
    const res = await axios.get(REDDIT + "/api/morechildren", {
        params: {
            api_type: "json",
            link_id: linkId,
            children: children.join(","),
            ...params,
        },
    });
    console.log(res.data);
    return res.data.json.data.things;
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
