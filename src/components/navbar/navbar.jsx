import React, { useState } from 'react'
import logo from '../../assets/images/logo emmusi.jpg'
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>

            <header className=" flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md">
                <a href="/">
                    <img src={logo} alt="Logo de la empresa" className="w-32 max-h-12 hover:scale-105 transition-all" />
                </a>

                <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">

                    <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"><Link to="/estudiantes">Estudiantes</Link></li>
                    <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"><Link to="/profesoresCursosHorarios">Formularios</Link></li>
                    <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"><Link to="/estudiantes/listaEstudiantes">Lista</Link></li>
                    <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Contact</li>

                </ul>

                <i className="bx bx-menu xl:hidden block text-5xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>

                <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center 
                    gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
                    style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}>

                    <li className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'><Link to="/estudiantes">Estudiantes</Link></li>
                    <li className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'><Link to="/profesoresCursosHorarios">Formularios</Link></li>
                    <li className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>Services</li>
                    <li className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>Contact</li>

                </div>
            </header>

        </>
    );
}