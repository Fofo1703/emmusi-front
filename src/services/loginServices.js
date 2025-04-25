import axios from "axios";

import { VALIDAR_CREDENCIALES } from "../assets/Api/apiLinks";

export async function validarCredenciales(usuario) {
    const options = {
        method: "POST",
        withCredentials: false,
        url: VALIDAR_CREDENCIALES,
        data: usuario,
    };

    return await axios
        .request(options)
        .then((response) => {
            // alert(response.data);
            return { success: true}
        })
        .catch((error) => {
            // Capturar el mensaje del backend en caso de error
            return { success: false, message: error.response?.data?.message };
        });
}

// export async function login(usuario, password) {
//     console.log("Intentando autenticación:", usuario);

//     const options = {
//         method: "POST",
//         withCredentials: false,
//         url: "/api/auth",
//         data: { usuario, password },
//     };

//     return await axios
//         .request(options)
//         .then((response) => {
//             return response.status === 200 
//                 ? { success: true, message: response.data.message } // Éxito
//                 : { success: false, message: response.data.message }; // Error
//         })
//         .catch((error) => {
//             return { success: false, message: error.response?.data?.message || "Error en la autenticación" };
//         });
// }
