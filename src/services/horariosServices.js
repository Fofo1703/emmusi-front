import axios from "axios";

import { OBTENER_HORARIOS, OBTENER_UN_HORARIO, INSERTAR_HORARIO, ACTUALIZAR_HORARIO, ELIMINAR_HORARIO } from "../assets/Api/apiLinks";

export async function obtenerHorarios() {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_HORARIOS };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function obtenerUnHorario(id) {
    const options = { method: "GET", withCredentials: false, url: OBTENER_UN_HORARIO + id };

    return await axios.request(options).then(function (response) {
        return response.data[0];
    }).catch(function (error) {
        console.error(error);
    });
}

export async function insertarHorario(horario) {
    const options = { method: "POST", withCredentials: false, url: INSERTAR_HORARIO, data: horario };

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


export async function actualizarHorario(id, horario) {
    const options = { method: "PUT", withCredentials: false, url: ACTUALIZAR_HORARIO + id, data: horario };

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

export async function eliminarHorario(id) {
    const options = { method: "DELETE", withCredentials: false, url: ELIMINAR_HORARIO + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        }).catch(function (error) {
            console.log(error);
        });
}