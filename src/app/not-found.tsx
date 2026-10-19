import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-extrabold text-[#CCFF00] font-display mb-2">404</h1>
      <h2 className="text-2xl font-bold uppercase font-display mb-4">PAGE NOT FOUND</h2>
      <p className="text-zinc-400 mb-8 max-w-md">
        The lift or route you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="bg-[#CCFF00] text-black font-extrabold uppercase px-6 py-3 rounded-lg hover:bg-[#b3e600] transition text-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}