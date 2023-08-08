import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, getUserQuery } from "@/graphql";
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
export const uploadImage = async (imagePath: string) => {
    alert("getting image");
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
    alert("get image done");

    if (imageUrl.url) {
        //allow only the user to create the project
        client.setHeader("Authorization", `Bearer ${token}`);
        alert("authorize done");
    
        const variables = {
            input: { 
                ...form, //spread the form
                image: imageUrl.url, //append the image
                createdBy: { //add createdBy by linking with the creatorId
                    link: creatorId 
                }
            }
        }
        alert("so far so good");
        //create the mutation inside "/graphql/index.ts"
        return makeGraphQLRequest(createProjectMutation, variables);
      }
}