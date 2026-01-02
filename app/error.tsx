"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-red-100 rounded-3xl p-8 sm:p-12 shadow-xl max-w-lg w-full text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
                <p className="text-gray-600 mb-8">An unexpected error occurred. Please try again.</p>
                <button
                    onClick={() => reset()}
                    className="w-full px-6 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-900 transition-all hover:shadow-lg"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}
