export function createCounter() {
  const button = document.createElement('button');
  button.textContent = 'Count: 0';
  let count = 0;

  button.addEventListener('click', () => {
    count++;
    button.textContent = `Count: ${count}`;
 });

  return button;
}