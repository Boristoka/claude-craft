import Link from "next/link";

/**
 * Custom 404 Page
 *
 * This page is shown when a route is not found.
 * Clean, minimal design that matches the kit aesthetic.
 */

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Large 404 */}
        <h1 className="font-serif text-[8rem] md:text-[12rem] leading-none text-neutral-200 dark:text-neutral-800 select-none">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 md:-mt-12 relative">
          <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 dark:text-white mb-4">
            Page not found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            Sorry, we couldn't find the page you're looking for.
            Perhaps you've mistyped the URL or the page has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to home
            </Link>
            <Link
              href="/demo/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-xl font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Contact support
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
