const fs = require("fs");

const logFile = "./logs.txt";

fs.writeFileSync(logFile, "");

function logger(...args) {
  let toWrite = "";
  args.forEach((arg) => {
    if (typeof arg === "string" || typeof arg === "number") {
      toWrite += arg;
    } else {
      try {
        const stringified = JSON.stringify(arg);
        toWrite += stringified;
      } catch (e) {
        toWrite += arg;
      }
    }
    toWrite += " ";
  });
  console.log(toWrite);
  fs.appendFileSync(logFile, "\n" + toWrite);
}

module.exports = logger;
