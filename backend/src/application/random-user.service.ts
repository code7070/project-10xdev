import { RandomUserRepo } from "../infrastructure/database/random-user.repo";
import { RandomUser } from "../interfaces/entities";

export class RandomUserService {
  private randomUserRepo: RandomUserRepo;

  constructor(randomUserRepo: RandomUserRepo) {
    this.randomUserRepo = randomUserRepo;
  }

  async get(amount: number = 1) {
    return await this.randomUserRepo.get(amount);
  }
}
