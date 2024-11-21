"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { projects } from "@/lib/data"

export function TaskForm({ onSubmit }: { onSubmit: () => void }) {
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("")
  const [assignee, setAssignee] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [projectId, setProjectId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ title, status, assignee, dueDate, projectId })
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="project">Project</Label>
        <Select onValueChange={setProjectId} required>
          <SelectTrigger>
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id.toString()}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={setStatus} required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not-started">Not Started</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="assignee">Assignee</Label>
        <Input id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <Button type="submit">Create Task</Button>
    </form>
  )
}

