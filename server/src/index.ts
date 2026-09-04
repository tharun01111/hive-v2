import express, { type Request, type Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import workspaceRoutes from "./routes/workspace.routes";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/error.middleware";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger);
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);

app.get('/', (_: Request, res: Response) => {
  res.json("The server is healthy and working properly");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})