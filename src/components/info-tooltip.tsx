import { Info } from "lucide-react";

export default function InfoWithTooltip() {
  return (
    <div className="relative flex items-center group">
    <Info className="text-gray-500 cursor-pointer" />

      <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow opacity-0 pointer-events-none group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">
        This is a helpful tooltip.
      </div>
    </div>
  );
}