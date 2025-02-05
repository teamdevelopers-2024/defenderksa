import mongoose from "mongoose";
import 'dotenv/config'
let isConnected


async function connectDb() {
    if(isConnected){
        console.log("Using existing database connection")
        return
    }

    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URL is not defined in environment variable")
    }

    console.log("mongo URI : ",process.env.MONGO_URI)

    try {
        mongoose.set("strictQuery", false)
        mongoose.set("debug",false)

        const db = await mongoose.connect(process.env.MONGO_URI ,{
            serverSelectionTimeoutMS : 15000,
        });
        isConnected = mongoose.connection.readyState
        console.log("Database connected successfully...")
        
    } catch (error) {
        console.error("Database connection error : ",error.message)
    }
    
}



export default connectDb