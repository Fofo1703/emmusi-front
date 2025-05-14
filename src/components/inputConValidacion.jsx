import React from "react";

export default function InputConValidacion({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  requerido = false,
  validacion,
  inputProps = {},
  maxLength,
  inputClassName = "", // Clases para el input
  labelClassName = "", // Clases para el label
  errorClassName = "text-red-500 text-xs italic", // Clases para el mensaje de error
  error,
}) {
  // Función para validar el input según el tipo
  const validar = (value) => {
    if (validacion === "numero" && !/^\d*$/.test(value)) {
      return false; // Solo números
    }
    if (validacion === "texto" && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      return false; // Solo letras, espacios y caracteres con tildes y ñ
    }
    if (validacion === "alfanumerico" && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      return false; // Solo letras, números, espacios y caracteres con tildes y ñ
    }
    if (validacion === "ciclo" && !/^[I0-9-\s]*$/.test(value)) {
      return false; // Solo letras, números, espacios y caracteres con tildes y ñ
    }
    return true;
  };

  // Validación adicional: Limitar la longitud si es necesario
  const handleOnChange = (e) => {
    const { value } = e.target;
    if (validar(value)) {
      onChange(e);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          className={`${labelClassName}`} // Clases personalizadas para el label
          htmlFor={id}
        >
          {label} {requerido && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`${inputClassName} ${error ? "border-red-500" : "border-gray-300"}`} // Clases personalizadas para el input
        {...inputProps}
      />
      {/* Mostrar mensaje de error si hay un error */}
      {error && <p className={`${errorClassName}`}>{error}</p>}
    </div>
  );
}
