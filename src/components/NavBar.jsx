import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function NavBar() {
    const searchInput = useRef(null);
    const { data: session } = useSession();
    const router = useRouter();
    const { q: query } = router.query;

    function handleSubmit(e) {
        e.preventDefault();
        router.push(`/search?q=${encodeURI(searchInput.current.value)}`);
    }

    return (
        <div className="bg-neutral-800 max-h-12 px-4 py-2 flex justify-between items-center sticky top-0 w-full shadow-md z-10">
            <h1 className="text-xl">
                <Link href="/">
                    <span className="text-red-400">red</span>light
                </Link>
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    className="text-sm outline-none bg-zinc-700 focus:bg-zinc-600 rounded-md p-2"
                    defaultValue={query ?? ""}
                    ref={searchInput}
                ></input>
            </form>
            <div>
                {session ? (
                    <span>{session.user.name}</span>
                ) : (
                    <button
                        className="btn h-10"
                        onClick={() => signIn("reddit")}
                    >
                        Log in
                    </button>
                )}
            </div>
        </div>
    );
}
