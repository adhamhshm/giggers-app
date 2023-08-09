import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";

//the EditPage is likely the same as the CreateProject, we reused the component with a bit modifications
//we already know which project we will edit so this page is located in "/api/edit-project/[id]/page.tsx"
const EditProject = async ({ params: { id } }: { params: { id: string } }) => {

    //to get the current user
    const session = await getCurrentUser();

    //if there is no user, redirect page to the homepage
    if (!session?.user) {
        redirect("/");
    }

    //we have the same function to get the project details in "/api/project/[id]/page.tsx"
    const result = await getProjectDetails(id) as { project?: ProjectInterface };

    return (
        <Modal>
            <h3 className="modal-head-text">
                Edit Project
            </h3>

            {/* this ProjectForm is for "create", there will be one for "edit" 
                we need session to know which user is creating project */}
            <ProjectForm type="edit" session={session} project={result?.project} />
        </Modal>
    )
}

export default EditProject;