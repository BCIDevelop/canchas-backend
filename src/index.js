import "dotenv/config";
import Server from "./config/express.js";
(async () => {
  Server.core();
})();
