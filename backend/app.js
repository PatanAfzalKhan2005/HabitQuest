import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport, { configurePassport } from "./config/passport.js";
import registerRoutes from "./routes/index.js";
import { protect } from "./middleware/authMiddleware.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

configurePassport();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || "replace-with-a-strong-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use(protect);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

registerRoutes(app);

app.use(notFound);
app.use(errorHandler);

export default app;
