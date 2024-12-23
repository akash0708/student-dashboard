"use client";
import { AddStudentFormDialog } from "@/components/student-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCustomDate } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";
import { useStudentStore } from "@/store/studentStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const students = useStudentStore((state) => state.students);
  const setStudents = useStudentStore((state) => state.setStudents);

  const cohort = useFilterStore((state) => state.cohort);
  const setCohort = useFilterStore((state) => state.setCohort);
  const classFilter = useFilterStore((state) => state.class);
  const setClass = useFilterStore((state) => state.setClass);

  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students/read");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, [setStudents]);

  const filteredStudents = students.filter((student) => {
    const matchesCohort = cohort ? student.cohort === cohort : true;
    const matchesClass = classFilter
      ? student.courses.some((course: string) => course.includes(classFilter))
      : true;

    return matchesCohort && matchesClass;
  });

  return (
    <>
      <div className="fliters flex flex-col sm:flex-row justify-stretch sm:justify-between items-center gap-4 sm:gap-0">
        <div className="flex flex-row gap-4 w-full sm:w-fit">
          <Select value={cohort} onValueChange={setCohort}>
            <SelectTrigger className="w-[150px] bg-[#E9EDF1] font-bold text-[#3F526E]">
              <SelectValue placeholder="Cohort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
              <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
              <SelectItem value="AY 2022-23">AY 2022-23</SelectItem>
            </SelectContent>
          </Select>

          <Select value={classFilter} onValueChange={setClass}>
            <SelectTrigger className="w-[150px] bg-[#E9EDF1] font-bold text-[#3F526E]">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE 9">CBSE 9</SelectItem>
              <SelectItem value="CBSE 10">CBSE 10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AddStudentFormDialog />
      </div>
      <Table className="mt-4 text-sm w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Cohort</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student, index) => (
            <TableRow
              key={index}
              className="cursor-pointer"
              onClick={() => router.push(`/students/${student.id}`)}
            >
              <TableCell>{student.name}</TableCell>
              <TableCell>
                <div className="w-20">{student.cohort}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {student.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="min-w-28 flex flex-row justify-center items-center rounded-md bg-[#F6F8FA] px-2 py-2 text-sm font-medium text-black"
                    >
                      <Image
                        src="/student.png"
                        alt="dummy"
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-md inline-block mr-2"
                      />
                      {course}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="w-56">
                {formatCustomDate(student.lastLogin)}
              </TableCell>
              <TableCell className="w-56">
                {formatCustomDate(student.lastLogin)}
              </TableCell>
              <TableCell>
                <div
                  className={`h-3 w-3 ml-4 rounded-full ${
                    student.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
