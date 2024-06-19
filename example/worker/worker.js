self.onmessage = function(event) {
  const number = event.data;
  const result = fibonacci(number);
  self.postMessage(result);
};

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
