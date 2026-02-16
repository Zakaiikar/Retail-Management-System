import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProductForm({ onSubmit }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    let imageUrl = "";

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, image);

      if (error) {
        alert("Image upload failed");
        return;
      }

      imageUrl = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName).data.publicUrl;
    }

    await onSubmit({
      name,
      price: Number(price),
      stock: Number(stock),
      image_url: imageUrl,
    });

    setName("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Add Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          className="border rounded-lg p-3"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="border rounded-lg p-3"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          className="border rounded-lg p-3"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="border rounded-lg p-3"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg"
      >
        Save Product
      </button>
    </div>
  );
}
