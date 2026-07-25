import React from "react";
import styles from "./Pagination.module.css";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  previousLabel?: string;
  nextLabel?: string;
}

type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

const createItems = (
  page: number,
  totalPages: number,
  siblingCount: number
): PaginationItem[] => {
  if (totalPages <= 1) {
    return [1];
  }

  const pages = new Set<number>([1, totalPages]);
  for (
    let current = Math.max(2, page - siblingCount);
    current <= Math.min(totalPages - 1, page + siblingCount);
    current += 1
  ) {
    pages.add(current);
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);
  const items: PaginationItem[] = [];

  sortedPages.forEach((current, index) => {
    const previous = sortedPages[index - 1];
    if (previous && current - previous > 1) {
      items.push(index === 1 ? "ellipsis-start" : "ellipsis-end");
    }
    items.push(current);
  });

  return items;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  previousLabel = "Previous page",
  nextLabel = "Next page",
  className = "",
  ...props
}) => {
  const safeTotal = Math.max(1, totalPages);
  const safePage = Math.min(safeTotal, Math.max(1, page));
  const items = createItems(safePage, safeTotal, siblingCount);
  const classNames = [styles.pagination, className]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      className={classNames}
      aria-label="Pagination"
      {...props}
    >
      <button
        type="button"
        className={styles.navigation}
        disabled={safePage === 1}
        aria-label={previousLabel}
        onClick={() => onPageChange(safePage - 1)}
      >
        ‹
      </button>
      {items.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            className={styles.page}
            aria-label={`Page ${item}`}
            aria-current={item === safePage ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ) : (
          <span key={item} className={styles.ellipsis} aria-hidden="true">
            …
          </span>
        )
      )}
      <button
        type="button"
        className={styles.navigation}
        disabled={safePage === safeTotal}
        aria-label={nextLabel}
        onClick={() => onPageChange(safePage + 1)}
      >
        ›
      </button>
    </nav>
  );
};

Pagination.displayName = "Pagination";
