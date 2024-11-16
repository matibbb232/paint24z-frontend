"use client"
import Image from "next/image";
import { useState } from "react";
import localFont from "next/font/local";

const PAGES = [
  'Main Page',
  'On Sale',
  'Categories',
  'About Us',
  'Contact',
];

export default function Home() {
  return (
    <div>
      <h1 className="flex justify-center font-bold font-jaro text-7xl p-5 pb-7">Our Shop</h1>
      <ul className="container flex justify-between rounded-full px-5 py-3 md mx-auto bg-highlightRed">
        {
          PAGES.map((page, i) => (
            <li key={i} className="transition ease-in-out delay-50 
            container justify-items-center px-5 py-3 mx-5 rounded-full bg-white 
            text-black font-normal
            hover:bg-gray duration-300
            cursor-pointer"> {page} </li>))
        }
      </ul>
    </div>
  );
}
