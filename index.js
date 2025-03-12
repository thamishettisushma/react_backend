import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
dotenv.config();
connectDB()
console.log("MONGO_URI:", process.env.MONGO_URI);
const app=express()

// const corsOptions={
//     origin: ["http://localhost:5173", "https://react-frontend-one-henna.vercel.app"],
//     credentials:true
// }
// app.use(cors(corsOptions))
// app.use(cors());

const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.send("API is running...")
})

app.get("/home", (req, res)=> {
    return res.send("hello world")
})

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser( ))



const PORT=process.env.PORT || 5000
const BASE_URL=process.env.BASE_URL


// apis
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.listen(PORT,()=>{
   
    console.log(`server running at port ${BASE_URL}`)
})