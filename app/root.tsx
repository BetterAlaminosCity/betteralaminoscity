import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./fonts.css";
import { ErrorPage } from "./components/ui/ErrorPage";
import { I18nProvider } from "./i18n/I18nProvider";
import { SiteLayout } from "./components/layout/SiteLayout";
import { getHotlines } from "./lib/content.server";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function loader() {
  return { hotlines: getHotlines() };
}

export default function App() {
  const { hotlines } = useLoaderData<typeof loader>();

  return (
    <I18nProvider>
      <SiteLayout hotlines={hotlines}>
        <Outlet />
      </SiteLayout>
    </I18nProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorPage
          code="404"
          title="Page Not Found"
          message="The page you're looking for doesn't exist or may have been moved."
        />
      );
    }
    if (error.status === 403) {
      return (
        <ErrorPage
          code="403"
          title="Forbidden"
          message="You don't have permission to view this page."
        />
      );
    }
    return (
      <ErrorPage
        code={String(error.status)}
        title="Error"
        message={error.statusText || "An unexpected error occurred."}
      />
    );
  }

  const details =
    import.meta.env.DEV && error instanceof Error ? error.message : "An unexpected error occurred.";
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <>
      <ErrorPage code="500" title="Something Went Wrong" message={details} />
      {stack && (
        <pre style={{ overflowX: "auto", padding: "0 2rem" }}>
          <code>{stack}</code>
        </pre>
      )}
    </>
  );
}
