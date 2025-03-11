import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase timeout
        });

        console.log(` MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(" MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
