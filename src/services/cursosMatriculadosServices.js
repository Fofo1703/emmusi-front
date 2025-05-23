import axios from "axios";
import Swal from "sweetalert2";
// import { OBTENER_CURSOS_MATRICULADOS, OBTENER_UN_CURSO_MATRICULADO, INSERTAR_CURSO_MATRICULADO, ACTUALIZAR_CURSO_MATRICULADO, ELIMINAR_CURSO_MATRICULADO } from "../assets/Api/apiLinks";
import { OBTENER_CURSOS_MATRICULADOS, INSERTAR_CURSO_MATRICULADO, ELIMINAR_CURSO_MATRICULADO } from "../assets/Api/apiLinks";

export async function obtenerCursosMatriculados(id) {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_CURSOS_MATRICULADOS + id };

    return await axios.request(options).then(function (response) {
        return response.data;

    }).catch(function (error) {
        Swal.fire({
            icon: "error",
            title: error.response?.data?.message,
            showConfirmButton: false,
            timer: 1500
        });
        return [];
    });
}

// export async function obtenerUnCursoMatriculado(id) {
//     const options = { method: "GET", withCredentials: false, url: OBTENER_UN_CURSO_MATRICULADO + id };

//     return await axios.request(options)
//     .then(function (response) {
//         return response.data[0];
//     })
//     .catch(function (error) {
//         Swal.fire({
//             icon: "error",
//             title: error.response?.data?.message,
//             showConfirmButton: false,
//             timer: 1500
//         });
//     });
// }

export async function insertarCursoMatriculado(curso) {
    if (curso.nota === "") {
        curso.nota = null;
    }

    const options = { method: "POST", withCredentials: false, url: INSERTAR_CURSO_MATRICULADO, data: curso };

    return await axios
        .request(options)
        .then((response) => {
            // Mostrar mensaje de éxito del backend
            return { success: true, message: response.data.message };
        })
        .catch((error) => {
            // Capturar el mensaje del backend en caso de error
            return { success: false, message: error.response?.data?.message };
        });
}


// export async function actualizarCursoMatriculado(id, curso) {
//     const options = { method: "PUT", withCredentials: false, url: ACTUALIZAR_CURSO_MATRICULADO + id, data: curso };

//     return await axios
//         .request(options)
//         .then((response) => {
//             // Mostrar mensaje de éxito del backend
//             return { success: true, message: response.data.message };
//         })
//         .catch((error) => {
//             // Capturar el mensaje del backend en caso de error
//             return { success: false, message: error.response?.data?.message };
//         });
// }
export async function eliminarCursoMatriculado(id) {
    const options = { method: "DELETE", withCredentials: false, url: ELIMINAR_CURSO_MATRICULADO + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: error.response?.data?.message,
                showConfirmButton: false,
                timer: 1500
            });
        });
}