// api.test.js

import { expect, test, vi } from "vitest";
import userAPI from "./userAPI";

// Mock the fetch function globally
vi.mock("node-fetch");

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

test("getUser fetches user data successfully", async () => {
  const mockResponse = { id: 1, name: "John Doe" };
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  const user = await userAPI.getUser(1);

  expect(user).toEqual(mockResponse);
  expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/users/1");
});

test("createUser sends POST request with user data", async () => {
  const newUser = { name: "Jane Doe", email: "jane@example.com" };
  const mockResponse = { id: 2, ...newUser };
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  const createdUser = await userAPI.createUser(newUser);

  expect(createdUser).toEqual(mockResponse);
  expect(mockFetch).toHaveBeenCalledWith(
    "https://api.example.com/users",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
  );
});

test("updateUser sends PUT request with updated data", async () => {
  const userId = 1;
  const updatedData = { name: "John Updated" };
  const mockResponse = { id: userId, ...updatedData };
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });
  const updatedUser = await userAPI.updateUser(userId, updatedData);
  expect(updatedUser).toEqual(mockResponse);
  expect(mockFetch).toHaveBeenCalledWith(
    `https://api.example.com/users/${userId}`,
    expect.objectContaining({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
  );
});

test("deleteUser sends DELETE request with deleted data", async () => {
  const userId = 1;
  const mockResponse = true;
  mockFetch.mockResolvedValueOnce({
    ok: true,
    return: true,
  });

  const deleteUser = await userAPI.deleteUser(userId);

  expect(deleteUser).toEqual(mockResponse);
  expect(mockFetch).toHaveBeenCalledWith(
    `https://api.example.com/users/${userId}`,
    expect.objectContaining({
      method: "DELETE",
    })
  );
});

// test case when ok : false mean error
test("getUser handles error response", async () => {
  mockFetch.mockResolvedValueOnce({ ok: false });

  await expect(userAPI.getUser(1)).rejects.toThrow("Failed to fetch user");
});

// test case when ok : false mean error
test("createUser handles error response", async () => {
  const validUser = { name: "John", email: "john@example.com" };
  mockFetch.mockResolvedValueOnce({ ok: false });
  await expect(userAPI.createUser(validUser)).rejects.toThrow(
    "Failed to create user"
  );
});

// test case validate field
test("createUser throws when input is invalid", async () => {
  await expect(userAPI.createUser({ name: "" })).rejects.toThrow(
    "Invalid input"
  );
});

// test case when ok : false mean error
test("updateUser handles error response", async () => {
  mockFetch.mockResolvedValueOnce({ ok: false });

  await expect(userAPI.updateUser(1, {})).rejects.toThrow(
    "Failed to update user"
  );
});

// test case when ok : false mean error
test("deleteUser handles error response", async () => {
  mockFetch.mockResolvedValueOnce({ ok: false });

  await expect(userAPI.deleteUser(1)).rejects.toThrow("Failed to delete user");
});
