import { ProjectForm } from "@/common.types";
import { allProjectsQuery, createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || "" : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "" : "letmein";
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL || "" : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

//to get the current user token
export const fetchToken = async () => {
    try {
        //the nextauth publish token to this endpoint path by default, but we still need to create the path "api/auth/token/route.ts"
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } 
    catch (error) {
        throw error;
    }
  };

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } 
    catch (error) {
        throw error;
    }
} 

export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
}

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader("x-api-key", apiKey);
    const variables = {
        input: {
            name,
            email,
            avatarUrl,
        }
    }
    return makeGraphQLRequest(createUserMutation, variables);
}

//create an async arrow function that will upload image via cloudinary
//it will accept an imagePath, the source of the image that will be uploaded
export const uploadImage = async (imagePath: string) => {
    try {
        //make a request to our backend
        //remember to make the backend endpoint so that we can upload image to cloudinary
        //the path will be created to "/api/upload/route.js"
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: imagePath }) //we pass this to the server
        })
        
        return response.json();
    }
    catch (error) {
        throw (error);
    }
}

//create an async arrow function that will create a new project
//it will accept form with type -> ProjectForm
//it will accept createrId to know who is creating it
//it will accept token to ensure the user actually logged in and have the privilage to create project
export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
        //allow only the user to create the project
        client.setHeader("Authorization", `Bearer ${token}`);
    
        const variables = {
            input: { 
                ...form, //spread the form
                image: imageUrl.url, //append the image
                createdBy: { //add createdBy by linking with the creatorId
                    link: creatorId 
                }
            }
        }
        //create the mutation inside "/graphql/index.ts"
        return makeGraphQLRequest(createProjectMutation, variables);
      }
}

//create an async arrow function to fetch all projects -> with category
//it will accept category but it is optional
//it will accept endCursor but it is optional, this endCursor is to know which page we are currently viewing
export const fetchAllProjects = async (category?: string, endCursor?: string) => {
    client.setHeader("x-api-key", apiKey);

    const variables = {
        category: category,
        endCursor: endCursor,
    }

    //return makeGraphQLRequest(projectsQuery, { category, endCursor });
    return makeGraphQLRequest(projectsQuery, variables);
}

//create an async arrow function to fetch all projects - all by default
//it will accept category but it is optional
//it will accept endCursor but it is optional, this endCursor is to know which page we are currently viewing
export const fetchAllProjectsWithoutCategory = async (endCursor?: string) => {
    client.setHeader("x-api-key", apiKey);

    const variables = {
        endCursor: endCursor,
    }

    return makeGraphQLRequest(allProjectsQuery, variables);
}

//create an arrow function to get the project details
//it will accept the id of the project
export const getProjectDetails = (id: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, { id });
}

//create an arrow function to get user projects / list of projects
//it will accept the id of the project
//it will a "last" parameter that specify how many project we want to see
export const getUserProjects = (id: string, last?: number) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
}

//create an arrow function to delete user project
//it will accept the id of the project
//it will accept a token as to check only the creator of the project is authorized to delete the project
export const deleteProject = (id: string, token: string) => {
    //allow only the user to create the project
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(deleteProjectMutation, { id, token });
}


//create an arrow function to update a project
//it will accept the form as the one that have been created before
//it will accept a projectId
//it will accept a token for authorization
export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
    //check if the user change the image
    //if the image url is base-64 string, then it is a new image
    //else, this if statement will be ignored
    function isBase64DataURL(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    }
    
    //spread the previous form to the updated form
    let updatedForm = { ...form };
    
    //we check if the image url is base-64
    const isUploadingNewImage = isBase64DataURL(form.image);

    if (isUploadingNewImage) {
        const imageUrl = await uploadImage(form.image);
    
        //add the new image in the updated form
        if (imageUrl.url) {
            updatedForm = { 
                ...form, image: imageUrl.url }; //exhange the image to the new cloudinary image
        }
    }
    
    client.setHeader("Authorization", `Bearer ${token}`);
    
    const variables = {
        id: projectId,
        input: updatedForm,
    }
    
    return makeGraphQLRequest(updateProjectMutation, variables);
}