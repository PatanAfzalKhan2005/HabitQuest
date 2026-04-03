import express from "express";
import { getTodayDictionary, getDictionaryByDate, completeDictionaryDay } from "../controllers/dictionaryController.js";

const router = express.Router();

router.get("/today", getTodayDictionary);
router.get("/:date", getDictionaryByDate);
router.post("/complete", completeDictionaryDay);

export default router;
