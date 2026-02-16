export default function AuthLayout({
  left,
  right,
  center = true,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`w-full bg-gray-100 ${
        center
          ? "min-h-screen flex items-center justify-center"
          : "flex justify-center py-8"
      }`}
    >
      <div
        className="relative w-[70%] max-w-6xl min-h-[470px]
        rounded-3xl shadow-2xl overflow-hidden
        bg-gradient-to-br from-purple-600 to-indigo-700
        grid md:grid-cols-2"
      >
        {/* WHITE WAVE TOP */}
        <div className="absolute top-0 left-0 w-full h-40 bg-white rounded-b-[100%] z-0" />

        {/* WHITE WAVE BOTTOM */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-white rounded-t-[100%] z-0" />

        {/* LEFT */}
        <div className="relative z-10 flex items-center justify-center px-10">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8">
            {left}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative z-10 hidden md:flex items-center justify-center px-14 text-white">
          <div className="max-w-sm text-center">{right}</div>
        </div>
      </div>
    </div>
  );
}
