import { useState } from "react";
import { postEstudiante } from "../../services/estudianteServices";

export default function FormStudent() {
    const [formData, setFormData] = useState({
        cedula: "",
        nombre: "",
        telefono: "",
        especialidad: "",
        subespecialidad: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Validación para cédula y teléfono: Solo números
        if ((id === "cedula" || id === "telefono") && !/^\d*$/.test(value)) {
            return;
        }

        // Validación para nombre: Solo letras y espacios
        if (id === "nombre" && !/^[a-zA-Z\s]*$/.test(value)) {
            return;
        }

        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: "" }); // Borra el error al escribir
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
    
        // Validaciones básicas de campos vacíos, eliminando espacios innecesarios
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) { // Se usa trim() para eliminar espacios en blanco
                newErrors[key] = "Este campo es obligatorio";
            }
        });
    
        // Validación de formato: cédula (9 dígitos), teléfono (8 dígitos)
        if (formData.cedula.trim() && formData.cedula.length !== 9) {
            newErrors.cedula = "La cédula debe tener exactamente 9 dígitos";
        }
        if (formData.telefono.trim() && formData.telefono.length !== 8) {
            newErrors.telefono = "El teléfono debe tener exactamente 8 dígitos";
        }
    
        // Validación de nombre: Solo letras y espacios
        if (formData.nombre.trim() && !/^[a-zA-Z\s]+$/.test(formData.nombre.trim())) {
            newErrors.nombre = "El nombre solo puede contener letras y espacios";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            postEstudiante(formData)
            .then(response => {
                // console.log(response);
                alert(response);
            })
            .catch(error => {
                console.error("Error al registrar el estudiante:", error);
            });
        }
    };
    

    const placeholders = {
        telefono: "Ingrese el número de teléfono",
        especialidad: "Ingrese la especialidad",
        subespecialidad: "Ingrese la subespecialidad",
    };

    return (
        <div className="h-screen ml-auto mr-auto flex flex-col items-center justify-center">
            <label className="text-5xl font-semibold mb-12">Formulario de los Estudiantes</label>

            <div className="w-full flex items-center justify-center lg:w-1/2">
                <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 rounded-3xl border-2">

                    {/* Cedula y Nombre en fila en pantallas grandes */}
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedula">Cédula</label>
                            <input
                                className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                    errors["cedula"] ? "border-red-500" : ""
                                }`}
                                id="cedula"
                                placeholder="Ingrese el número de cédula"
                                type="text"
                                value={formData["cedula"]}
                                onChange={handleChange}
                                maxLength="9"
                            />
                            {errors["cedula"] && <p className="text-red-500 text-xs italic">{errors["cedula"]}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input
                                className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                    errors["nombre"] ? "border-red-500" : ""
                                }`}
                                id="nombre"
                                placeholder="Ingrese el nombre"
                                type="text"
                                value={formData["nombre"]}
                                onChange={handleChange}
                            />
                            {errors["nombre"] && <p className="text-red-500 text-xs italic">{errors["nombre"]}</p>}
                        </div>
                    </div>

                    {/* Teléfono, Especialidad y Subespecialidad */}
                    {["telefono", "especialidad", "subespecialidad"].map((key) => (
                        <div key={key} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                    errors[key] ? "border-red-500" : ""
                                }`}
                                id={key}
                                placeholder={placeholders[key] || `Ingrese el ${key}`}
                                type="text"
                                value={formData[key]}
                                onChange={handleChange}
                                maxLength={key === "telefono" ? "8" : undefined} // Limitar a 8 dígitos si es teléfono
                            />
                            {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
                        </div>
                    ))}

                    {/* Botón de Registro */}
                    <div className="mt-8 flex flex-col gap-y-4">
                        <button type="submit" className="py-2 rounded-xl bg-blue-500 text-white text-lg font-bold hover:scale-[1.01] active:scale-[.98]">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

