import { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import cn from "classnames";
import { toFixNumber } from "@/services/general";

import { fetchSearch, fetchSearchQuery } from "@/services/fetchApi";
import useToastContext from "@/hooks/useToasts";
import { CurrencyApiType } from "@/types";
import { useCryptoContext } from "@/contexts/CryptoContext";
import { radomStr } from "@/services/general";
import styles from "@/styles/Main.module.scss";
import { useOutside } from "@/hooks/useOutside";

const Search: React.FC = () => {
  const { state, dispatch } = useCryptoContext();
  const [isActive, setActive] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [queryActice, setQueryActice] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [cursor, setCursor] = useState<number>(-1);
  const addToast = useToastContext();
  const wrapperRef = useRef<HTMLInputElement | null>(null);
  const [results, setResults] = useState<CurrencyApiType[] | []>([]);

  const handleFocus = () => setActive(true);
  const handleClickInside = (item: CurrencyApiType) => (e: React.MouseEvent<HTMLElement>) => {
    setQueryActice(true);
    setActive(false);
    handleSubmit(item);
  };
  const handleQuery = () => {
    if (!queryActice && results?.length) {
      setQuery(results[cursor].name.toLowerCase());
    }
    setQueryActice(true);
    setCursor(-1);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleQuery();
    setQuery(event.target.value);
  };

  const handleMouseEnter = (item: number) => {
    setQueryActice(true);
    setCursor(item);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && cursor > 0) {
      setQueryActice(false);
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    } else if (e.key === "ArrowDown" && cursor < results?.length - 1) {
      setQueryActice(false);
      setCursor((prevState) => (prevState < results?.length - 1 ? prevState + 1 : prevState));
    } else if (e.key === "Backspace") {
      handleQuery();
    } else if (e.key === "Enter") {
      if (cursor !== -1) {
        handleSubmit(results[cursor]);
        handleQuery();
      }
    }
  };

  const handleSubmit = (item: CurrencyApiType) => {
    const { symbol, name, id, priceUsd }: CurrencyApiType = item;

    if (state.crypto.length === 3) {
      addToast("Currency maximal 3");
      return;
    }
    const _id = radomStr();
    async function fetchAPI() {
      const resultsQuery = await fetchSearchQuery({ query: symbol });
      if (!resultsQuery.error) {
        dispatch!({
          type: "ADD",
          value: {
            _id,
            id,
            symbol,
            name,
            priceUsd: Number(priceUsd),
            time: "1",
          },
        });
        setQuery("");
        return;
      }
      addToast(resultsQuery.error);
    }
    fetchAPI();
  };

  useOutside({ ref: wrapperRef, status: setActive });
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      async function fetchAPISearch() {
        const result = await fetchSearch({ query });
        setResults(result);
      }
      fetchAPISearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const { srch, srch_result } = styles;

  return (
    <div className="px-2">
      <div ref={wrapperRef} className="w-full">
        <div className={cn(srch, "flex items-center space-x-2 px-3 py-1 sm:py-1 md:py-2 lg:py-2")}>
          <FaSearch color="gray" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search..."
            className="bg-transparent w-full focus:outline-none m-2"
            onChange={handleChange}
            onKeyDown={handleKey}
            onFocus={handleFocus}
            value={queryActice ? query : results[cursor].name.toLowerCase()}
          />
        </div>
        {isActive && results && results.length > 0 && (
          <div className="relative w-full">
            <ul className={cn(srch_result, "absolute z-10")}>
              {results.map((item, i) => (
                <li
                  key={item.id}
                  className={`px-4 py-2 leading-5 text-left cursor-pointer ${
                    i === cursor ? "bg-[color:var(--color-primary-dark)]" : ""
                  } `}
                  onClick={handleClickInside(item)}
                  onMouseEnter={() => handleMouseEnter(i)}
                >
                  <div className="search-result-click flex items-center justify-between text-sm">
                    <div>
                      {item.name} <span className="text-gray-400">{item.symbol}</span>
                    </div>
                    <span className={item.changePercent24Hr > 0 ? "text-green-500" : "text-red-500"}>
                      {toFixNumber(item.changePercent24Hr)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
