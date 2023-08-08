import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//from the .env file
const secret = process.env.NEXTAUTH_SECRET;

//req with a type -> NextRequest, using other than "req" will cause error
export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret, raw: true });

    return NextResponse.json({ token }, { status: 200 });
} 