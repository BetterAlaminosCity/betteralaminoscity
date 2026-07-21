import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, type LoaderFunction } from "react-router";
import { describe, expect, it } from "vitest";

import ServicesArticle, { loader } from "../../../app/routes/services/article";

describe("ServicesArticle", () => {
  it("renders the article title, body, and a link back to its category", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/services/:category/:article",
          Component: ServicesArticle,
          loader: loader as LoaderFunction,
        },
      ],
      { initialEntries: ["/services/health-services/overview"] },
    );
    render(<RouterProvider router={router} />);

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText(/City Health Office coordinates/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Health Services" })).toHaveAttribute(
      "href",
      "/services/health-services",
    );
  });

  it("throws a 404 response for an unknown article", () => {
    expect(() =>
      loader({
        params: { category: "health-services", article: "does-not-exist" },
      } as unknown as Parameters<typeof loader>[0]),
    ).toThrow();
  });

  it("renders GovernmentService JSON-LD structured data", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/services/:category/:article",
          Component: ServicesArticle,
          loader: loader as LoaderFunction,
        },
      ],
      { initialEntries: ["/services/health-services/overview"] },
    );
    const { container } = render(<RouterProvider router={router} />);
    await screen.findByRole("heading", { name: "Overview" });

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const jsonLd = JSON.parse(script!.textContent ?? "{}");
    expect(jsonLd["@type"]).toBe("GovernmentService");
    expect(jsonLd.name).toBe("Overview");
    expect(jsonLd.url).toBe("https://betteralaminoscity.org/services/health-services/overview");
    expect(jsonLd).not.toHaveProperty("provider");
  });

  it("renders requirements, steps, and office when present", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/services/:category/:article",
          Component: ServicesArticle,
          loader: loader as LoaderFunction,
        },
      ],
      {
        initialEntries: ["/services/agriculture-fisheries/farm-inputs-and-technology-assistance"],
      },
    );
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", {
        name: "Farm Inputs and Technology Assistance on Rice and Corn Production Service",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Endorsement Letter signed by the Association President"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sign the Visitor's Logbook in the Office Information desk"),
    ).toBeInTheDocument();
    expect(screen.getByText(/City Agriculture Office/)).toBeInTheDocument();
  });
});
