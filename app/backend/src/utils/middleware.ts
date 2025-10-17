import { MongoServerError } from "mongodb";
import { NextFunction, Request, Response } from "express";
import logger from "./logger";


const requestLogger = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(404).send({ error: "unknown endpoint" });
};



const errorHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {

    if (error.name === "CastError") {
        return response.status(400).json({ error: "ID mal formateado" });
    }

    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    const mongoError = error instanceof MongoServerError
        ? error
        : error.cause instanceof MongoServerError
            ? error.cause
            : null;

    if (mongoError && mongoError.code === 11000) {
        const field = mongoError.keyValue
            ? Object.keys(mongoError.keyValue)[0]
            : "campo";
        return response.status(400).json({
            error: `El ${field} ya está registrado`,
        });
    }

    if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "Token inválido" });
    }

    if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "Token expirado" });
    }

    console.error("Error no manejado:", error);
    return response.status(500).json({ error: "Error interno del servidor" });
};




export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
};