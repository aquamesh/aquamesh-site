import SitePageShell from "../components/site-page-shell";

export default function NotFoundPage() {
  return (
    <SitePageShell>
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center px-6 py-20">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-4xl font-bold tracking-tight text-aquamesh-700 sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The requested AquaMesh page does not exist in the static export.
          </p>
        </div>
      </div>
    </SitePageShell>
  );
}
