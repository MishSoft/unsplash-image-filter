import React, { useEffect, useRef, useState } from "react";
import fuzzysort from "fuzzysort";

interface ContextProps {
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageDatas: {
    urls: { small: string };
    alt_description: string;
    id: string;
  }[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSearch: (e: any) => void;
  isShowTypes: boolean;
  saveWords: { word: string; time: string }[]; // Updated type
  handleRemoveSaveWords: (word: string) => void;
}

const Context = React.createContext<ContextProps>({
  handleInputValue: () => {},
  imageDatas: [],
  query: "",
  loading: false,
  handleSearch: () => {},
  setQuery: () => {},
  isShowTypes: false,
  saveWords: [],
  handleRemoveSaveWords: () => {},
});

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [imageDatas, setImageDatas] = useState<ContextProps["imageDatas"]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  const [isShowTypes, setIsShowTypes] = useState<boolean>(false);
  const [saveWords, setSaveWords] = useState<ContextProps["saveWords"]>([]); // Updated type

  const key = "muv_4qsWtM73C9IajHzMwCs-QWn_8UYXQ9ihBmjxm3U";

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (query === "") {
      setPage(0);
      setImageDatas([]);
      setLoading(false);
    } else {
      setPage(1);
      setImageDatas([]);
      setLoading(true);
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setSaveWords([...saveWords, { word: query, time }]); // Use saveWords directly
      const saveWordsString = JSON.stringify([
        ...saveWords,
        { word: query, time },
      ]);
      localStorage.setItem("saveWords", saveWordsString);
    }
    setIsShowTypes(false);
  };

  const handleRemoveSaveWords = (word: string) => {
    const updatedWords = saveWords.filter((w) => w.word !== word);
    setSaveWords(updatedWords);
    localStorage.setItem("saveWords", JSON.stringify(updatedWords));
  };

  useEffect(() => {
    let observerInstance: IntersectionObserver | null = null;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (typeof document !== "undefined") {
      observerInstance = new IntersectionObserver(handleIntersection);
      if (observerInstance && imageDatas.length > 0) {
        observerInstance.observe(
          document.querySelector("#observer") as Element
        );
      }
    }

    return () => {
      if (observerInstance) {
        observerInstance.disconnect();
      }
    };
  }, [imageDatas, loading, page, totalPages]);

  useEffect(() => {
    if (!loading || page > totalPages) return;

    const api = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${key}`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setImageDatas((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [query, page, loading, totalPages]);

  useEffect(() => {
    const savedWords = localStorage.getItem("saveWords");
    if (savedWords) {
      setSaveWords((prevWords) => [...prevWords, ...JSON.parse(savedWords)]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("saveWords", JSON.stringify(saveWords));
  }, [saveWords]);

  console.log(saveWords);

  return (
    <Context.Provider
      value={{
        handleInputValue,
        imageDatas,
        query,
        loading,
        handleSearch,
        setQuery,
        isShowTypes,
        saveWords,
        handleRemoveSaveWords,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
