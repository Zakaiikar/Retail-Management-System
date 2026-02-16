import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ProductFilters({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStock,
  setInStock,
  limit,
  setLimit,
  onClear,
}: {
  search: string;
  setSearch: (v: string) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  inStock: boolean;
  setInStock: (v: boolean) => void;
  limit: number;
  setLimit: (v: number) => void;
  onClear: () => void;
}) {
  // ✅ START COLLAPSED
  const [open, setOpen] = useState(false);

  return (
    <div className="w-64 bg-white border rounded-xl h-fit">
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between
        px-4 py-3 font-semibold text-gray-900"
      >
        <span>Filters</span>
        {open ? (
          <ChevronDownIcon className="w-4 h-4" />
        ) : (
          <ChevronRightIcon className="w-4 h-4" />
        )}
      </button>

      {/* BODY */}
      {open && (
        <div className="px-4 pb-4 space-y-4 text-sm">

          {/* SEARCH */}
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* PRICE */}
          <div>
            <p className="font-medium mb-1">Price</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border rounded px-2 py-1"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border rounded px-2 py-1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* STOCK */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            In stock only
          </label>

          {/* LIMIT */}
          <div>
            <p className="font-medium mb-1">Show</p>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button
  onClick={onClear}
  className="w-full text-sm font-medium
  text-purple-600 border border-purple-600
  rounded-lg py-2 hover:bg-purple-50 transition"
>
  Clear filters
</button>

        </div>
      )}
    </div>
  );
}
