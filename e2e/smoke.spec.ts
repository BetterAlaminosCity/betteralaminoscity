import { expect, test } from "@playwright/test";

test("homepage loads with the site title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/BetterAlaminosCity\.org/);
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
});

test("nav links navigate to Services and Government", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { name: "Services" })).toBeVisible();

  await page.getByRole("link", { name: "Government" }).click();
  await expect(page).toHaveURL(/\/government$/);
  await expect(page.getByRole("heading", { name: "Government" })).toBeVisible();
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
