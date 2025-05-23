import axios from "axios";
import Swal from "sweetalert2";
import { OBTENER_AUSENCIAS, AGREGAR_NOTA } from "../assets/Api/apiLinks";

export async function obtenerAusencias(id) {
    const options = { method: 'GET', withCredentials: false, url: OBTENER_AUSENCIAS + id };

    return await axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        Swal.fire({
            icon: "error",
            title: error.response?.data?.message,
            showConfirmButton: false,
            timer: 1500
        });
    });
}

export async function agregarNota(id, nota) {

    const options = { method: "PUT", withCredentials: false, url: AGREGAR_NOTA + id, data: { nota } };

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
