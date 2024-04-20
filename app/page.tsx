"use client";
import Image from "next/image";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import ImageArea from "./components/ImageArea";
import { ContextProvider } from "@/context/context";
import History from "./components/History";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <TopBar />
        <Routes>
          <Route path="/" element={<ImageArea />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
