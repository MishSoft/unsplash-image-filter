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
  relatedWords: string[];
  isShowTypes: boolean;
  saveWords: string[];
}
const Context = React.createContext<ContextProps>({
  handleInputValue: () => {},
  imageDatas: [],
  query: "",
  loading: false,
  handleSearch: () => {},
  setQuery: () => {},
  relatedWords: [],
  isShowTypes: false,
  saveWords: [],
});

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [imageDatas, setImageDatas] = useState<ContextProps["imageDatas"]>([]);

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);
  const [relatedWords, setRelatedWords] = useState<string[]>([]);
  const [isShowTypes, setIsShowTypes] = useState<boolean>(false);
  const [saveWords, setSaveWords] = useState<string[]>([]);

  const key = "muv_4qsWtM73C9IajHzMwCs-QWn_8UYXQ9ihBmjxm3U";

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    const allWords = imageDatas.flatMap((image) =>
      image.alt_description.split(" ")
    );
    // Filter the words based on the query
    const filteredWords = fuzzysort
      .go(inputValue, allWords)
      .map((result) => result.target);
    // Set the filtered words as relatedWords
    setRelatedWords(filteredWords);
    setIsShowTypes(true);
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
      setSaveWords((prevWords) => [...prevWords, query]);
    }
    setIsShowTypes(false);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (observer.current && imageDatas.length > 0) {
      observer.current.observe(document.querySelector("#observer") as Element);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [imageDatas]);

  useEffect(() => {
    if (!loading) return;

    const api = `https://api.unsplash.com/search/photos?page=${
      page ? query : "office"
    }&query=${query}&client_id=${key}`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setImageDatas((prevImages) => [...prevImages, ...data.results]);
        // Extract and set related words from image names
        const words: string[] = [];
        data.results.forEach((image: any) => {
          const altWords = image.alt_description.split(" ");
          altWords.forEach((word: string) => {
            if (!words.includes(word)) {
              words.push(word);
            }
          });
        });
        setRelatedWords(words);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [query, page, loading]);

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
        relatedWords,
        isShowTypes,
        saveWords,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
function setRelatedImages(filteredImages: any) {
  throw new Error("Function not implemented.");
}
