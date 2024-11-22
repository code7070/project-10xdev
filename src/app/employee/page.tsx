import { EmployeeManagement as Employee1 } from "@/components/employee/management";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Employee Management</h1>
      <Employee1 />
    </div>
  );
}
