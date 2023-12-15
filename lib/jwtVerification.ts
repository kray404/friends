import jwt from "jsonwebtoken";

type MiddlewareFunction = (input: Request | string) => Promise<boolean>;

export const verifyToken: MiddlewareFunction = async (input) => {
  try {
    let token: string | null;

    if (input instanceof Request) {
      // Extract token from Request headers
      token = input.headers.get("Authorization")?.split(" ")[1] ?? null;
    } else {
      // Directly use the input as the token if it's a string
      token = input;
    }

    if (!token) return false;

    // Verify the JWT token
    await jwt.verify(token, process.env.STREAMELEMENTS_JWT_TOKEN as string);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};
