import axios from "axios";

import { OBTENER_ESTUDIANTES, OBTENER_UN_ESTUDIANTE, INSERTAR_ESTUDIANTE, ACTUALIZAR_ESTUDIANTE, ELIMINAR_ESTUDIANTE } from "../assets/Api/apiLinks";

export async function obtenerEstudiantes() {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_ESTUDIANTES };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function obtenerUnEstudiante(id) {
    const options = {
        method: "GET",
        withCredentials: false,
        url: OBTENER_UN_ESTUDIANTE + id,
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

export async function insertarEstudiante(estudiante) {
    console.log("Enviando estudiante:", estudiante);

    const options = {
        method: "POST",
        withCredentials: false,
        url: INSERTAR_ESTUDIANTE,
        data: estudiante,
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


export async function actualizarEstudiante(estudiante) {
    const options = { method: "POST", withCredentials: false, url: ACTUALIZAR_ESTUDIANTE, data: estudiante };

    return await axios
        .request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function eliminarEstudiante(id) {
    const options = { method: "DELETE", withCredentials: false, url: ELIMINAR_ESTUDIANTE + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        }).catch(function (error) {
            console.log(error);
        });
}