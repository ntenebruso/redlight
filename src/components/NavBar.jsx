import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

export default function NavBar() {
    const { data: session } = useSession();

    return (
        <div className="bg-neutral-800 h-12 p-4 text-xl flex justify-between items-center sticky top-0 w-full shadow-md z-10">
            <h1>
                <Link href="/">
                    <a>
                        <span className="text-red-400">red</span>light
                    </a>
                </Link>
            </h1>
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    className="text-sm outline-none bg-zinc-700 focus:bg-zinc-600 rounded-md p-2"
                ></input>
            </div>
            <div>
                {session ? (
                    <span>{session.user.name}</span>
                ) : (
                    <button className="btn text-md" onClick={signIn}>
                        Log in
                    </button>
                )}
            </div>
        </div>
    );
}
