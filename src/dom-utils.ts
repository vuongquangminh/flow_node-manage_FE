// Function to create a greeting element and add it to the DOM
export function createGreeting(name: string) {
  // Create a new div element
  const div = document.createElement('div');
  
  // Set the text content of the div
  div.textContent = `Hello, ${name}!`;
  
  // Add a CSS class to the div
  div.className = 'greeting';
  
  // Append the div to the document body
  document.body.appendChild(div);
  
  // Return the created element
  return div;
}