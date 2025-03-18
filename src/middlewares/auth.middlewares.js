import { AuthorizationNotFound } from "../exceptions/auth.exceptions";
import { verifyToken } from "../helpers/jwt";

export const isAuthenticated = (request, response, next) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) throw new AuthorizationNotFound();
    const accessToken = authorization.split(" ")[1];
    const { id } = verifyToken(accessToken);
    request.current_user = id;
    return next();
  } catch (error) {
    return response.status(error?.code || 403).json({ message: error.message });
  }
};
