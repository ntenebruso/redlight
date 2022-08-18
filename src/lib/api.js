const url = "https://www.reddit.com";

export async function fetchPostsHot(subreddit) {
    let endpoint;
    if (subreddit) {
        endpoint = `${url}/${subreddit}/hot.json?raw_json=1`;
    } else {
        endpoint = `${url}/hot.json?raw_json=1`;
    }

    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    return jsonResponse.data.children;
}
