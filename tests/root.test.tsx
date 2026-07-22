import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import App, { ErrorBoundary, loader } from "../app/root";

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

describe("root App", () => {
  it("renders the EmergencyHotlineBar above the Navbar using the root loader's data", async () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: App,
        loader,
        children: [{ index: true, Component: () => <p>Page content</p> }],
      },
    ]);
    render(<Stub initialEntries={["/"]} />);

    expect(await screen.findByRole("link", { name: /911/ })).toHaveAttribute("href", "tel:911");
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
