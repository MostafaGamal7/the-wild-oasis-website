import { useSearchParams } from "next/navigation";
import React from "react";

export default function Button({
  handleFilter,
  isActiveFilter,
  filterValue,
  children,
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <button
      onClick={() => handleFilter(filterValue)}
      className={`cursor-pointer px-5 py-2 hover:bg-primary-700 hover:text-primary-50 ${
        isActiveFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}
