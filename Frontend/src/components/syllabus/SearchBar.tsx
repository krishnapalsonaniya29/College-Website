import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search by subject name or subject code...",
}: SearchBarProps) => {
  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Search Icon */}
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-4
          pl-14
          pr-5
          text-gray-700
          placeholder:text-gray-400
          shadow-sm
          transition
          duration-300
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
          focus:outline-none
        "
      />
    </div>
  );
};

export default SearchBar;