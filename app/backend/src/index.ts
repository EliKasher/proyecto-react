import config from "./utils/config";

import app from "./app";

const PORT = config.PORT;
const HOST = config.HOST || "localhost";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      roles: "teacher" | "functionary";
    }
  }
}

app.listen(Number(PORT), HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
