const url = "https://www.reddit.com";
const params = "?raw_json=1";

export async function fetchPostsHot(subreddit) {
    let endpoint;
    if (subreddit) {
        endpoint = `${url}/${subreddit}/hot.json`;
    } else {
        endpoint = `${url}/hot.json`;
    }

    endpoint = endpoint.concat(params);

    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    return jsonResponse.data.children;
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
