'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-12 text-center">
      <h2>Something went wrong</h2>
      <button onClick={reset} className="mt-4 glass px-4 py-2">Try again</button>
    </div>
  );
}
