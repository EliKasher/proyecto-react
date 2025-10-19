import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import getCookie from "../utils/cookie";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getCookie(req.headers["cookie"] || "", "token");

    if (!token) {
      next();
    }

    if (token) {
      const decodedToken = jwt.verify(token, config.JWT_SECRET);
      const csrfToken =
        req.headers["x-csrf-token"] || req.headers["X-CSRF-Token"];
      if (
        typeof decodedToken === "object" &&
        decodedToken.id &&
        decodedToken.csrf === csrfToken
      ) {
        req.userId = decodedToken.id;
        req.roles = decodedToken.roles;

        next();
      } else {
        res.status(401).json({
          error: "invalid token",
        });
      }
    }
  } catch (error: any) {
    res.status(401).json({
      error: "invalid token",
    });
  }
};

export const requireRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.userId || !req.roles) {
            return res.status(401).json({ 
                error: "Authentication required or user data incomplete",
                details: "User object or roles property missing from request"
            });
        }

        const hasRequiredRole = req.roles.some(role => 
            roles.includes(role)
        );

        if (!hasRequiredRole) {
            return res.status(403).json({ 
                error: "Insufficient permissions",
                required: roles,
                current: req.roles
            });
        }

        next();
    };
};