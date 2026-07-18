import { Link } from "react-router";

export interface ErrorPageProps {
  code: string;
  title: string;
  message: string;
}

export function ErrorPage({ code, title, message }: ErrorPageProps) {
  return (
    <section>
      <h1>
        {code} — {title}
      </h1>
      <p>{message}</p>
      <p>
        <Link to="/">Return to homepage</Link>
      </p>
    </section>
  );
}
