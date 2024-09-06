import http from "http";
import https from "https";
import async from "async";
import { from, forkJoin } from "rxjs";
import { AddressResult } from "../../interfaces";
import { sendHtmlResponse, sendInternalServerError } from "../../utils";

const fetchTitleHTTP = (address: string): Promise<AddressResult> => {
  return new Promise((resolve) => {
    const reqUrl: string = address.startsWith("http")
      ? address
      : "https://" + address;
    const protocol = reqUrl.startsWith("https") ? https : http;

    protocol
      .get(reqUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
          const title = titleMatch ? titleMatch[1] : "NO RESPONSE";
          resolve({ address, title });
        });
      })
      .on("error", () => {
        resolve({ address, title: "NO RESPONSE" });
      });
  });
};

const fetchTitleAwait = async (address: string): Promise<AddressResult> => {
  try {
    const reqUrl: string = address.startsWith("http")
      ? address
      : "https://" + address;

    const response = await fetch(reqUrl);
    const data = await response.text();

    const titleMatch = data.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "NO RESPONSE";
    return { address, title };
  } catch (err) {
    return { address, title: "NO RESPONSE" };
  }
};

// Plain Js
export const callbackImplementation = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  addresses: string[]
): void => {
  const results: AddressResult[] = [];
  let count = 0;
  let hasError = false;

  const handleError = () => {
    if (!hasError) {
      hasError = true;
      sendInternalServerError(res);
    }
  };

  addresses.forEach((address, index) => {
    fetchTitleHTTP(address)
      .then((result) => {
        results[index] = result;
        count++;
        if (count === addresses.length) {
          if (!hasError) {
            sendHtmlResponse(res, createTitlesHTMLResponse(results));
          }
        }
      })
      .catch((err) => {
        handleError();
      });
  });
};

// Async
export const asyncJsImplementation = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  addresses: string[]
): void => {
  async.map(
    addresses,
    (
      address: string,
      callback: (err: any, result?: { address: string; title: string }) => void
    ) => {
      fetchTitleAwait(address)
        .then((result) => callback(null, result))
        .catch(() => callback(null, undefined));
    },
    (
      err: any,
      results: Array<{ address: string; title: string } | undefined> | undefined
    ) => {
      if (err) {
        sendInternalServerError(res);
        return;
      }

      // Filter out any undefined results
      const filteredResults = (results || []).filter(
        (result): result is { address: string; title: string } =>
          result !== undefined
      );
      sendHtmlResponse(res, createTitlesHTMLResponse(filteredResults));
    }
  );
};

// Promises
export const promisesImplementation = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  addresses: string[]
): void => {
  const promises = addresses.map(fetchTitleAwait);
  Promise.all(promises)
    .then((results) => {
      sendHtmlResponse(res, createTitlesHTMLResponse(results));
    })
    .catch(() => {
      sendInternalServerError(res);
    });
};

// RxJS streams
export const rxjsImplementation = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  addresses: string[]
): void => {
  const observables = addresses.map((address) =>
    from(fetchTitleAwait(address))
  );

  forkJoin(observables).subscribe({
    next: (results: AddressResult[]) => {
      sendHtmlResponse(res, createTitlesHTMLResponse(results));
    },
    error: () => {
      sendInternalServerError(res);
    },
  });
};

const createTitlesHTMLResponse = (results: AddressResult[]) => {
  let responseHtml = "<html><head></head><body>";
  responseHtml += "<h1> Following are the titles of given websites: </h1><ul>";
  results.forEach((result) => {
    responseHtml += `<li> ${result.address} - "${result.title}" </li>`;
  });
  responseHtml += "</ul></body></html>";
  return responseHtml;
};
