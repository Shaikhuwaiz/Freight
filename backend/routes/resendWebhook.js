import express from "express";
const router = express.Router();

router.post("/resend-webhook", async (req, res) => {
  try {
    const event = req.body;

    console.log("📩 Email Received:", event);

    // Example: Forward email to your Gmail
    // sendMailToGmail(event);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
