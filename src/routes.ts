import http from "http";
import { BASE_URL, HTTP_GET, NOT_FOUND_404 } from "./constants";
import { Route } from "./interfaces";
import { getTitles } from "./controllers/title";
import { healthCheck } from "./controllers/root";

// Create a router to handle multiple routes
const ROUTES: Route[] = [
  {
    path: "/I/want/title/",
    method: HTTP_GET,
    handler: getTitles,
  },
  { path: "/", method: HTTP_GET, handler: healthCheck },
  // Add more routes
];

export const matchRoute = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  implementation?: Function
): void => {
  const parsedUrl = new URL(req.url as string, `${BASE_URL}`);
  const matchingRoute = ROUTES.find(
    (route) => route.path === parsedUrl.pathname && route.method === req.method
  );

  if (matchingRoute) {
    matchingRoute.handler(req, res, implementation);
  } else {
    notFound(res);
  }
};

const notFound = (res: http.ServerResponse): void => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end(NOT_FOUND_404);
};
