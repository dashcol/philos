import app from "./index.js";
import { connectToDB } from "./src/config/config.js";

app.listen(3200, async () => {
  await connectToDB();
  console.log("server is listening at 3200");
});
