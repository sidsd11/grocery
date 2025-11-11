import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import connectDB from "./configs/db.js"
import userRouter from "./routes/userRoute.js"
import sellerRouter from "./routes/sellerRoute.js"
import connectCloudinary from "./configs/cloudinary.js"

const app = express()
const port = process.env.PORT || 3000

const allowedOrigins = ['http://localhost:5173']

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

await connectDB()
await connectCloudinary()

app.get("/", (req, res) => {
    res.send("API Working")
})

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)

app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})