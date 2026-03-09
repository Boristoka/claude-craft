import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Demo 404 Page
 *
 * Matches the demo site styling with the editorial aesthetic.
 */

export default function DemoNotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <h1 className="font-serif text-[10rem] md:text-[14rem] leading-none text-neutral-100 dark:text-neutral-800 select-none">
          404
        </h1>

        {/* Message */}
        <div className="-mt-16 md:-mt-24 relative">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4">
            Page not <em className="italic">found</em>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/demo">
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
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/demo/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
