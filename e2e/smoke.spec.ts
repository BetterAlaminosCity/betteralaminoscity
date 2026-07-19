import { expect, test } from "@playwright/test";

test("homepage loads with the site title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/BetterAlaminosCity\.org/);
  const mainNav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(mainNav.getByRole("link", { name: "Home" })).toBeVisible();
});

test("nav links navigate to Services and Government", async ({ page }) => {
  await page.goto("/");
  const mainNav = page.getByRole("navigation", { name: "Main navigation" });

  await mainNav.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "City Services Directory" }),
  ).toBeVisible();

  await mainNav.getByRole("link", { name: "Government" }).click();
  await expect(page).toHaveURL(/\/government$/);
  await expect(page.getByRole("heading", { level: 1, name: "Government Directory" })).toBeVisible();
});

test("a service page renders its content", async ({ page }) => {
  await page.goto("/services/business");
  await expect(page.getByRole("heading", { name: "Business" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Overview" })).toBeVisible();
});

test("search returns results for a known term", async ({ page }) => {
  await page.goto("/search");
  await page.getByRole("searchbox").fill("Business");
  await expect(page.getByRole("link", { name: "Business" })).toBeVisible();
});

test("sitemap.xml and robots.txt are served", async ({ request }) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain("<urlset");

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain("Sitemap:");
});
