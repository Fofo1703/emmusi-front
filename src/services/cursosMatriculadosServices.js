import axios from "axios";

import { OBTENER_CURSOS_MATRICULADOS, OBTENER_UN_CURSO_MATRICULADO, INSERTAR_CURSO_MATRICULADO, ACTUALIZAR_CURSO_MATRICULADO, ELIMINAR_CURSO_MATRICULADO } from "../assets/Api/apiLinks";

export async function obtenerCursosMatriculados(id) {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_CURSOS_MATRICULADOS + id };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function obtenerUnCursoMatriculado(id) {
    const options = { method: "GET", withCredentials: false, url: OBTENER_UN_CURSO_MATRICULADO + id };

    return await axios.request(options).then(function (response) {
        return response.data[0];
    }).catch(function (error) {
        console.error(error);
    });
}

export async function insertarCursoMatriculado(curso) {
    console.log(curso);
    
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


export async function actualizarCursoMatriculado(id,curso) {
    const options = { method: "PUT", withCredentials: false, url: ACTUALIZAR_CURSO_MATRICULADO + id, data: curso };

    return await axios
        .request(options)
        .then((response) => {
            // Mostrar mensaje de éxito del backend
            return response.data.message;
        })
        .catch((error) => {
            // Capturar el mensaje del backend en caso de error
            return error.response?.data?.message;
        });
}

export async function eliminarCursoMatriculado(id) {
    const options = { method: "DELETE", withCredentials: false, url: ELIMINAR_CURSO_MATRICULADO + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        }).catch(function (error) {
            console.log(error);
        });
}