import {
    useState,
    useEffect,
    useCallback,
    useRef,
    KeyboardEvent,
    useId,
  } from "react";
  import { FiAlertCircle } from "react-icons/fi";
  
  
  export interface SuggestionItem {
    id: string | number;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow additional properties
  }
  
  interface PillType extends SuggestionItem {
    custom?: boolean; // To distinguish between API items and custom items
  }
  
  interface MultiSelectProps {
    selected?: PillType[];
    onSelectedChange?: (items: PillType[]) => void;
    fetchSuggestions?: (query: string) => Promise<SuggestionItem[]>;
    renderPill?: (item: PillType) => React.ReactNode;
    renderSuggestion?: (item: SuggestionItem) => React.ReactNode;
    placeholder?: string;
    debounceTime?: number;
    maxItems?: number;
    allowCustom?: boolean;
    loading?: boolean;
    error?: string | null;
    className?: string;
    pillClassName?: string;
    suggestionClassName?: string;
    inputClassName?: string;
    iconClassName?: string;
    noSuggestionsText?: string;
    ariaLabel?: string;
  }
  
  const Multistep = ({
    selected = [],
    onSelectedChange,
    fetchSuggestions,
    renderPill,
    renderSuggestion,
    placeholder = "Type to search...",
    debounceTime = 300,
    maxItems,
    allowCustom = true,
    loading = false,
    error = null,
    className = "",
    pillClassName = "",
    suggestionClassName = "",
    inputClassName = "",
    iconClassName = "text-gray-500",
    noSuggestionsText = "No suggestions found",
    ariaLabel = "Multi-select input",
  }: MultiSelectProps) => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();
  
    // Fetch suggestions

    const fetchUsers = async ()=>{
        if(inputValue.trim() === ""){
            setSuggestions([]);
            return;
        }

        fetch(`https://dummyjson.com/users/search?q=${inputValue}`)
        .then(res => res.json())
        .then((data)=> setSuggestions(data?.users))
        .catch(err=> console.error(err));
    };
    useEffect(()=>{
        const debounce = setTimeout(()=>{
            if(inputValue.trim()){
                fetchUsers();
            } else{
                setSuggestions([]);
            }

            return ()=>clearTimeout(debounce);
        },debounceTime)
    },[inputValue])
  
    // Handle custom item creation
  
    // Add item handler
    const addItem = useCallback(()=>{},[]);
  
    // Remove item handler
    const removeItem = useCallback(() => {},[]);
  
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          if (highlightedIndex >= 0 && suggestions.length > 0) {
            addItem(suggestions[highlightedIndex]);
            setInputValue("");
          } else if (inputValue.trim() && allowCustom) {
            addItem(inputValue.trim());
            setInputValue("");
          }
          break;
  
        case "Backspace":
          if (!inputValue && selected.length > 0) {
            removeItem(selected[selected.length - 1].id);
          }
          break;
  
        case "ArrowUp":
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
  
        case "ArrowDown":
          setHighlightedIndex((prev) =>
            Math.min(prev + 1, suggestions.length - 1)
          );
          break;
  
        case "Escape":
          setInputValue("");
          setSuggestions([]);
          break;
      }
    };
  
    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setInputValue("");
          setSuggestions([]);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    return (
      <div
        ref={containerRef}
        className={`relative w-full max-w-2xl ${className}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={suggestions.length > 0}
        aria-owns={listboxId}
      >
        <div
          className={`
            flex flex-wrap gap-2 p-2 bg-white border rounded-lg
            focus-within:ring-2 focus-within:ring-blue-500
            ${selected.length > 0 ? "pr-10" : ""}
            ${error ? "border-red-500 ring-2 ring-red-500" : "border-gray-300"}
          `}
        >
          {/* Selected Pills */}
  
          {/* Input */}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selected.length === 0 ? placeholder : "add items..."}
            className={`
              flex-1 min-w-[100px] bg-transparent outline-none
              placeholder-gray-400 text-sm ${inputClassName}
            `}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-label={ariaLabel}
            disabled={maxItems ? selected.length >= maxItems : false}
          />
  
          {/* Status Icons */}
          {loading && (
            <div className="absolute right-3 top-3 animate-spin">⏳</div>
          )}
          {error && (
            <FiAlertCircle
              className={`absolute right-3 top-3 text-red-500 w-5 h-5 ${iconClassName}`}
            />
          )}
        </div>
  
        {/* Suggestions List */}
        {suggestions.length > 0 || loading || error ? (
          <ul
            id={listboxId}
            role="listbox"
            className={`
              absolute w-full mt-1 max-h-60 overflow-auto bg-slate-950
              rounded-lg shadow-lg z-10 border border-gray-400 no-scrollbar
              ${suggestionClassName}
            `}
          >
            {loading ? (
              <li className="p-4 text-gray-500 text-center">Loading...</li>
            ) : error ? (
              <li className="p-4 text-red-500 text-center">{error}</li>
            ) : suggestions.length === 0 ? (
              <li className="p-4 text-gray-500 text-center">
                {noSuggestionsText}
              </li>
            ) : (
              suggestions.map((item, index) => (
                <li
                  key={item.id || index}
                  role="option"
                  className={`
                    flex items-center gap-3 p-3 cursor-pointer border-b
                  `}
                  onClick={() => {}}
                >
                  {item.name}
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>
    );
  };
  
  export default Multistep;