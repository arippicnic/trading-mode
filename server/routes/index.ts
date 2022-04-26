import express from "express";

import cryptoRoute from "./cryptoRoute";
import userRoute from "./userRoute";

const router = express.Router();

router.use("/user", userRoute);
router.use("/crypto", cryptoRoute);

export default router;
