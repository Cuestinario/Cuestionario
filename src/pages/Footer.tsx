// src/components/Footer.tsx
import React from 'react';
import { FaInstagram, FaTimes } from 'react-icons/fa'; // Iconos de Instagram y X
import logo from '../assets/images/logo.svg'; // Importa el logo

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#00215B] py-4 mt-10 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.1)]"> {/* Sombra solo arriba y tamaño reducido */}
      <div className="container mx-auto px-6">

        {/* Logo centrado */}
        <div className="flex justify-center my-4">
          <img src={logo} alt="Logo" className="w-20" /> {/* Tamaño reducido del logo */}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-4">
          <p>&copy; {new Date().getFullYear()} Daturity. Todos los derechos reservados.</p>
        </div>

        {/* Iconos de X e Instagram */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-[#00215B] text-2xl hover:text-[#D2153D]" />
          </a>
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <FaTimes className="text-[#00215B] text-2xl hover:text-[#D2153D]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
