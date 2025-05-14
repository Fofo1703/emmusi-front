import { useState, useEffect } from "react";
import { insertarCurso, obtenerUnCurso, actualizarCurso } from "../../services/cursosServices"
import InputConValidacion from "../../components/inputConValidacion";

export default function FormCursos({ id }) {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {

    if (id) {
      obtenerUnCurso(id)
        .then((data) => {
          setFormData({

            nombre: data.nombre || "",

          });
        })
        .catch((error) => {
          console.error("Error al obtener el Curso:", error);
        });
    } else {
      setFormData({
        nombre: "",
      });
      setErrors({});
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (id) {
      actualizarCurso(id, formData)
        .then((response) => {
          alert(response);
        })
        .catch((error) => {
          console.error("Error al registrar el Curso:", error);
        });
    } else {
      insertarCurso(formData)
        .then((response) => {
          if (response.success) {
            setFormData({
              nombre: "",
            });
          }
          alert(response.message);
        })
        .catch((error) => {
          console.error("Error al registrar el Curso:", error);
        });
    }
  };

  return (
    <>
      <div className="h-auto flex flex-col items-center justify-center text-center ">
        <p className="text-5xl font-semibold mb-12 mt-12 ">Formulario de Cursos</p>
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
                {id ? "Actualizar" : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


