import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

test("Home Page", () => {
  render(<Page />);
  expect(screen.getByTestId("home-page")).toMatchFileSnapshot(
    "./__snapshots__/home-page.output.html"
  );
});
