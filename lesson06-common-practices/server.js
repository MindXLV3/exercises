import "dotenv/config.js";
import express from "express";
import {connectToDB} from './configs/db.config.js'
import router from "./routes/index.js";
const app = express();
const PORT = 3001;

// 1. Create connection to database
connectToDB();
// 2. Global middlewares
app.use(express.json());

// 3. Routing
app.use("/api/v1", router);

// 4. Error handling

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
