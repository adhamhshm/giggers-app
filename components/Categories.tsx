"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { categoryFilters } from "@/constants";

const Categories = () => {
    
    //define all import from next/navigation
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    //to know which one is currently selected
    const category = searchParams.get("category");

    //to filter the post via its category
    const handleTags = (filter: string) => {
        router.push(`${pathName}?category=${filter}`);
    }

    return (
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {/* get each category */}
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => handleTags(filter)}
                        className={`${ category === filter
                            ? "bg-light-white-300 font-medium"
                            : "font-normal"
                        } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
                    >
                        {filter}
                    </button>
                ))}
            </ul>
        </div>
    )
}

export default Categories;