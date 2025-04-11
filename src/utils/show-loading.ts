export function showLoading(message: string): () => void {
  process.stdout.write(`${message} `);
  let dots = 0;
  const interval: NodeJS.Timeout = setInterval(() => {
    process.stdout.write('.');
    dots++;
    if (dots > 3) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(`${message} `);
      dots = 0;
    }
  }, 300);
  return () => {
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  };
}
