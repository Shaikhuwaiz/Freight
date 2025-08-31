const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sheikhuwaiz:Owaiz%24786@cluster0.yodj03o.mongodb.net/freightDB?retryWrites=true&w=majority")
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch(err => {
    console.error("❌ Connection Error:", err);
  });
