import http from "http";

// Type definitions

export interface AddressResult {
  address: string;
  title: string;
}

export interface Route {
  path: string;
  method: string;
  handler: (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    implementation?: Function
  ) => void;
}

export interface JSONResponse {
  data: any;
  message: string;
  code: number;
}
