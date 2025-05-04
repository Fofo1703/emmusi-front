import { useState } from "react";
import { insertarProfesor } from "../../services/profesoresServices";
import InputConValidacion from "../../components/inputConValidacion";

export default function FormProfesores() {
  const [formData, setFormData] = useState({
    nombre: "",
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

    // Si hay errores, los mostramos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      insertarProfesor(formData)
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
      <div className="h-auto flex flex-col items-center justify-center text-center ">
        <p className="text-5xl font-semibold mb-12 mt-12 ">Formulario de Profesores</p>
        <div className="w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className=" bg-white px-10 py-10 rounded-3xl border-2"
          >
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
