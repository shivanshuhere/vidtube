import { app } from "./app.js";
import { connectDB } from "./db/index.js";
const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongoDB connection error ::", err);
  });
