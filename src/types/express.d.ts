import { Users } from "../users/users.model"

declare global {
  namespace Express {
    interface Request {
      user?: Users; // Add the user property here
    }
  }
}