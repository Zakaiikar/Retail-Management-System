import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout";
import { getProducts, deleteProduct } from "../../lib/products";
import ProductGrid from "../../components/products/ProductGrid";
import AddProductModal from "../../components/products/AddProductModal";
import ProductFilters from "../../components/products/ProductFilters";
import ToastContainer from "../../components/ui/ToastContainer";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // FILTER STATE
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [limit, setLimit] = useState(10);

  // TOAST
  const [toast, setToast] = useState<any>(null);

  const showToast = (type: any, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2500);
  };

  const clearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(false);
    setLimit(10);
  };

  const load = async () => {
    setProducts(await getProducts());
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products
    .filter((p) => {
      const price = Number(p.price);
      const stock = Number(p.stock);

      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;
      if (inStock && stock <= 0) return false;

      return true;
    })
    .slice(0, limit);

  return (
    <AppLayout role="admin" title="Products">
      {/* 🔒 IMPORTANT: items-start */}
      <div className="flex gap-6 items-start">

        {/* 🔒 STICKY FILTER */}
        <div className="sticky top-6 shrink-0">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            inStock={inStock}
            setInStock={setInStock}
            limit={limit}
            setLimit={setLimit}
            onClear={clearFilters}
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Products</h2>

            <button
              onClick={() => setOpen(true)}
              className="bg-purple-600 text-white
              px-5 py-2 rounded-lg"
            >
              + Add Product
            </button>
          </div>

          <ProductGrid
            products={filtered}
            onEdit={setEditing}
            onDelete={async (id) => {
              if (!confirm("Delete product?")) return;
              await deleteProduct(id);
              load();
              showToast("delete", "Product deleted");
            }}
          />
        </div>
      </div>

      {open && (
        <AddProductModal
          onClose={() => setOpen(false)}
          onSaved={() => {
            setOpen(false);
            load();
            showToast("add", "Product added");
          }}
        />
      )}

      {editing && (
        <AddProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
            showToast("update", "Product updated");
          }}
        />
      )}

      <ToastContainer toast={toast} />
    </AppLayout>
  );
}
