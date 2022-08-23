import useSWR from "swr";
import axios from "axios";
const url = "https://www.reddit.com";
const params = "?raw_json=1";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function usePostsHot(subreddit) {
    let endpoint;
    if (subreddit) {
        endpoint = `${url}/${subreddit}/hot.json`;
    } else {
        endpoint = `${url}/hot.json`;
    }

    endpoint = endpoint.concat(params);

    const { data, error } = useSWR(endpoint, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        posts: data,
        isLoading: !data && !error,
        isError: error,
    };
}

export async function fetchPost(subreddit, id) {
    let endpoint;
    if (!subreddit || !id) return;
    endpoint = `${url}/r/${subreddit}/comments/${id}.json${params}&depth=5`;
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    return {
        post: jsonResponse[0].data.children[0],
        comments: jsonResponse[1].data.children,
    };
}
