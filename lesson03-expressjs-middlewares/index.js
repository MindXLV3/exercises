import express from "express";

import router from "./routes/index.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// tất cả api bắt đầu bằng /api/v1 + 
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
