import FormCursos from "./formCursos";
import FormHorarios from "./formHorarios";
import FormProfesores from "./formProfesores";

export default function FormProfesoresCursosHorarios() {


  return (
    <>
       <div className="grid sm:grid-cols-2 w-full h-screen">
            <div className="flex flex-col justify-center">
                <FormProfesores/>
                <FormCursos/>
            </div>
            <div className="flex flex-col justify-center">
                <FormHorarios/>
            </div>
      </div> 
    </>
  );
}
