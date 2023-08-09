import Link from "next/link";
import Image from "next/image";

import { getUserProjects } from "@/lib/actions";
import { ProjectInterface, UserProfile } from "@/common.types";

type Props = {
    userId: string,
    projectId: string,
}

const RelatedProjects = async ({ userId, projectId }: Props) => {

    //get the user projects
    //in the UserProfile common.types.ts, we specified how the UserProfile will look
    //project -> node -> to the projects
    const result = await getUserProjects(userId) as { user?: UserProfile };

    //get the node by destructuring it -> the node is a type ProjectInterface
    //we actually get all off the projects belong to specific user, but we just filter out the one we are currently looking 
    const filteredProjects = result?.user?.projects?.edges?.filter(({ node }: { node: ProjectInterface }) => node?.id !== projectId )

    //check the filteredProjects in the terminal
    //console.log(filteredProjects);

    //if no project at all, return null
    if (filteredProjects?.length === 0) {
        return null;
    }

    return (
        <section className="flex flex-col mt-32 w-full">
            <div className="flexBetween">
                <p className="text-base font-bold">
                    More by {result?.user?.name}
                </p>
                {/* a link that will navigate to user profile of the creator */}
                <Link href={`/profile/${result?.user?.id}`} className="text-primary-purple text-base">
                    View All
                </Link>
            </div>

            <div className="related_projects-grid">
                {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
                    <div className="flexCenter related_project-card drop-shadow-card">
                        <Link href={`/project/${node?.id}`} className="flexCenter group relative w-full h-full">
                            <Image src={node?.image} width={414} height={314} className="w-full h-full object-cover rounded-2xl" alt="project image" />
            
                            <div className="hidden group-hover:flex related_project-card_title">
                                <p className="w-full">{node?.title}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RelatedProjects;