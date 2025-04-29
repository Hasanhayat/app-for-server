import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Home() {
  const [data,setData] = useState<{ message: string } | any>({})
  const [url,setUrl] = useState("https://express-js-server-one.vercel.app/api/data")
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        console.log(res.data); 
        setData(res.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, [])
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>{data?.message || "Loading..."}</h1>
        <h2>{data.text}</h2>
        
         
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <h4>{data.status}</h4>
      </footer>
    </div>
  );
}
