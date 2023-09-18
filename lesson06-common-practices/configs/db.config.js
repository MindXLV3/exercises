import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log('Database is connected at ', connection.connection.host)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}