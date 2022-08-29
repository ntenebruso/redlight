import NextAuth from "next-auth/next";

export default NextAuth({
    providers: [
        {
            id: "reddit",
            name: "Reddit",
            type: "oauth",
            authorization:
                "https://www.reddit.com/api/v1/authorize?scope=identity,read",
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
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
