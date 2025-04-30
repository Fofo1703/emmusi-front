const URL = 'http://localhost:444/api/';
const URL_USUARIOS = URL + 'usuarios/';
const URL_ESTUDIANTES = URL + 'estudiantes/';
const URL_PROFESORES = URL + 'profesores/';
// const URL_COURSES = URL + 'cursos/';
// const URL_ABSENCES = URL + 'ausencias/';
// const URL_RATINGS = URL + 'calificaciones/';
// const URL_COURSES_ENROLLED = URL + 'cursos-matriculados/';
// const URL_SCHEDULES = URL + 'horarios/';

export const VALIDAR_CREDENCIALES = URL_USUARIOS + 'validarCredenciales';

export const OBTENER_ESTUDIANTES = URL_ESTUDIANTES + 'getEstudiantes';
export const OBTENER_UN_ESTUDIANTE = URL_ESTUDIANTES + 'getOneEstudiante/';
export const INSERTAR_ESTUDIANTE = URL_ESTUDIANTES + 'insertEstudiante';
export const ACTUALIZAR_ESTUDIANTE = URL_ESTUDIANTES + 'updateEstudiante';
export const ELIMINAR_ESTUDIANTE = URL_ESTUDIANTES + 'deleteEstudiante/';

export const OBTENER_PROFESORES = URL_PROFESORES + 'getProfesores';
export const OBTENER_UN_PROFESOR = URL_PROFESORES + 'read/';
export const INSERTAR_PROFESOR = URL_PROFESORES + 'insertProfesor';
export const ACTUALIZAR_PROFESOR = URL_PROFESORES + 'updateProfesor';
export const ELIMINAR_PROFESOR = URL_PROFESORES + 'deleteProfesor/';