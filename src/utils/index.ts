import http from "http";
import { JSONResponse } from "../interfaces";
import { API_TIME_ELAPSED } from "../constants";

export const sendHtmlResponse = (
  res: http.ServerResponse,
  html: string
): void => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
  console.timeEnd(API_TIME_ELAPSED);
};

export const sendJSONResponse = (
  res: http.ServerResponse,
  json: JSONResponse
): void => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(json));
};

export const sendInternalServerError = (res: http.ServerResponse) => {
  res.writeHead(500);
  res.end("Internal Server Error");
};
