import type { Request, Response, NextFunction } from "express";

export const logger = async(req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  console.log(
    `\n[Request]
      Method: ${req.method}
      Route: ${req.originalUrl}
      Time: ${new Date().toISOString()} \n`
  );

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
    `\n[Response]
      Method: ${req.method}
      Route: ${req.originalUrl}
      Status: ${res.statusCode}
      Duration(ms): ${duration}ms \n`
  );
  });

  next();
}
