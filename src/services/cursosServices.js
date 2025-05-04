import axios from "axios";

import { OBTENER_CURSOS, OBTENER_UN_CURSO, INSERTAR_CURSO, ACTUALIZAR_CURSO, ELIMINAR_CURSO } from "../assets/Api/apiLinks";

export async function obtenerCursos() {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_CURSOS };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function obtenerUnCurso(id) {
    const options = {
        method: "GET",
        withCredentials: false,
        url: OBTENER_UN_CURSO + id,
    };

    return await axios
        .request(options)
        .then(function (response) {
            return response.data.data[0];
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function insertarCurso(curso) {
    console.log("Enviando profesores:", curso);

    const options = {
        method: "POST",
        withCredentials: false,
        url: INSERTAR_CURSO,
        data: curso,
    };

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


export async function actualizarCurso(curso) {
    const options = { method: "POST", withCredentials: false, url: ACTUALIZAR_CURSO, data: curso };

    return await axios
        .request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function eliminarProfesor(id) {
    const options = { method: "DELETE", withCredentials: false, url: ELIMINAR_CURSO + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        }).catch(function (error) {
            console.log(error);
        });
}