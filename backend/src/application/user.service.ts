import { PostgrestError } from "@supabase/supabase-js";
import { UserRepo } from "../infrastructure/database/user.repo";
import { User } from "../interfaces/entities";
import { HelperService } from "./helper.service";

interface IPhoto {
  message: string;
  status: "success" | "failed";
}

export class UserService {
  private userRepo: UserRepo;
  private helperService: HelperService;

  constructor(userRepo: UserRepo, helperService: HelperService) {
    this.userRepo = userRepo;
    this.helperService = helperService;
  }

  async getByToken(token: string) {
    const result = await this.userRepo.getByToken(token);
    return this.helperService.handleResponse(result);
  }

  async login(name: string, password: string) {
    const result = await this.userRepo.login(name, password);
    return this.helperService.handleResponse(result);
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
