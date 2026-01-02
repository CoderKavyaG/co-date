import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-12 shadow-xl max-w-lg w-full text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-600 mb-8">We couldn't find the page you were looking for.</p>
                <Link
                    href="/"
                    className="inline-block w-full px-6 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-900 transition-all hover:shadow-lg"
                >
                    Return Home
                </Link>
            </div>
        </main>
    );
}
