import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {email,password}=await request.json();
        if(!email || !password){
            return NextResponse.json({message:"Email and password are required"},{status:400});
        }
        await connectToDatabase();

        const existingUser=await User.findOne({email})
        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400});
        }

        await User.create({email,password})
        return NextResponse.json({message:"User created successfully"},{status:201});
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({
            error:"User error on the page"
        },{
            status:500
        })
    }

}