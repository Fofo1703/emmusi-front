import axios from "axios";

import { OBTENER_PROFESORES, OBTENER_UN_PROFESOR, INSERTAR_PROFESOR, ACTUALIZAR_PROFESOR, ELIMINAR_PROFESOR } from "../assets/Api/apiLinks";

export async function obtenerProfesores() {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_PROFESORES };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function obtenerUnProfesor(id) {
    const options = {
        method: "GET",
        withCredentials: false,
        url: OBTENER_UN_PROFESOR + id,
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

export async function insertarProfesor(profesores) {
    console.log("Enviando profesores:", profesores);

    const options = {
        method: "POST",
        withCredentials: false,
        url: INSERTAR_PROFESOR,
        data: profesores,
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


export async function actualizarProfesor(profesores) {
    const options = { method: "POST", withCredentials: false, url: ACTUALIZAR_PROFESOR, data: profesores };

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
    const options = { method: "DELETE", withCredentials: false, url: ELIMINAR_PROFESOR + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        }).catch(function (error) {
            console.log(error);
        });
}