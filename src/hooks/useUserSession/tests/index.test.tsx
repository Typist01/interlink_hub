import { expect, it, describe } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUserSession } from "../useUserSession";
import {
  UserContext,
  UserModel,
  UserProvider,
} from "@/contexts/AuthContextProvider";
import fetchMock from "fetch-mock";

const mockUser: UserModel = {
  name: "some user",
  email: "some email",
  id: "some id",
  picture: "some picture ",
  isGuest: false,
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
};
describe("useSearch", () => {
  it("should return a default search term and original items", async () => {
    fetchMock.mock({ url: "/api/me", response: mockUser });
    const { result } = renderHook(() => useUserSession());
    // call the useUserSession hook and check the result is mockResponse
    const { getSession } = result.current;
    expect(getSession).toBeDefined();
    const response = await getSession();
    const res = await fetch("/api/me");
    expect(response).toBeDefined();
    expect(response).toEqual(mockUser);
  });
});
