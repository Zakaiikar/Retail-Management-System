import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: any;
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="bg-white border rounded-xl overflow-hidden
      transition-all duration-300
      hover:shadow-lg hover:-translate-y-1"
    >
      {/* IMAGE */}
      <div className="h-44 bg-gray-50">
        {product.image_url ? (
          <img
            src={product.image_url}
            className="w-full h-full object-cover"
            alt={product.name}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-gray-900 truncate">
          {product.name}
        </h3>

        {/* PRICE + ACTIONS */}
        <div className="flex items-center justify-between">
          <span className="text-purple-600 font-semibold">
            ${product.price}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-1.5 rounded-md hover:bg-gray-100 transition"
              title="Edit"
            >
              <PencilSquareIcon className="w-4 h-4 text-gray-700" />
            </button>

            <button
              onClick={() => onDelete(product.id)}
              className="p-1.5 rounded-md hover:bg-red-50 transition"
              title="Delete"
            >
              <TrashIcon className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Stock:{" "}
          <span className={product.stock === 0 ? "text-red-600" : ""}>
            {product.stock}
          </span>
        </div>
      </div>
    </div>
  );
}
