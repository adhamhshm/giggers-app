import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

//when user click the Create Project button, they will send to the create work page
//this page will render the CreateProject component that will called upon a Modal and a ProjectForm component
//the structure will be -> the Modal will be the base, the ProjectForm will be wrapped inside Modal
//refer to Modal component to see how Modal is implemented
const CreateProject = async () => {

    //to get the current user
    const session = await getCurrentUser();

    //if there is no user, redirect page to the homepage
    if (!session?.user) {
        redirect("/");
    }

    return (
        <Modal>
            <h3 className="modal-head-text">
                Create a New Project
            </h3>

            {/* this ProjectForm is for "create", there will be one for "edit" 
                we need session to know which user is creating project */}
            <ProjectForm type="create" session={session} />
        </Modal>
    )
}

export default CreateProject;