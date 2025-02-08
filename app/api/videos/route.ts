import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// function to get the videos from the database

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(videos);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failled to fetch the videos" },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          error: "unauthorized access",
        },
        { status: 401 }
      );
    }
    await connectToDatabase()
    const body:IVideo=await request.json()
    if (
        !body.title ||
        !body.description ||
        !body.videoUrl ||
        !body.thumbnailUrl
    ) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    const videoData={
      ...body,
      controls:body.controls ?? true,
      transformation:{
        height:1920,
        width:1080,
        quality: body.transformations?.quality ?? 100
      }
    }
    const newWideo= await Video.create(videoData)
    return NextResponse.json(newWideo)
        
    
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({
      error:"failled to fetch videos"
    },{
      status:200
    })
  }
}
