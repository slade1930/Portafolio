export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-accent" />
          <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-accent glow-dot" />
        </div>
        <p className="text-sm text-muted">Cargando…</p>
      </div>
    </div>
  );
}
