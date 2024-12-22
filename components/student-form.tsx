"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStudentStore } from "@/store/studentStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const studentSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cohort: z
    .string()
    .regex(/^AY \d{4}-\d{2}$/, "Cohort must follow the format AY YYYY-YY"),
  courses: z
    .array(z.string().nonempty("Course name cannot be empty"))
    .min(1, "At least one course is required"),
  dateJoined: z.string().nonempty("Date joined is required"),
  lastLogin: z.string().nonempty("Last login is required"),
  status: z.enum(["Active", "Inactive"]),
});

export function AddStudentFormDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const students = useStudentStore((state) => state.students);
  const setStudents = useStudentStore((state) => state.setStudents);

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      cohort: "",
      courses: [""],
      dateJoined: "",
      lastLogin: "",
      status: "Active",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses" as const,
  });

  function onSubmit(values: z.infer<typeof studentSchema>) {
    // Make a POST request to the backend API
    setLoading(true);
    fetch("/api/students/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Failed to add student");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Student added successfully:", data);
        alert("Student added successfully!"); // Optional: Provide user feedback
        setStudents([...students, data]);
        setLoading(false);
        setOpen(false); // Close the dialog
        form.reset(); // Reset the form
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding student:", error);
        alert("Error adding student: " + error.message); // Optional: Provide user feedback
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="text-[#3F526E] font-semibold text-base"
        >
          <Plus className="mr-1 h-8 w-8" strokeWidth={3} />
          Add new Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cohort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cohort</FormLabel>
                  <FormControl>
                    <Input placeholder="AY 2023-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Courses</FormLabel>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`courses.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 mt-2">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append("")}
              >
                Add Course
              </Button>
              <FormMessage>
                {form.formState.errors.courses?.message}
              </FormMessage>
            </div>
            <FormField
              control={form.control}
              name="dateJoined"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Joined</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastLogin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Login</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Add Student"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
