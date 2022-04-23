import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Response } from "express";

export const OK = (res: Response, data: Object) => res.status(StatusCodes.OK).send(data);

export const CREATED = (res: Response, data: Object) => res.status(StatusCodes.CREATED).send(data);

export const NOT_FOUND = (res: Response, error?: string) =>
  res.status(StatusCodes.NOT_FOUND).send({
    error: error || "Can't find this page",
    code: "NOT_FOUND",
  });

export const BAD_REQUEST = (res: Response, error?: string) =>
  res.status(StatusCodes.BAD_REQUEST).send({
    error: error || "Gimme a proper request",
    code: "BAD_REQUST",
  });

export const INTERNAL = (res: Response, error?: string) =>
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    error: error || ReasonPhrases.INTERNAL_SERVER_ERROR,
    code: "INTERNAL_SERVER_ERROR",
  });

export const CONFLICT = (res: Response, error: string) => res.status(StatusCodes.CONFLICT).send({ error, code: "CONFLICT" });

export const UNAUTHORIZED = (res: Response) =>
  res.status(StatusCodes.UNAUTHORIZED).send({ error: "Unauthorized request", code: "UNAUTHORIZED" });
