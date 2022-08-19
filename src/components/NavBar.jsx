import { FiSun } from "react-icons/fi";

export default function NavBar() {
    return (
        <div className="bg-neutral-800 h-12 p-4 text-xl flex justify-between items-center sticky top-0 w-full shadow-md z-10">
            <h1>
                <span className="text-red-400">red</span>light
            </h1>
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    className="text-sm outline-none bg-zinc-700 focus:bg-zinc-600 rounded-md p-2"
                ></input>
            </div>
            <div>
                <span>settings</span>
            </div>
        </div>
    );
}
