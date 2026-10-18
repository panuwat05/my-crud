"use client";

// global-error ต้องมี <html> และ <body> เอง เพราะแทนที่ root layout
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="th">
      <body>
        <p>global error</p>
        <button onClick={() => reset()}>ลองใหม่</button>
      </body>
    </html>
  );
}
