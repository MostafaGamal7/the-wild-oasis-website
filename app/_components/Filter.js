"use client";
import React from "react";
import Button from "./Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterOptions = [
  { field: "All cabins", value: "all" },
  { field: "1\u20143 guests", value: "small" },
  { field: "4\u20147 guests", value: "medium" },
  { field: "8\u201412 guests", value: "large" },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <ul className="border-primary-700 border-1">
      {filterOptions.map((option) => (
        <Button
          key={option.field}
          handleFilter={handleFilter}
          filterValue={option.value}
          isActiveFilter={option.value === activeFilter}
        >
          {option.field}
        </Button>
      ))}
    </ul>
  );
}
