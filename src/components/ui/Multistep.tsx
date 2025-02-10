import {
    useState,
    useEffect,
    useCallback,
    useRef,
    KeyboardEvent,
    useId,
  } from "react";
  import { FiAlertCircle } from "react-icons/fi";
import { ImSpinner6 } from "react-icons/im";
import { MdClose } from "react-icons/md";
  
  
export interface SuggestionItem {
    id: string | number;
    name: string;
    skills?:  string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow additional properties
}
  
interface Pill extends SuggestionItem {
  id: string;
  name: string;
  skills?:  string[];
  className?: string;
  onClick?:(id: string | number)=>void;
}
  
  interface MultiSelectProps {
    placeholder?: string;
    debounceTime?: number;
    maxItems?: number;
    loading?: boolean;
    error?: string | null;
    className?: string;
    pillClassName?: string;
    suggestionClassName?: string;
    inputClassName?: string;
    iconClassName?: string;
    noSuggestionsText?: string;
    ariaLabel?: string;
    skill?:  string[];
    data?: any;
    apiUrl?: string;
  }
  
  const Multistep = ({
    placeholder = "Type to search...",
    debounceTime = 300,
    maxItems,
    loading = false,
    error = null,
    className = "",
    pillClassName = "",
    suggestionClassName = "",
    inputClassName = "",
    iconClassName = "text-gray-500",
    noSuggestionsText = "No suggestions found",
    ariaLabel = "Multi-select input",
    skill,
    data,
    apiUrl = "",
  }: MultiSelectProps) => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
    const [selectedItem,setSelectedItem] = useState<Pill[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [hasAlreadyItem, setHasAlreadyItem] = useState(new Set());
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();
    console.log(data)
  
    // Fetch suggestions
    const fetchUsers = async ()=>{
      if (inputValue.trim() === "") {
        setSuggestions([]);
        return;
      }
      if (data) {
        setSuggestions(
          data.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      } else if (apiUrl) {
        try {
          const response = await fetch(`${apiUrl}?q=${inputValue}`);
          const result = await response.json();
          setSuggestions(result?.users || []);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
        }
      }
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
    },[inputValue,debounceTime]);
  
    // Handle custom item creation
  
    // Add item handler
    const addItem = useCallback((item:SuggestionItem)=>{
      setSelectedItem((prev)=> [...prev, item as Pill]);
      //set unique thing of item in our set;
      setHasAlreadyItem(new Set([...hasAlreadyItem, item.id]));
      setInputValue("");
      setSuggestions([]);
      inputRef.current?.focus();
    },[hasAlreadyItem]);
  
    // Remove item handler
    const removeItem = useCallback((item:SuggestionItem) => {
      const updatedItem = selectedItem.filter((i)=>{
        return i?.id!== item.id;
      });

      //delete that unique thing of item;
      const updatedHasAlreadyItem = new Set(hasAlreadyItem);
      updatedHasAlreadyItem.delete(item.id);

      setHasAlreadyItem(updatedHasAlreadyItem);
      setSelectedItem(updatedItem);
    },[selectedItem, hasAlreadyItem]);
  
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Backspace" && (e.target as HTMLInputElement).value === "" && selectedItem.length>0){
        const lastItem = selectedItem[selectedItem.length - 1];
        removeItem(lastItem);
        setInputValue("");
        setSuggestions([]);
        return;
      }

      if(e.key === "ArrowDown"){
        setHighlightedIndex((prev) => 
          Math.min(prev + 1, suggestions.length - 1)
        );
        e.preventDefault();
      };

      if(e.key === "ArrowUp"){
        setHighlightedIndex((prev) => 
          Math.max(prev - 1, 0)
        );
        e.preventDefault();
      };

      if(e.key === "Enter" && highlightedIndex >= 0){
        const getItem = suggestions[highlightedIndex];
        if(getItem){
          addItem(getItem);
          setInputValue("");
          setSuggestions([]);
        }
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
        className={`relative w-full max-w-lg ${className}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={suggestions?.length > 0}
        aria-owns={listboxId}
      >
        <div
          className={`
            flex flex-wrap gap-2 p-2  bg-slate-600/30 border rounded-md
            focus-within:ring-1 focus-within:ring-blue-500
            ${selectedItem?.length > 0 ? "pr-10" : ""}
            ${error ? "border-red-500 ring-1 ring-red-500" : "border-gray-400"}
          `}
        >
          {/* Selected Pills */}
          {selectedItem?.map(pill=>(
            <Pill {...pill} className={pillClassName} onClick={()=>removeItem(pill)}/>
          ))}
  
          {/* Input */}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedItem?.length === 0 ? placeholder : "add items..."}
            className={`
              flex-1 min-w-[120px] bg-transparent outline-none
              placeholder-gray-400 text-sm p-1 ${inputClassName}
            `}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-label={ariaLabel}
            disabled={maxItems ? selectedItem?.length >= maxItems : false}
          />
  
          {/* Status Icons */}
          {loading && (
            <div className="absolute right-3 top-3 animate-spin">
              <ImSpinner6 size={22} fill="black" className=" dark:text-white"/>
            </div>
          )}
          {error && (
            <FiAlertCircle
              className={`absolute right-3 top-3 text-red-500 w-5 h-5 ${iconClassName}`}
            />
          )}
        </div>
  
        {/* Suggestions List */}
        {suggestions?.length > 0 || loading || error ? (
          <ul
            id={listboxId}
            role="listbox"
            className={`
              absolute w-full mt-1 max-h-60 overflow-auto bg-slate-800/50
              rounded-lg shadow-lg z-10 border border-gray-400 no-scrollbar
              ${suggestionClassName}
            `}
          >
            {loading ? (
              <li className="p-4 text-gray-300 text-lg text-center animate-pulse">Loading...</li>
            ) : error ? (
              <li className="p-4 text-red-500 text-center">{error}</li>
            ) : suggestions?.length === 0 ? (
              <li className="p-4 text-gray-500 text-center">
                {noSuggestionsText}
              </li>
            ) : (
              suggestions?.map((item, index) => {
                const isHighlighted = index === highlightedIndex; 
                return !hasAlreadyItem.has(item.id) ? (
                  <li
                  key={item?.id || index}
                  role="option"
                  className={`
                    flex items-center gap-3 p-2 cursor-pointer border-gray-400 border-thin border-b
                    ${isHighlighted ? "bg-slate-700 text-white" : "hover:bg-slate-500/20"}
                  `}
                  onClick={() => addItem(item)}
                >
                   <div className=" flex items-center gap-3">
                      <span className=" w-10 h-10 rounded-full">
                        <img 
                          src={item?.image} 
                          alt={item?.firstName} 
                          loading="lazy"
                          className=" w-full h-full object-cover"
                        />
                      </span>
                      <strong className=" text-neutral-50">{item?.id}</strong>
                      <span className=" text-md font-mono text-neutral-50">   
                        {item?.firstName}-{item?.lastName}
                      </span>
                    </div>
                </li>
                ) : <></>
              })
            )}
          </ul>
        ) : null}
      </div>
    );
  };
  




//?Pill component;
export const Pill = ({
  id,
  name,
  onClick,
  className,
}:Pill) => {
  const baseClass = ` w-fit flex items-center px-2.5 py-1.5 border rounded-full gap-1`;
  return (
    <div className={`${baseClass} ${className}`}>
        <h6 className=" text-sm line-clamp-1">{name}</h6>
        {onClick && <button onClick={()=>onClick(id)} className="ml-1 text-gray-400 hover:text-gray-500">
          <MdClose  className=" cursor-pointer text-red-500"/>
        </button>}
    </div>
  )
}

export default Multistep;