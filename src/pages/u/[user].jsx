import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchUserInfo, fetchUserListings } from "@lib/api";
import { format, fromUnixTime } from "date-fns";
import { FiLoader, FiCalendar } from "react-icons/fi";
import Post from "@components/Post";
import Comment from "@components/Comment";
import Spinner from "@components/Spinner";

export default function UserPage() {
    const router = useRouter();
    const { user } = router.query;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [listings, setListings] = useState();

    useEffect(() => {
        if (!router.isReady) return;

        fetchUserInfo(user).then((data) => {
            console.log("info", data);
            setData(data?.data);
            setLoading(false);
        });
        fetchUserListings(user).then((data) => {
            console.log("listings", data);
            setListings(data?.data?.children);
        });
    }, [router.isReady]);

    return (
        <div className="max-w-3xl mx-auto mt-4">
            {loading ? (
                <Spinner />
            ) : data ? (
                <>
                    <div>
                        <div className="flex">
                            <img
                                src={data.icon_img}
                                className="w-24 h-24 rounded-full"
                            />
                            <div className="ml-4">
                                <h2 className="text-3xl font-semibold">
                                    {data.name}
                                </h2>
                                <p className="text-lg align-middle">
                                    <FiLoader className="inline mr-2" />
                                    {new Intl.NumberFormat("en-US", {
                                        notation: "compact",
                                        compactDisplay: "short",
                                    }).format(data.total_karma)}{" "}
                                    points
                                </p>
                                <p className="text-lg align-middle">
                                    <FiCalendar className="inline mr-2" />
                                    {format(
                                        fromUnixTime(data.created),
                                        "MMMM d, yyyy"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-9">
                        {listings ? (
                            listings.map((listing, index) => {
                                if (listing.kind == "t1") {
                                    return (
                                        <Comment
                                            compact={true}
                                            comment={listing.data}
                                            key={index}
                                        />
                                    );
                                } else if (listing.kind == "t3") {
                                    return (
                                        <Post
                                            compact={true}
                                            modal={false}
                                            post={listing.data}
                                            key={index}
                                        />
                                    );
                                }
                            })
                        ) : (
                            <p>No posts found.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}
