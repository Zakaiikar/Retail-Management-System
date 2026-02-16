import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { createProduct, updateProduct } from "../../lib/products";

export default function AddProductModal({
  product,
  onClose,
  onSaved,
}: {
  product?: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // 🔒 LOCK BODY SCROLL WHEN MODAL OPENS
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // PREFILL ON EDIT
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setImageUrl(product.image_url || "");
    }
  }, [product]);

  const save = async () => {
    let finalImageUrl = imageUrl;

    if (image) {
      const path = `products/${Date.now()}-${image.name}`;

      await supabase.storage
        .from("product-images")
        .upload(path, image);

      finalImageUrl = supabase.storage
        .from("product-images")
        .getPublicUrl(path).data.publicUrl;
    }

    if (product) {
      await updateProduct(product.id, {
        name,
        price: Number(price),
        stock: Number(stock),
        image_url: finalImageUrl,
      });
    } else {
      await createProduct({
        name,
        price: Number(price),
        stock: Number(stock),
        image_url: finalImageUrl,
      });
    }

    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40
    flex items-center justify-center">

      {/* MODAL CARD */}
      <div
        className="bg-white rounded-2xl w-full max-w-lg
        max-h-[90vh] overflow-y-auto p-6"
      >
        <h2 className="text-lg font-semibold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-4">
          <input
            className="border p-3 w-full rounded-lg"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="border p-3 w-full rounded-lg"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            className="border p-3 w-full rounded-lg"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          {imageUrl && (
            <img
              src={imageUrl}
              className="h-28 w-full object-cover rounded-lg"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            {product ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
