import { useState } from "react";
import { insertarEstudiante } from "../../services/estudianteServices";
import InputConValidacion from "../../components/inputConValidacion"; // Ruta ajustada si es necesario
import Navbar from "../../components/navbar/navbar";

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
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Borra el error cuando el usuario escribe
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validación de campos requeridos
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Este campo es obligatorio";
      }
    });

    // Validaciones específicas
    if (formData.cedula.trim() && !/^\d{9}$/.test(formData.cedula)) {
      newErrors.cedula = "La cédula debe tener exactamente 9 dígitos";
    }

    if (formData.telefono.trim() && !/^\d{8}$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 8 dígitos";
    }

    // Si hay errores, los mostramos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      insertarEstudiante(formData)
        .then((response) => {
          alert(response);
        })
        .catch((error) => {
          console.error("Error al registrar el estudiante:", error);
        });
    }
  };

  return (
    <>
    <Navbar/>
      <div className="h-auto ml-auto mr-auto flex flex-col items-center justify-center text-center" >
        <label className="text-5xl font-semibold mb-12 mt-12 lg:mt-0">Formulario de los Estudiantes</label>

        <div className="w-full flex items-center justify-center lg:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4 rounded-3xl border-2">

            {/* Inputs para Cedula y Nombre */}
            <div className="grid sm:grid-cols-2 gap-3">
              <InputConValidacion
                id="cedula"
                name="cedula"
                label="Cédula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Ingrese el número de cédula"
                requerido
                validacion="numero"
                inputProps={{
                  maxLength: 9,
                }}
                inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                labelClassName="block text-gray-700 text-sm font-bold mb-2"
                error={errors.cedula} // Pasamos el error aquí
              />

              <InputConValidacion
                id="nombre"
                name="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                requerido
                validacion="texto"
                inputProps={{
                  maxLength: 50,
                }}
                inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                labelClassName="block text-gray-700 text-sm font-bold mb-2"
                error={errors.nombre} // Pasamos el error aquí
              />
            </div>

            {/* Inputs para Teléfono, Especialidad y Subespecialidad */}
            <InputConValidacion
              id="telefono"
              name="telefono"
              label="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ingrese el número de teléfono"
              requerido
              validacion="numero"
              inputProps={{
                maxLength: 8,
              }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.telefono} // Pasamos el error aquí
            />

            <InputConValidacion
              id="especialidad"
              name="especialidad"
              label="Especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              placeholder="Ingrese la especialidad"
              requerido
              validacion="alfanumerico"
              inputProps={{
                maxLength: 50,
              }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.especialidad} // Pasamos el error aquí
            />

            <InputConValidacion
              id="subespecialidad"
              name="subespecialidad"
              label="Subespecialidad"
              value={formData.subespecialidad}
              onChange={handleChange}
              placeholder="Ingrese la subespecialidad"
              requerido
              validacion="alfanumerico"
              inputProps={{
                maxLength: 50,
              }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.subespecialidad} // Pasamos el error aquí
            />

            {/* Botón de Registro */}
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                type="submit"
                className="py-2 rounded-xl bg-blue-500 text-white text-lg font-bold hover:scale-[1.01] active:scale-[.98]"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
