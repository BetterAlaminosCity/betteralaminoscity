import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { ErrorBoundary } from "../app/root";

describe("root ErrorBoundary", () => {
  it("renders a 404 ErrorPage for a route-not-found response", async () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        ErrorBoundary,
        loader: () => {
          throw new Response("Not Found", { status: 404 });
        },
      },
    ]);
    render(<Stub initialEntries={["/"]} />);

    expect(
      await screen.findByRole("heading", { name: /404 — Page Not Found/ }),
    ).toBeInTheDocument();
  });

  it("renders a 500 ErrorPage for a generic thrown error", async () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        ErrorBoundary,
        loader: () => {
          throw new Error("boom");
        },
      },
    ]);
    render(<Stub initialEntries={["/"]} />);

    expect(
      await screen.findByRole("heading", { name: /500 — Something Went Wrong/ }),
    ).toBeInTheDocument();
  });
});
