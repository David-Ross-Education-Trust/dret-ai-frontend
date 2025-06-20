const fs = require("fs-extra");
const path = require("path");

const source = path.join(__dirname, "build");
const destination = path.join(__dirname, "..", "backend", "static");

fs.copy(source, destination, { overwrite: true }, function (err) {
  if (err) {
    console.error("Error copying build folder:", err);
  } else {
    console.log("✅ Build copied to Flask static folder!");
  }
});
