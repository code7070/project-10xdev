import { UserService } from "../../application/user.service";
import { UserRepo } from "../database/user.repo";

const userRepo = new UserRepo();
export const userService = new UserService(userRepo);
