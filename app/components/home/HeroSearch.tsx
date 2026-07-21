import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Search as SearchIcon } from "lucide-react";

import { useSearchIndex } from "../../lib/useSearchIndex";
import type { CategorySummary } from "../../lib/content.server";

const MAX_RESULTS = 5;
const MAX_POPULAR_CHIPS = 3;

export interface HeroSearchProps {
  popularCategories: CategorySummary[];
}

export function HeroSearch({ popularCategories }: HeroSearchProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useSearchIndex();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const results = trimmedQuery ? search(query).slice(0, MAX_RESULTS) : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!trimmedQuery) return;
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <div
      ref={containerRef}
      className="relative min-w-0 rounded-2xl bg-[var(--color-kapwa-bg-surface)] p-6 shadow-xl"
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-kapwa-text-strong)]">
        <SearchIcon className="h-5 w-5 text-[var(--color-kapwa-text-brand)]" aria-hidden="true" />
        {t("home.hero.searchHeading")}
      </h2>
      <div className="relative mt-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="search"
            aria-label={t("search.inputLabel")}
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsOpen(false);
              }
            }}
            className="w-full rounded-md border border-[var(--color-kapwa-border-weak)] px-4 py-3 text-base text-[var(--color-kapwa-text-strong)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-kapwa-border-focus)]"
          />
          <button
            type="submit"
            aria-label={t("home.hero.searchSubmit")}
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-[var(--color-kapwa-bg-brand-default)] px-4 text-[var(--color-kapwa-text-inverse)] transition-colors hover:bg-[var(--color-kapwa-bg-brand-hover)]"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>

        {isOpen && trimmedQuery && results.length > 0 ? (
          <ul className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-md border border-[var(--color-kapwa-border-weak)] bg-[var(--color-kapwa-bg-surface)] shadow-lg">
            {results.map((result) => (
              <li key={result.id}>
                <Link
                  to={result.url}
                  className="block px-4 py-2 text-sm text-[var(--color-kapwa-text-strong)] hover:bg-[var(--color-kapwa-bg-gray-hover)]"
                  onClick={() => setIsOpen(false)}
                >
                  {result.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {popularCategories.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[var(--color-kapwa-text-support)]">
            {t("home.hero.popularLabel")}
          </span>
          {popularCategories.slice(0, MAX_POPULAR_CHIPS).map((category) => (
            <Link
              key={category.slug}
              to={`/services/${category.slug}`}
              className="rounded-full border border-[var(--color-kapwa-border-weak)] px-3 py-1 text-xs font-medium text-[var(--color-kapwa-text-support)] hover:border-[var(--color-kapwa-border-brand)] hover:text-[var(--color-kapwa-text-brand)]"
            >
              {category.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
