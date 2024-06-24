const onMessageFn = () => {
  throw new Error('No onMessage function provided');
};

export function useSharedWorker(
  onMessage = onMessageFn,
  url = './shared-worker.js',
) {
  const worker = new SharedWorker(url);
  worker.port.start();

  worker.port.addEventListener('message', onMessage);
  return { worker };
}
