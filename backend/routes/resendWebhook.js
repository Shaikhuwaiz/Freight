import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Incoming email event:", req.body);

  res.status(200).send("OK");  
});

export default router;
