"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { employees } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export function EmployeeManagement() {
  const [newEmployee, setNewEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState(employees);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmployee.trim()) {
      const newEmployeeObj = {
        id: employeeList.length + 1,
        name: newEmployee.trim(),
      };
      setEmployeeList([...employeeList, newEmployeeObj]);
      setNewEmployee("");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddEmployee} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newEmployee">Add New Employee</Label>
          <div className="flex space-x-2">
            <Input
              id="newEmployee"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
              placeholder="Enter employee name"
            />
            <Button type="submit">Add Employee</Button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Employee List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeList.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
