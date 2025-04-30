import { useState } from "react";
import { insertarProfesor } from "../../services/profesoresServices";
import InputConValidacion from "../../components/inputConValidacion";
import SelectConValidacion from "../../components/selectConValidacion";
import InputHoraConValidacion from "../../components/inputHoraConValidacion";

export default function FormHorarios() {
  const [formData, setFormData] = useState({
    curso: "",
    profe: "",
    dia: "",
    horaInicio: "",
    horaFin: "",
    ciclo: "",
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
      <div className="h-auto flex flex-col items-center justify-center text-center mt-16 sm:mt-3 ">
        <p className="text-5xl font-semibold mb-12">Formulario de Horarios</p>

        <div className="w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className=" bg-white px-8 rounded-3xl border-2"
          >
            <InputConValidacion
              id="curso"
              name="curso"
              label="Curso"
              value={formData.curso}
              onChange={handleChange}
              placeholder="Ingrese el curso"
              requerido
              validacion="texto"
              inputProps={{
                maxLength: 50,
              }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.curso} // Pasamos el error aquí
            />

            <InputConValidacion
              id="profe"
              name="profe"
              label="Profe"
              value={formData.profe}
              onChange={handleChange}
              placeholder="Ingrese el profe"
              requerido
              validacion="texto"
              inputProps={{
                maxLength: 50,
              }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.profe} // Pasamos el error aquí
            />

            <SelectConValidacion
              id="dia"
              name="dia"
              label="Día"
              value={formData.dia}
              onChange={handleChange}
              requerido
              options={[
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
                "Domingo",
              ]}
              selectClassName="text-sm"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.dia}
            />

            <InputHoraConValidacion
              id="horaInicio"
              name="horaInicio"
              label="Hora de Inicio"
              value={formData.horaInicio}
              onChange={handleChange}
              requerido
              inputClassName="text-sm"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.horaInicio}
            />


            <InputHoraConValidacion
              id="horaFin"
              name="horaFin"
              label="Hora de Fin"
              value={formData.horaFin}
              onChange={handleChange}
              requerido
              inputClassName="text-sm"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.horaFin}
            />


            <InputConValidacion
              id="ciclo"
              name="ciclo"
              label="Ciclo"
              value={formData.ciclo}
              onChange={handleChange}
              placeholder="Ingrese el clico"
              requerido
              validacion="texto"
              inputProps={{
                maxLength: 50,
              }}
              inputClassName="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              labelClassName="block text-gray-700 text-sm font-bold mb-2"
              error={errors.ciclo} // Pasamos el error aquí
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
