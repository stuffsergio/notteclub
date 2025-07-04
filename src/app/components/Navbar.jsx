"use client";
import { useState } from "react";

export default function NavBar() {
  const [openProductos, setOpenProductos] = useState(false);

  return (
    <nav className="fixed min-w-[96dvw] h-[8dvh] top-5 left-1/2 -translate-x-1/2 flex flex-row justify-center items-center bg-black text-white/90 border border-white/60 rounded-3xl">
      <ul className="w-full flex flex-row justify-evenly">
        <li>Inicio</li>
        <li className="relative cursor-pointer">
          <button onClick={() => setOpenProductos(true)}>Productos</button>
          <ul
            className={`z-20 absolute flex-col items-center justify-center ${
              openProductos ? "flex" : "hidden"
            }`}
          >
            <li>Camisetas</li>
            <li>Tank Tops</li>
            <li>Joyería</li>
            <li
              onClick={() => setOpenProductos(false)}
              className="border border-red-500 rounded-full bg-red-300"
            >
              Close
            </li>
          </ul>
        </li>
        <li>LookBook</li>
      </ul>
    </nav>
  );
}
