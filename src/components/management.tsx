"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { employees } from "@/lib/data"

export function EmployeeManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState("")

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Adding new employee:", newEmployee)
    setNewEmployee("")
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Employees</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Employee Management</DialogTitle>
          <DialogDescription>
            View current employees and add new ones.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Current Employees</h3>
            <ul className="list-disc list-inside">
              {employees.map(employee => (
                <li key={employee.id}>{employee.name}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmployee">Add New Employee</Label>
              <Input
                id="newEmployee"
                value={newEmployee}
                onChange={(e) => setNewEmployee(e.target.value)}
                placeholder="Enter employee name"
              />
            </div>
            <Button type="submit">Add Employee</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

