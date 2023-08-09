"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    id: string,
    image: string,
    title: string,
    name: string,
    avatarUrl: string,
    userId: string,
}

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {

    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    //currently just a random generated number of likes and views
    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10000))
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
    }, []);

    return (
        //to contain the projectCard brief details
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
            {/* the project is clickable to navigate to the page of the project */}
            <Link href={`/project/${id}`} className="flexCenter group relative w-full h-full">
                {/* remember to add res.cloudinary.com in the images domains at "next.config.js" */}
                <Image src={image} width={414} height={314} className="w-full h-full object-cover rounded-2xl" alt="project image" />

                {/* to show the title pf the project, when hover, the title will be shown */}
                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{title}</p>
                </div>
            </Link>

            {/* to show the name of the creator of the project, likes and view counts */}
            <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
                {/* the name can be clicked to show the profile detail */}
                <Link href={`/profile/${userId}`}>
                        {/* to contain profile image and name */}
                        <div className="flexCenter gap-2">
                            <Image src={avatarUrl} width={24} height={24} className="rounded-full" alt="profile image" />
                            <p>{name}</p>
                        </div>               
                </Link>

                {/* to contain the likes and views count */}
                <div className="flexCenter gap-3">
                    {/* likes count */}
                    <div className="flexCenter gap-2">
                        <Image src="/heart.svg" width={13} height={12} alt="heart" />
                        <p className="text-sm">{randomLikes}</p>
                    </div>
                    {/* likes count */}
                    <div className="flexCenter gap-2">
                        <Image src="/eye.svg" width={12} height={9} alt="eye" />
                        <p className="text-sm">{randomViews}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;