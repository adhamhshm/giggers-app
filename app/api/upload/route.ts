import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

//get this from the cloudinary dashboard
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

//to test the route -> go to http://localhost:3000/api/upload
export async function GET() {
    return NextResponse.json({ message: "Hello from the upload route" }, { status: 200 });
}

//the type of the route is POST as we are creating something
//to create it will get a request that have the type -> Request
export async function POST(request: Request) {
    //inside the function block, we get a path that we get from request.json() from the "/lib/actions.ts"
    const { path } = await request.json();

    //if there is no path
    if (!path) {
        return NextResponse.json({ message: "Image path is required" }, { status: 400 });
    }

     //if there is a path
    try {
        //we need to provide some information to cloudinary
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: true,
          //image transformation, crop: "scale" -> make the image small and scale as we want in our app
          transformation: [{ width: 1000, height: 752, crop: "scale" }],
        }
    
        //upload to the server
        const result = await cloudinary.uploader.upload(path, options);
    
        return NextResponse.json(result, { status: 200 });
    } 
    catch (error) {
        return NextResponse.json({ message: "Failed to upload image on Cloudinary" }, { status: 500 });
    }
}