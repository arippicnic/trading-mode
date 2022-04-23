import express from "express";

import cryptoRoute from "./cryptoRoute";

const router = express.Router();

router.use("/crypto", cryptoRoute);

export default router;
