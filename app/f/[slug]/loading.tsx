export default function FeedArticleLoading() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-4xl animate-pulse px-6 pt-36">
      <div className="h-4 w-32 rounded bg-surface-2" />
      <div className="mt-16 h-16 max-w-2xl rounded bg-surface-2" />
      <div className="mt-8 h-6 max-w-xl rounded bg-surface-2" />
      <div className="mt-20 space-y-4">
        <div className="h-4 rounded bg-surface-2" />
        <div className="h-4 rounded bg-surface-2" />
        <div className="h-4 w-4/5 rounded bg-surface-2" />
      </div>
    </main>
  );
}
