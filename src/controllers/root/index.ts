import http from "http";

export const healthCheck = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Server is running...");
};
