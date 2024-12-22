"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useStudentStore } from "@/store/studentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function StudentProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const students = useStudentStore((state) => state.students);
  const updateStudent = useStudentStore((state) => state.updateStudent);
  const removeStudent = useStudentStore((state) => state.removeStudent);

  const [student, setStudent] = useState(
    students.find((s) => s.id === id) || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student);

  useEffect(() => {
    if (!student) {
      const fetchStudent = async () => {
        try {
          const response = await fetch(`/api/students/${id}`);
          if (!response.ok) throw new Error("Failed to fetch student data");
          const data = await response.json();
          setStudent(data);
          setFormData(data);
        } catch (error) {
          console.error("Failed to fetch student details:", error);
          toast({
            title: "Error",
            description: "Failed to fetch student details. Please try again.",
            variant: "destructive",
          });
        }
      };

      fetchStudent();
    }
  }, [id, student]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update student");

      const updatedStudent = await response.json();
      updateStudent(id, updatedStudent);
      setStudent(updatedStudent);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Student profile updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update student:", error);
      toast({
        title: "Error",
        description: "Failed to update student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete student");

      removeStudent(id);
      router.push("/dashboard");
      toast({
        title: "Success",
        description: "Student deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete student:", error);
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!student) return <StudentProfileSkeleton />;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Student Profile</CardTitle>
        <CardDescription>View and manage student information</CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Cohort:</strong> {student.cohort}
            </p>
            <p>
              <strong>Courses:</strong> {student.courses.join(", ")}
            </p>
            <p>
              <strong>Date Joined:</strong> {student.dateJoined}
            </p>
            <p>
              <strong>Last Login:</strong> {student.lastLogin}
            </p>
            <p>
              <strong>Status:</strong> {student.status}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData?.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cohort">Cohort</Label>
              <Input
                id="cohort"
                value={formData?.cohort || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cohort: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courses">Courses</Label>
              <Input
                id="courses"
                value={formData?.courses.join(", ") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    courses: e.target.value
                      .split(",")
                      .map((course) => course.trim()),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData?.status || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isEditing ? (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleUpdate}>Save</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

function StudentProfileSkeleton() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[100px]" />
      </CardFooter>
    </Card>
  );
}
