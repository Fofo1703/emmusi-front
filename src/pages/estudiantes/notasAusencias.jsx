import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import { Button, Stack, Box, TextField } from '@mui/material';
import { obtenerUnEstudiante } from '../../services/estudianteServices';
import { obtenerAusencias, agregarNota } from '../../services/notasAusenciasServices';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../../components/navbar/navbar';
import DataTable from 'react-data-table-component';

import NotesIcon from '@mui/icons-material/Notes';
import SchoolIcon from '@mui/icons-material/School';
import Swal from 'sweetalert2'


import logo from '../../assets/images/logo emmusi.jpg'; // Asegúrate de importar tu imagen si usas Webpack/Vite

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default function NotasAusencias() {
    const [rows, setRows] = useState([]);
    const [estudiante, setEstudiante] = useState({
        id: "",
        cedula: "",
        nombre: "",
        telefono: "",
        especialidad: "",
        subespecialidad: "",
    });
    const [filterText, setFilterText] = useState('');
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const fetchAusencias = async (id) => { // Recibir id como parámetro
        try {
            const data = await obtenerAusencias(id); // Pasar id a la función de consulta
            const ausencias = data.map((item, index) => ({
                ...item,
                id: item.id || index,
            }));
            setRows(ausencias);
        } catch (error) {
            console.error('Error al obtener los cursos matriculados:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAusencias(id); // Llamada correcta con id
            obtenerUnEstudiante(id)
                .then((data) => {
                    setEstudiante({
                        id: data.id || "",
                        cedula: data.cedula || "",
                        nombre: data.nombre || "",
                        telefono: data.telefono || "",
                        especialidad: data.especialidad || "",
                        subespecialidad: data.subespecialidad || ""

                    });
                })
                .catch((error) => console.error("Error al obtener horario:", error));
        }
    }, [id]);

    const filteredRows = useMemo(() => {
        const normalizedFilter = filterText.toLowerCase();
        return rows.filter(row =>
            [row.curso, row.horario, row.profesor]
                .some(val => (val || '').toLowerCase().includes(normalizedFilter))
        );
    }, [rows, filterText]);

    const obtenerNota = async (idCursoMatriculado) => {
        const { value: nota, isConfirmed } = await Swal.fire({
            title: 'Ingresar Nota',
            input: 'text',
            inputPlaceholder: "Ej: 95, Retiro Justificado, No Oferta",
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value || value.trim() === "") {
                    return "Este campo no puede estar vacío.";
                }

                const notaLimpia = value.trim();
                const frasesValidas = ["Retiro Justificado", "No Oferta"];
                const esNumeroValido = !isNaN(notaLimpia) && Number(notaLimpia) >= 0 && Number(notaLimpia) <= 100;
                const esFraseValida = frasesValidas.some(f => f.toLowerCase() === notaLimpia.toLowerCase());

                if (!esNumeroValido && !esFraseValida) {
                    return "Ingresa un número entre 0 y 100 o una frase válida: 'Retiro Justificado', 'No Oferta'";
                }

                return null;
            }
        });

        if (isConfirmed && nota) {
            const notaLimpia = nota.trim();
            agregarNota(idCursoMatriculado, notaLimpia)
                .then((response) => {

                    if (response.success) {
                        fetchAusencias(id);
                        Swal.fire({
                            icon: "success",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: 'No se pudo guardar la nota.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        }


    };

    const agregarAusencias = async (idCursoMatriculado) => {
        const { value: formValues, isConfirmed } = await Swal.fire({
            title: 'Agregar Ausencias',
            html:
                '<input id="justificadas" type="number" min="0" class="swal2-input" placeholder="Justificadas">' +
                '<input id="injustificadas" type="number" min="0" class="swal2-input" placeholder="Injustificadas">',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            preConfirm: () => {
                const justificadas = document.getElementById('justificadas').value;
                const injustificadas = document.getElementById('injustificadas').value;

                if (justificadas === '' && injustificadas === '') {
                    Swal.showValidationMessage('Debes ingresar al menos un campo');
                    return;
                }

                if (
                    (justificadas !== '' && (isNaN(justificadas) || justificadas < 0)) ||
                    (injustificadas !== '' && (isNaN(injustificadas) || injustificadas < 0))
                ) {
                    Swal.showValidationMessage('Solo se permiten números positivos');
                    return;
                }

                return {
                    justificadas: justificadas !== '' ? Number(justificadas) : null,
                    injustificadas: injustificadas !== '' ? Number(injustificadas) : null
                };
            }
        });

        if (isConfirmed && formValues) {
            try {
                console.log("Valores ingresados:", formValues);
                // await tuFuncionGuardarAusencias(idCursoMatriculado, formValues.justificadas, formValues.injustificadas);
                Swal.fire({
                    icon: "success",
                    title: "Ausencias guardadas exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                console.error('Error al guardar ausencias:', error);
            }
        } else {
            console.log('Usuario canceló la operación');
        }
    };


    const columns = [
        { name: 'Curso', selector: row => row.curso, sortable: true, wrap: true, minWidth: '110px' },
        { name: 'Calificación', selector: row => row.nota, sortable: true, wrap: true, minWidth: '150px' },
        { name: 'Justificadas', selector: row => row.justificadas, wrap: true, minWidth: '140px' },
        { name: 'Injustificadas', selector: row => row.injustificadas, wrap: true, minWidth: '160px' },
        {
            name: 'Acciones', minWidth: '380px',
            cell: row => (
                <div className='flex flex-row gap-2'>
                    <Button size="small" variant="outlined" onClick={() => agregarAusencias(row.id)} startIcon={<SchoolIcon />}>
                        Agregar Ausencias
                    </Button>
                    <Button size="small" variant="outlined" color="secondary" onClick={() => obtenerNota(row.id)} startIcon={<NotesIcon />}>Agregar Nota</Button>
                </div>
            ),
        }
    ];


    const customStyles = {
        headCells: {
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: '#f1b282', // Cambia esto al color de fondo que quieras
            },
        },
        cells: {
            style: {
                fontSize: '16px',
            },
        },
    };

    const exportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Ausencias');

        // 🔽 Insertar dos filas vacías antes de todo
        sheet.addRow([]);
        sheet.addRow([]);

        // 🔶 Cuadro de matrícula (ahora en D3 y D4)
        sheet.getCell('D3').value = `CURSO LECTIVO ${rows[0]?.ciclo || ''}`;
        sheet.getCell('D3').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF9966' },
        };
        sheet.getCell('D3').font = { bold: true };
        sheet.getCell('D3').alignment = { vertical: 'middle', horizontal: 'center' };

        sheet.getCell('D4').value = `ESPECIALIDAD ${estudiante.especialidad || ''}`;
        sheet.getCell('D4').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF9966' },
        };
        sheet.getCell('D4').font = { bold: true };
        sheet.getCell('D4').alignment = { vertical: 'middle', horizontal: 'center' };

        // 🧑 Datos del estudiante (ahora en C5 y C6)
        sheet.getCell('C3').value = `Estudiante: ${estudiante.nombre}`;
        sheet.getCell('C4').value = `Subespecialidad: ${estudiante.subespecialidad}`;

        // 🟧 Insertamos dos filas vacías antes de la tabla para moverla a C9
        sheet.addRow([]);
        sheet.addRow([]);

        // 🟧 Encabezado de la tabla (ahora en la fila 9)
        const header = ['', '', 'Curso', 'Calificación', 'Ausencias Justificadas', 'Ausencias Injustificadas'];
        const headerRow = sheet.addRow(header);
        headerRow.eachCell((cell, colNumber) => {
            if (colNumber >= 3) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFF9966' },
                };
                cell.font = { bold: true };
                cell.border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' },
                };
                cell.alignment = { horizontal: 'center' };
            }
        });

        // 📄 Filas de datos (también desplazadas)
        filteredRows.forEach((row) => {
            const dataRow = sheet.addRow(['', '', row.curso, row.nota, row.justificadas, row.injustificadas]);
            dataRow.eachCell((cell, colNumber) => {
                if (colNumber >= 3) {
                    cell.border = {
                        top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        left: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                }
            });
        });

        // 📏 Ajustar ancho de columnas
        sheet.columns.forEach((column) => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) => {
                const value = cell.value ? cell.value.toString() : '';
                maxLength = Math.max(maxLength, value.length);
            });
            column.width = maxLength + 4;
        });

        // 💾 Guardar archivo
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `${estudiante.nombre} Cursos Matriculados.xlsx`);
    };


    // --------------------------------------------**************************************************--------------------------------------------------------------------
    const exportPDF = () => {
        const doc = new jsPDF();

        // 👇 Dibuja los logos
        const drawLogos = (startY) => {
            const imgWidth = 40;
            const imgHeight = 15;
            doc.addImage(logo, 'PNG', 10, startY, imgWidth, imgHeight);
            doc.addImage(logo, 'PNG', 60, startY, imgWidth, imgHeight);
            doc.addImage(logo, 'PNG', 110, startY, imgWidth, imgHeight);
        };

        // 👇 Dibuja el recuadro de matrícula a la derecha
        const drawCuadroMatricula = (startY) => {
            doc.setDrawColor(0);
            doc.setFillColor(255, 153, 102);
            doc.rect(130, startY, 66, 20, 'FD');
            doc.setFontSize(15);
            doc.setTextColor(0);
            doc.text(`MATRÍCULA ${rows[0]?.ciclo || ''}`, 135, startY + 7);
            doc.text(`Especialidad: ${estudiante.especialidad}`, 133, startY + 14);
        };

        // 👇 Dibuja los datos del estudiante
        const drawDatosEstudiante = (startY) => {
            doc.setFontSize(13);
            doc.setTextColor(0);
            doc.text(`Estudiante: ${estudiante.nombre}`, 14, startY + 7);
            doc.text(`Subespecialidad: ${estudiante.subespecialidad}`, 14, startY + 14);
        };

        // 👇 Dibuja la tabla de cursos
        const drawTabla = (startY) => {
            autoTable(doc, {
                startY,
                head: [['Curso', 'Calificación', 'Ausencias Justificadas', 'Ausencias Injustificadas']],
                body: filteredRows.map(row => [
                    row.curso,
                    row.nota,
                    row.justificadas,
                    row.injustificadas
                ]),
                styles: {
                    fontSize: 10,
                    textColor: [0, 0, 0],
                    halign: 'center',
                    valign: 'middle',
                    lineWidth: 0.1,
                    lineColor: [0, 0, 0],
                },
                headStyles: {
                    fillColor: [255, 153, 102],
                    textColor: [0, 0, 0],
                    fontStyle: 'bold',
                },
            });

        };

        // 👇 Función principal para ensamblar un bloque completo

        drawLogos(10);
        drawCuadroMatricula(30); // se mantiene arriba a la derecha
        drawDatosEstudiante(30);
        drawTabla(70);


        doc.save(`${estudiante.nombre} Cursos Matriculados.pdf`);
    };


    return (
        <>
            <Navbar />
            <Box sx={{ padding: 2 }} className='z-0 '>

                <div className="flex flex-row gap-96 w-fit m-auto my-5">
                    <div className=''>
                        <p className="font-medium text-lg ">Cédula: {estudiante.cedula}</p>
                        <p className="font-medium text-lg ">Estudiante: {estudiante.nombre}</p>
                        <p className="font-medium text-lg ">Subespecialidad: {estudiante.subespecialidad}</p>
                    </div>
                    <div className='bg-anaranjado-cuadro px-10 border-2 border-black'>
                        <p className="font-medium text-lg ">Matricula: {rows[0]?.ciclo}</p>
                        <p className="font-medium text-lg ">Especialidad: {estudiante.especialidad}</p>
                    </div>
                </div>

                <div className='w-fit m-auto'>
                    <Stack sx={{ mb: 2 }}>
                        <label className='text-4xl font-bold'>Lista de Notas y Ausencias</label>
                    </Stack>

                    <div className='flex flex-col sm:flex-row gap-5 mb-5'>
                        <TextField
                            label="Buscar"
                            variant="outlined"
                            size="small"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                        <Button variant="contained" color="success" onClick={exportExcel}>
                            Exportar a Excel
                        </Button>
                        <Button variant="contained" color="error" onClick={exportPDF}>
                            Exportar a PDF
                        </Button>
                    </div>
                </div>



                <div className="overflow-auto">
                    <Box sx={{ overflowX: 'auto' }} className="w-fit m-auto">
                        <DataTable
                            columns={columns}
                            data={filteredRows}
                            pagination
                            fixedHeader
                            highlightOnHover
                            striped
                            responsive={true}
                            noDataComponent="No se encontraron horarios"
                            customStyles={customStyles}
                        />
                    </Box>
                </div>


            </Box>
        </>
    );
}

