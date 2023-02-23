import { Tab } from "@headlessui/react";

export default function FilterTabs({ onChange, filters }) {
    return (
        <Tab.Group onChange={onChange}>
            <Tab.List className="mt-4 inline-flex rounded-md bg-neutral-900 overflow-hidden">
                {filters.map((filter, index) => (
                    <Tab
                        key={index}
                        className={({ selected }) =>
                            `inline-block py-2 px-3 transition-colors outline-none ${
                                selected
                                    ? "bg-red-400"
                                    : "hover:underline hover:bg-neutral-800"
                            }`
                        }
                    >
                        {filter}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    );
}
