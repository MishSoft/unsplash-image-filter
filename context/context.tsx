import React, { useEffect, useRef, useState } from "react";

interface ContextProps {
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageDatas: { urls: { small: string }; id: string }[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSearch: (e: any) => void;
}
const Context = React.createContext<ContextProps>({
  handleInputValue: () => {},
  imageDatas: [],
  query: "",
  loading: false,
  handleSearch: () => {},
  setQuery: () => {},
});

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [imageDatas, setImageDatas] = useState<ContextProps["imageDatas"]>([]);

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  const key = "muv_4qsWtM73C9IajHzMwCs-QWn_8UYXQ9ihBmjxm3U";

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
    setImageDatas([]);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setPage(1);
    setImageDatas([]);
    setLoading(true); // Start loading immediately
    console.log(imageDatas);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [query, page, loading]);
  return (
    <Context.Provider
      value={{
        handleInputValue,
        imageDatas,
        query,
        loading,
        handleSearch,
        setQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
