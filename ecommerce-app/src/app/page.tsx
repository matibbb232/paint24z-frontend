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

const OPTIONS = [
  'Products on page: 50',
  'Filter',
  'Sort by: Price Asc.'
];

export default function Home() {
  return (
    <div>
      <h1 className="flex justify-center font-bold font-jaro text-7xl p-5 pb-7">Our Shop</h1>
      <ul className="container flex justify-between rounded-full px-5 py-3 mx-auto bg-highlightRed">
        {
          PAGES.map((page, i) => (
            <li key={i} className="transition ease-in-out delay-50 hover:bg-background duration-300
            container flex justify-center px-5 py-3 mx-5 rounded-full bg-white cursor-pointer
            text-black font-normal"> {page} </li>))
        }
      </ul>
      <ul className="container flex justify-between my-5 mx-auto bg-white">
        {
          OPTIONS.map((opt, i) => (
            <li key={i} className="px-3 py-2 text-black font-normal"> {opt} </li>))
        }
      </ul>
    </div>
  );
}
