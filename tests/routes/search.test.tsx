import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { I18nProvider } from "../../app/i18n/I18nProvider";
import Search from "../../app/routes/search";
import type { SearchIndexEntry } from "../../app/lib/searchIndex.server";

const SAMPLE_INDEX: SearchIndexEntry[] = [
  {
    id: "services-business",
    title: "Business",
    description: "Business permits and licensing.",
    url: "/services/business",
    domain: "services",
    categoryTitle: "Business",
  },
  {
    id: "government-office-of-the-mayor",
    title: "Office of the Mayor",
    description: "Chief executive office.",
    url: "/government/office-of-the-mayor",
    domain: "government",
    categoryTitle: "Office of the Mayor",
  },
];

function renderSearch() {
  const router = createMemoryRouter([{ path: "/search", Component: Search }], {
    initialEntries: ["/search"],
  });
  render(
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>,
  );
}

describe("Search", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve(SAMPLE_INDEX),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows matching results as the user types", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.type(await screen.findByRole("searchbox"), "Business");

    expect(await screen.findByRole("link", { name: "Business" })).toHaveAttribute(
      "href",
      "/services/business",
    );
    expect(screen.queryByText("Office of the Mayor")).not.toBeInTheDocument();
  });

  it("shows a no-results message for an unmatched query", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.type(await screen.findByRole("searchbox"), "zzz-no-match");

    expect(await screen.findByText(/No results/i)).toBeInTheDocument();
  });
});
