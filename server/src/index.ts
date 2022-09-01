import express from 'express';

(async ()=> {
  const app = express();
  app.get("/", (_req, res) => res.send("hello"));
  app.listen(4000, () => {
    console.log("express server started");
  });
})();