import jwt from "jsonwebtoken";

type MiddlewareFunction = (request: Request) => Promise<boolean>;

export const verifyToken: MiddlewareFunction = async (request) => {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) return false;

    console.log("TOKEN 2: " + token);

    await jwt.verify(token, process.env.STREAMELEMENTS_SECRET_TOKEN as string);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};
