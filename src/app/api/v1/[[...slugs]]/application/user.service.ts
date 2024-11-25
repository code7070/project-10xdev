import { PostgrestError } from "@supabase/supabase-js";
import { UserRepo } from "../infrastructure/database/user.repo";
import { User } from "../interfaces/entities";
import { error } from "elysia";
import { isPostgrestError } from "../utils/helper";

interface IPhoto {
  message: string;
  status: "success" | "failed";
}

interface ServiceResponse<T> {
  status: number;
  data: T;
}

export class UserService {
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  private handleError(err: PostgrestError) {
    throw error(401, { message: err.message });
  }

  private wrapResponse<T>(data: T): ServiceResponse<T> {
    return {
      status: 200,
      data,
    };
  }

  async getByToken(token: string): Promise<ServiceResponse<User>> {
    const result = await this.userRepo.getByToken(token);
    if (isPostgrestError(result)) this.handleError(result);
    return this.wrapResponse(result as User);
  }

  async login(
    name: string,
    password: string
  ): Promise<ServiceResponse<Partial<User>>> {
    const result = await this.userRepo.login(name, password);
    if (isPostgrestError(result)) this.handleError(result);
    return this.wrapResponse(result as User);
  }

  async create(
    name: string,
    password: string
  ): Promise<Partial<User> | PostgrestError> {
    const dogurl = "https://dog.ceo/api/breeds/image/random";
    const photo = (await fetch(dogurl).then((res) => res.json())) as IPhoto;
    return this.userRepo.create(name, password, photo?.message || "");
  }
}
