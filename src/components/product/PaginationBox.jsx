"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { getPaginationRange } from "@/utils/paginationRange";
import { useSearchParams } from "next/navigation";

const PaginationBox = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || 1);

  // Get Pagination Range
  const paginationRange = getPaginationRange({ currentPage, totalPages });

  // JSX from Shadcn ui
  return (
    <div className="my-5">
      <Pagination>
        <PaginationContent>
          {/* Previous Button  */}
          <PaginationItem>
            <Link href={`?page=${Math.max(1, currentPage - 1)}`}>
              <PaginationPrevious
                className={` ${
                  currentPage == 1
                    ? "cursor-not-allowed text-dark/50"
                    : "hover:bg-retro"
                }`}
              />
            </Link>
          </PaginationItem>

          {/* Range buttons  */}
          {paginationRange?.map((num) => (
            <PaginationItem key={num}>
              <Link href={`?page=${num}`}>
                <PaginationLink
                  className={`${
                    currentPage == num && "bg-retro"
                  } hover:bg-retro`}
                >
                  {num}
                </PaginationLink>
              </Link>
            </PaginationItem>
          ))}

          {/* Ellipsis */}
          {totalPages > 7 && currentPage < totalPages - 3 && (
            <PaginationItem disabled>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next Button  */}
          <PaginationItem>
            <Link href={`?page=${Math.min(totalPages, currentPage + 1)}`}>
              <PaginationNext
                className={`${
                  totalPages === currentPage
                    ? "cursor-not-allowed text-dark/50"
                    : "hover:bg-retro"
                }`}
              />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationBox;
