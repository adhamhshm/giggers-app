import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
    category?: string | undefined | null,
    endCursor?: string| undefined | null,
}

type Props = {
    searchParams: SearchParams,
}

type ProjectSearch = {
    //coming from http://127.0.0.1:4000 or the Grafbase
    projectSearch: {
        edges: { node: ProjectInterface}[], //edges contain a node which is the ProjectInterface, we get the array of the project
        pageInfo: {
            hasPreviousPage: boolean,
            hasNextPage: boolean,
            startCursor: string,
            endCursor: string,
        }
    }
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;


const Home = async ({ searchParams: { category, endCursor }}: Props) => {

    console.log(endCursor);
    console.log(category);
    //use fetchAllProject() from "/lib/actions.ts"
    //ProjectSearch is a type
    //it will fetch the project with the selected category if any

    const data = await fetchAllProjects(category, endCursor) as ProjectSearch;

    //get the edges that contain nodes which are considered projects
    const projectsToDisplay = data?.projectSearch?.edges || [];

    //check the projects if they exist
    if (projectsToDisplay.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
                <Categories />
    
                <p className="no-result-text text-center">No projects found at the moment.</p>
            </section>
        )
    }

    //to check the pagination via graphql
    const pagination = data?.projectSearch?.pageInfo;

    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />
            
            <section className="projects-grid">
                {/* loop through the nodes */}
                {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
                //in the ProjectCard component, define the Props type for the ProjectCard
                <ProjectCard
                    key={`${node?.id}`}
                    id={node?.id}
                    image={node?.image}
                    title={node?.title}
                    name={node?.createdBy?.name}
                    avatarUrl={node?.createdBy?.avatarUrl}
                    userId={node?.createdBy?.id}
                />
                ))}
            </section>

            {/* link to the starting position for graphql */}
            <LoadMore 
                hasPreviousPage={pagination?.hasPreviousPage} 
                hasNextPage={pagination?.hasNextPage}
                startCursor={pagination?.startCursor} 
                endCursor={pagination?.endCursor} 
            />
        </section>
    )
}

export default Home;