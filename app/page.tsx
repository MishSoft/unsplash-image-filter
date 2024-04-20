"use client";
import Image from "next/image";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import ImageArea from "./components/ImageArea";
import { ContextProvider } from "@/context/context";

export default function Home() {
  return (
    <ContextProvider>
      <Header />
      <TopBar />
      <ImageArea />
    </ContextProvider>
  );
}
