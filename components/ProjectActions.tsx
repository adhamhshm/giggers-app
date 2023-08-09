"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject, fetchToken } from "@/lib/actions"

const ProjectActions = ({ projectId } : { projectId: string }) => {
    
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const router = useRouter();

    //to handle deleting project
    const handleDeleteProject = async () => {
        
        setIsDeleting(true)
        
        //to authorize the user for the delete actions
        const { token } = await fetchToken();

        try {
            //created in the "/lib/actions.ts"
            await deleteProject(projectId, token);
            //navigate to the homepage back
            router.push("/");
        } 
        catch (error) {
            console.log(error);
        } 
        finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            {/* a page to edit the project, when user click the edit button */}
            <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
                <Image src="/pencile.svg" width={15} height={15} alt="edit" />
            </Link>

            {/* a delete button to delete project */}
            <button
                type="button"
                disabled={isDeleting}
                className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
                onClick={handleDeleteProject}
            >
                <Image src="/trash.svg" width={15} height={15} alt="delete" />
            </button>
        </>
    )
}

export default ProjectActions;