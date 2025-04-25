import axios from "axios";

import { GET_ALL_STUDENTS, GET_ONE_STUDENT, INSERT_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from "../assets/Api/apiLinks";

export async function getEstudiantes() {
    const options = { method: 'GET', withCredentials: false, url: GET_ALL_STUDENTS };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function getOneEstudiante(id) {
    const options = {
        method: "GET",
        withCredentials: false,
        url: GET_ONE_STUDENT + id,
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

export async function postEstudiante(estudiante) {
    console.log("Enviando estudiante:", estudiante);

    const options = {
        method: "POST",
        withCredentials: false,
        url: INSERT_STUDENT,
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


export async function updateEstudiante(estudiante) {
    const options = { method: "POST", withCredentials: false, url: UPDATE_STUDENT, data: estudiante };

    return await axios
        .request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function deleteEstudiante(id) {
    const options = { method: "DELETE", withCredentials: false, url: DELETE_STUDENT + id };

    return await axios
        .request(options).then(function (response) {
            return response.status;
        }).catch(function (error) {
            console.log(error);
        });
}