import { EmployeeRepo } from "../infrastructure/database/employee.repo";
import { HelperService } from "./helper.service";

export class EmployeeService {
  private employeeRepo: EmployeeRepo;
  private helperService: HelperService;

  constructor(employeeRepo: EmployeeRepo) {
    this.employeeRepo = employeeRepo;
    this.helperService = new HelperService();
  }

  async addEmployee(amount?: number) {
    const result = await this.employeeRepo.addEmployee(amount);
    return this.helperService.handleResponse(result);
  }

  async getEmployee(id?: string) {
    const result = await this.employeeRepo.getEmployee(id);
    return this.helperService.handleResponse(result);
  }

  async getAllEmployee() {
    const result = await this.employeeRepo.getAll();
    return this.helperService.handleResponse(result);
  }
}
