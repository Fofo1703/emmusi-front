import axios from "axios";

import { OBTENER_CURSOS_HISTORICOS, OBTENER_UN_CURSO_HISTORICO, INSERTAR_CURSO_HISTORICO, ACTUALIZAR_CURSO_HISTORICO, ELIMINAR_CURSO_HISTORICO } from "../assets/Api/apiLinks";

export async function obtenerCursosHistorico(id) {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_CURSOS_HISTORICOS + id };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function obtenerUnCursoHistorico(id) {
    const options = { method: "GET", withCredentials: false, url: OBTENER_UN_CURSO_HISTORICO + id };

    return await axios.request(options).then(function (response) {
        return response.data[0];
    }).catch(function (error) {
        console.error(error);
    });
}

export async function insertarCursoHistorico(id) {
    
    const options = { method: "POST", withCredentials: false, url: INSERTAR_CURSO_HISTORICO + id };

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


export async function actualizarCursoHistorico(id,curso) {
    const options = { method: "PUT", withCredentials: false, url: ACTUALIZAR_CURSO_HISTORICO + id, data: curso };

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

export async function eliminarCursoHistorico(id) {
    const options = { method: "DELETE", withCredentials: false, url: ELIMINAR_CURSO_HISTORICO + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        }).catch(function (error) {
            console.log(error);
        });
}