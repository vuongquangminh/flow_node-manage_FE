import { expect, test, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { createCounter } from "./counter";

beforeEach(() => {
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
  global.document = dom.window.document;
  (global.window as unknown) = dom.window;
});

test("counter increments when clicked", () => {
  const counter = createCounter();
  document.body.appendChild(counter);
  expect(counter.textContent).toBe("Count: 0");
  counter.click();
  expect(counter.textContent).toBe("Count: 1");
  counter.click();
  counter.click();
  expect(counter.textContent).toBe("Count: 3");
});
