import { RandomUser } from "../../interfaces/entities";

export class RandomUserRepo {
  constructor() {}

  async get(amount: number) {
    const params = `results=${amount}&inc=login,name,picture,email`;
    const endpoint = `https://randomuser.me/api?${params}`;
    return (await fetch(endpoint).then((res) => res.json())) as {
      results: RandomUser[];
    };
  }
}
