import http from "http";
import { BASE_URL } from "../../constants";

export const getTitles = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  implementation?: Function
) => {
  const parsedUrl = new URL(req.url as string, BASE_URL);
  const query = parsedUrl.searchParams.getAll("address");
  const addresses = query.length > 0 ? query : [];
  if (implementation) implementation(req, res, addresses);
};
