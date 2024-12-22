import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCustomDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "d. MMM. yyyy h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};
