import NextAuth from "next-auth/next";

export default NextAuth({
    providers: [
        {
            id: "reddit",
            name: "Reddit",
            type: "oauth",
            authorization:
                "https://www.reddit.com/api/v1/authorize?scope=identity,read&duration=permanent",
            token: "https://www.reddit.com/api/v1/access_token",
            userinfo: "https://oauth.reddit.com/api/v1/me",
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: null,
                    image: null,
                };
            },
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
        },
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at * 1000;
                return token;
            } else if (Date.now() < token.expiresAt) {
                console.log("token valid");
                return token;
            } else {
                console.log("fetching refresh token");
                const response = await fetch(
                    "https://www.reddit.com/api/v1/access_token",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization:
                                "Basic " +
                                btoa(
                                    process.env.REDDIT_CLIENT_ID +
                                        ":" +
                                        process.env.REDDIT_CLIENT_SECRET
                                ),
                        },
                        body: new URLSearchParams({
                            grant_type: "refresh_token",
                            refresh_token: token.refreshToken,
                        }),
                    }
                );
                const data = await response.json();
                token.accessToken = data.access_token;
                token.refreshToken = data.refresh_token;
                token.expiresAt = data.expires_at * 1000;
                return token;
            }
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
