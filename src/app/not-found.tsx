import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171717] px-6 text-white">
      <section className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d9b27a]">404</p>
        <h1 className="mt-5 text-[clamp(3rem,8vw,6rem)] font-semibold leading-none">Page not found</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/68">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex border border-[#d9b27a] bg-[#d9b27a] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-transparent"
        >
          Return Home
        </Link>
      </section>
    </main>
  );
}
