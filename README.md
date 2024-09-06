# Caremerge

This project is a simple web server that fetches the titles of websites from a list of URLs provided by the user. It demonstrates different approaches to handling asynchronous operations in Node.js, including plain callbacks, `async.js`, Promises, and RxJS streams.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
  - [Control Flow Strategies](#control-flow-strategies)
- [API Endpoints](#api-endpoints)
  - [`GET /I/want/title`](#get-iwanttitle)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- Fetches and displays website titles from a list of URLs.
- Supports four different asynchronous control flow strategies:
  - Plain Callbacks
  - Async.js
  - Promises
  - RxJS Streams
- Interactive command-line interface to choose the control flow strategy.
- Easily extensible and configurable.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20.x or later)
- [npm](https://www.npmjs.com/) (version 10.x or later)

## Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/azaz101hassan/caremerge.git
cd caremerge
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install the following dependencies:

- `async`: For asynchronous control flow using callbacks.
- `bun`: JS runtime.
- `dotenv`: Loads .env variables.
- `rxjs`: For reactive programming using observables.
- `typescript`: Static JS Typing.

### Step 3: Run the Application

Start the server by running:

```bash
npm start
```

I prefer:

```bash
bun start
```

The server will start on `http://localhost:3000` and will prompt you to choose a control flow strategy.

## Usage

Once the server is running, you can fetch titles from websites by accessing the following endpoint in your browser or using tools like `curl`:

```
http://localhost:3000/I/want/title?address=example.com&address=github.com
```

Replace `example.com` and `github.com` with the URLs you want to fetch titles from. You can provide multiple `address` parameters.

### Control Flow Strategies

After starting the server, you will be prompted to choose a control flow strategy:

1. Plain Callbacks
2. Async.js
3. Promises
4. RxJS Streams

Enter the number corresponding to your choice, and the server will use that strategy for handling asynchronous operations.

## API Endpoints

### `GET /`

Health Check Endpoint.

**Response:**

Server is running...

### `GET /I/want/title`

Fetches the titles of websites from the provided `address` query parameters.

- **Query Parameters:**
  - `address`: One or more website URLs whose titles you want to fetch.

**Example:**

```
/I/want/title?address=example.com&address=github.com
```

```
/I/want/title/?address=https://github.com/&address=https://www.dawn.com/events/&address=sdsd
```

**Response:**

An HTML page displaying the titles of the provided websites.

## Testing

You can test the application by starting the server and accessing the endpoint with different `address` parameters to see if it correctly fetches and displays the website titles.

**Example URLs:**

- Single Address:
  ```
  http://localhost:3000/I/want/title?address=example.com
  ```
- Multiple Addresses:
  ```
  http://localhost:3000/I/want/title?address=example.com&address=github.com&address=nodejs.org
  ```

## Project Structure

```
.
├── src/              # Main application code
├── .env              # Env variables
├── .gitignore        # Ignore git files
├── package.json      # Node.js dependencies
├── bun.lockb         # Bun Lock File
├── README.md         # Project documentation
└── tsconfig          # Typescript Configurations
```

## License

This project is licensed under the MIT License.
