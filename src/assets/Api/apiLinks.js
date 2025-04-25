const URL = 'http://localhost:444/api/';
const URL_USERS = URL + 'usuarios/';
const URL_STUDENTS = URL + 'estudiantes/';
const URL_TEACHERS = URL + 'profesores/';
// const URL_COURSES = URL + 'cursos/';
// const URL_ABSENCES = URL + 'ausencias/';
// const URL_RATINGS = URL + 'calificaciones/';
// const URL_COURSES_ENROLLED = URL + 'cursos-matriculados/';
// const URL_SCHEDULES = URL + 'horarios/';

export const VALIDAR_CREDENCIALES = URL_USERS + 'validarCredenciales';

export const GET_ALL_STUDENTS = URL_STUDENTS + 'getEstudiantes';
export const GET_ONE_STUDENT = URL_STUDENTS + 'getOneEstudiante/';
export const INSERT_STUDENT = URL_STUDENTS + 'insertEstudiante';
export const UPDATE_STUDENT = URL_STUDENTS + 'updateEstudiante';
export const DELETE_STUDENT = URL_STUDENTS + 'deleteEstudiante/';

export const GET_ALL_TEACHERS = URL_TEACHERS + 'getProfesores';
export const GET_ONE_TEACHER = URL_TEACHERS + 'read/';
export const INSERT_TEACHER = URL_TEACHERS + 'insertProfesor';
export const UPDATE_TEACHER = URL_TEACHERS + 'updateProfesor';
export const DELETE_TEACHER = URL_TEACHERS + 'deleteProfesor/';