import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './router.js'
import connectDb from './database/connection.js'
const app = express()



const corsOptions = {
    origin: ['http://localhost:5173','http://172.20.10.4:5173','https://defenderksa.com'], // Specific frontend origin

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
};


app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.use(express.json());


app.use(express.urlencoded({ extended: true }));
 
connectDb()

app.get("/", async (req, res) => {
    try {
        res.status(200).json("Hello, working fine");
    } catch (error) {
        console.error("Error initializing app:", error);
        res.status(500).json({ error: "Initialization error" });
    }
});

app.use("/api",router)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
