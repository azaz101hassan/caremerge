import * as dotenv from "dotenv";

dotenv.config();

export const PORT: number = Number(process.env.PORT) || 3000;
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}/`;

export const HTTP_POST = "POST";
export const HTTP_GET = "GET";
export const HTTP_PUT = "PUT";
export const HTTP_PATCH = "PATCH";

export const API_TIME_ELAPSED = "API Time Elapsed";

export const NOT_FOUND_404 = "404 Not Found";
