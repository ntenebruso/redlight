import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
const REDDIT = "https://www.reddit.com";
const REDDIT_OAUTH = "https://oauth.reddit.com";
const params = {
    raw_json: 1,
};

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

export async function fetchFeed(token) {
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
