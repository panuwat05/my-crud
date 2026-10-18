"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "24px" }}>
      <p>local error</p>
      <button onClick={() => reset()}>ลองใหม่</button>
    </div>
  );
}
