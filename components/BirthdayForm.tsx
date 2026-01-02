"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createShareableUrl } from "@/lib/coordinates";
import LoadingScreen from "./LoadingScreen";

export default function BirthdayForm() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedDate) {
      setError("Please select your date of birth");
      return;
    }

    setIsLoading(true);

    // Artificial delay for the "cool loading effect"
    await new Promise((resolve) => setTimeout(resolve, 3500));

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    // Navigate to result page
    const url = createShareableUrl({ day, month, year });
    router.push(url);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-4">
      <div className="relative group w-full bg-white border-2 border-black flex items-center">
        <div className="flex-grow">
          <DatePicker
            id="birthday"
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              setIsCalendarOpen(false);
            }}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== "Backspace" &&
                e.key !== "Tab" &&
                e.key !== "ArrowLeft" &&
                e.key !== "ArrowRight" &&
                e.key !== "/"
              ) {
                e.preventDefault();
              }
            }}
            open={isCalendarOpen}
            onClickOutside={() => setIsCalendarOpen(false)}
            preventOpenOnFocus
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            maxDate={new Date()}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="w-full px-6 py-4 bg-transparent text-lg text-gray-900 placeholder-gray-400 focus:outline-none font-mono"
            wrapperClassName="w-full"
            calendarClassName="font-sans border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="px-4 py-4 bg-black text-white hover:bg-gray-900 transition-colors border-l-2 border-black h-full flex items-center justify-center"
          aria-label="Toggle calendar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-500 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedDate}
        className="w-full px-6 py-4 bg-black text-white text-lg font-medium hover:bg-gray-900 transition-all duration-200 flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
      >
        <span>Discover Location</span>
        <svg
          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </form>
  );
}
