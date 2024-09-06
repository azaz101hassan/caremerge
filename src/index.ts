import http from "http";
import readline from "readline";
import {
  asyncJsImplementation,
  callbackImplementation,
  promisesImplementation,
  rxjsImplementation,
} from "./controllers/title/helpers";
import { API_TIME_ELAPSED, BASE_URL, PORT } from "./constants";
import { matchRoute } from "./routes";

const createServer = (implementation?: Function): void => {
  const server = http.createServer((req, res) => {
    console.time(API_TIME_ELAPSED);
    matchRoute(req, res, implementation);
  });

  server.listen(PORT, () => {
    console.log(`Server running at ${BASE_URL}/`);
  });
};

// Readline interface to prompt the user to choose between the control flow strategy
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt the user for control flow choice
function promptUser(): void {
  console.log("Choose the control flow strategy:");
  console.log("1. Plain Callbacks");
  console.log("2. Async.js");
  console.log("3. Promises");
  console.log("4. RxJS Streams");
  console.log("C. Terminate the program");

  rl.question("Enter your choice (1-4): ", (choice: string) => {
    switch (choice) {
      case "1":
        console.log("Using Plain Callbacks...");
        createServer(callbackImplementation);
        break;
      case "2":
        console.log("Using Async.js...");
        createServer(asyncJsImplementation);
        break;
      case "3":
        console.log("Using Promises...");
        createServer(promisesImplementation);
        break;
      case "4":
        console.log("Using RxJS Streams...");
        createServer(rxjsImplementation);
        break;
      case "C":
        process.exit();
        break;
      default:
        console.log("\nInvalid choice. Please choose again.\n\n");
        promptUser();
        break;
    }
  });
}

promptUser();
