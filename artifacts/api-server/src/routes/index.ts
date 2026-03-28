import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import aptitudeRouter from "./aptitude";
import codingRouter from "./coding";
import userRouter from "./user";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use("/aptitude", aptitudeRouter);
router.use("/coding", codingRouter);
router.use("/user", userRouter);

export default router;
