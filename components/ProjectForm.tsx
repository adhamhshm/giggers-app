"use client";

import { SessionInterface } from "@/common.types";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import CustomButton from "./CustomButton";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from 'next/navigation';

type Props = {
    type: string,
    session: SessionInterface,
}

//it will accept props like type and session that we passed from the CreateProject component / create-project page
const ProjectForm = ({ type, session } : Props) => {

    const router = useRouter();

    //create a state to check if the form is submitting or not
    const [isSubmitting, setIsSubmitting] = useState(false);

    //create a state of a form, with an object with empty state values
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        optionalUrl: "",
        category: "",
    });

    const handleFormSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();
        setIsSubmitting(true);

        //fetchToken() is another action from "/lib/actions.ts"
        const { token } = await fetchToken();

        try {
            if (type === "create") {
                //create project
                alert("Creating new project!");
                await createNewProject(form, session?.user?.id, token);
                //navigate to the homepage
                alert("Created new project!");
                router.push("/");
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        //prevent page reloading
        e.preventDefault();

        const file = e.target.files?.[0]; //there is a "?" as maybe the file not exist

        //if no file at all
        if (!file) {
            return;
        }

        //if user did not upload an image file
        if (!file.type.includes("image")) {
            return alert("Please upload an image file.");
        }

        //if there is a file and it is an image
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange("image", result);
        }
    };

    const handleStateChange = (fieldName: string, value: string) => {
        //we update the form using its previous value -> so we use the prevState
        setForm((prevState) => ({ 
            ...prevState, [fieldName]: value

        }))
    };

    return (
        <form onSubmit={handleFormSubmit} className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && "Click to choose the poster for your project"}
                </label>
                <input 
                    id="image" 
                    type="file" 
                    //accepts all images with MIME type
                    accept="image/*"
                    required={type === "create"}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {/* if the image exists, then show the image */}
                {form.image && (<Image  src={form?.image} className="sm:p-10 object-contain z-20" alt="image" fill/>)}
            </div>

            {/* setState() enqueues changes to the component state and tells React that 
                this component and its children need to be re-rendered with the updated state. 

                this is the primary method you use to update the user interface in response 
                to event handlers and server responses. */}

            <FormField
                title="Title"
                state={form.title}
                placeholder="Your project/work title"
                setState={(value) => handleStateChange("title", value)}
            />

            <FormField
                title="Description"
                state={form.description}
                placeholder="Decribe the project/work details"
                setState={(value) => handleStateChange("description", value)}
            />

            <FormField
                type="url"
                title="Optional URL"
                state={form.optionalUrl}
                placeholder="https://www.abc.com"
                setState={(value) => handleStateChange("optionalUrl", value)}
            />

            {/* CustomInput Category */}
            <CustomMenu 
                title="Category"
                state={form.category}
                //categoryFilters is a list from the "./constant/index.ts"
                filters={categoryFilters}
                setState={(value) => handleStateChange("category", value)}
            />
            
            {/* we create a custom button */}
            <div className="flexStart w-full">
                <CustomButton 
                    /* like a nested if else statement that will firstly check if user is submitting
                       if yes, the first if else statement will be executed
                       else, the later if else statement will be executed */
                    title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` 
                                        : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit" 
                    leftIcon={isSubmitting ? "" : "/plus.svg"} 
                    isSubmitting={isSubmitting} />
            </div>
        </form>
    )
}

export default ProjectForm;