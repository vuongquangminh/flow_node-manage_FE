import { expect, test, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { createGreeting } from "./dom-utils";

// Set up a fresh DOM before each test
beforeEach(() => {
  // Create a new JSDOM instance with a basic HTML structure
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");

  // Set the global document and window objects to use the JSDOM instance
  global.document = dom.window.document;
  (global.window as unknown) = dom.window;
});

test("createGreeting adds a greeting to the DOM", () => {
  // Clear the body content before the test
  document.body.innerHTML = "";

  // Act: Call the createGreeting function
  const element = createGreeting("Vitest");

  // Assert: Check if the greeting text is correct
  expect(element.textContent).toBe("Hello, Vitest!");

  // Assert: Check if the correct CSS class is applied
  expect(element.className).toBe("greeting");

  // Assert: Check if the element is actually in the document body
  expect(document.body.contains(element)).toBe(true);
});
