import config from "./utils/config";

import app from "./app"

const PORT = config.PORT;
const HOST = config.HOST || "localhost";

app.listen(Number(PORT), HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

