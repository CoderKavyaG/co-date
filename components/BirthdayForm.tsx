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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Date of Birth
        </label>
        <DatePicker
          id="birthday"
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText="Choose your birthday"
          maxDate={new Date()}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          wrapperClassName="w-full"
          calendarClassName="font-sans"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!selectedDate}
      >
        Discover Your Place
      </button>
    </form>
  );
}
