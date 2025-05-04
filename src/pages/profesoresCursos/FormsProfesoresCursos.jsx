import Navbar from "../../components/navbar/navbar";
import FormCursos from "./formCursos";
// import FormHorarios from "../horarios/formHorarios";
import FormProfesores from "./formProfesores";

export default function FormProfesoresCursosHorarios() {


  return (
    <>
      <Navbar />
      <div className="grid sm:grid-cols-2 w-full h-auto mt-3 gap-10">

        <div className="flex flex-col justify-center">
          <FormProfesores />
          {/* <FormCursos /> */}
        </div>

        <div className="flex flex-col justify-center">
          {/* <FormHorarios /> */}
          <FormCursos />
        </div>

      </div>
    </>
  );
}
