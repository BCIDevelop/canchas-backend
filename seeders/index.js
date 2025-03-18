console.log("🚀 Seeder script iniciado...");

import fs from "fs";
import path from "path";

fs.readdirSync(__dirname)
  .filter((file) => {
    let fileSplit = file.split(".");
    return fileSplit.length === 3 && fileSplit[1] === "seed";
  })
  .forEach((file) => {
    const seeder = require(path.join(__dirname, file));
    if (typeof seeder === "function") {
      seeder();
    }
  });
