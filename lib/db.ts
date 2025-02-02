import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}




let cached=global.mongoose;

if (!cached){
    cached=global.mongoose={conn:null,promise:null};
}

export async function connectTODatabase(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
       const opts={
        bufferCommands:false,
        maxPoolSize:10,
       }

       cached.promise=mongoose.connect(MONGODB_URI,opts).then(()=>mongoose.Connection);
    }
    try{
        cached.conn=await cached.promise;
        
    }catch(error){
        cached.promise=null;
        console.error("Error connecting to database",error);
    }
    
}