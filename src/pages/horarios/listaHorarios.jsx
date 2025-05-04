import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Box, Typography, TextField } from '@mui/material';
import { obtenerHorarios } from '../../services/horariosServices'; 
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../../components/navbar/navbar';

// autoTable(jsPDF.API); // <- Registro del plugin en jsPDF


export default function ListaHorarios() {
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns = [
    { field: 'curso', headerName: 'Curso', flex: 1 },
    { field: 'profe', headerName: 'Profe', flex: 1 },
    { field: 'dia', headerName: 'Dia', flex: 1 },
    { field: 'horaInicio', headerName: 'Hora Inicio', flex: 1 },
    { field: 'horaFin', headerName: 'Hora Fin', flex: 1 },
    { field: 'ciclo', headerName: 'Ciclo', flex: 1 },
  ];

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const data = await obtenerHorarios();
        const estudiantesConId = data.map((item, index) => ({        
          ...item,
          id: item.id || index,
        }));
        setRows(estudiantesConId);
      } catch (error) {
        console.error('Error al obtener horarios:', error);
      }
    };

    fetchHorarios();
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedFilter = filterText.toLowerCase();
    return rows.filter(row =>
      [row.cedula, row.nombre, row.telefono, row.especialidad, row.subespecialidad]
        .some(val => (val || '').toLowerCase().includes(normalizedFilter))
    );
  }, [rows, filterText]);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Horarios');
    XLSX.writeFile(workbook, 'horarios.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text('Lista de Horarios', 14, 10);

    autoTable(doc, {
      head: [['Curso', 'Profe', 'Dia', 'Hora Inicio', 'Hora Fin', 'Ciclo']],
      body: filteredRows.map(row => [
        row.curso,
        row.profe,
        row.dia,
        row.horaInico,
        row.horaFin,
        row.ciclo,
      ]),
      startY: 20,
    });

    doc.save('horarios.pdf');
  };

  return (
    <>
      <Navbar />
      <div className='z-0'>
        <Box sx={{ width: '100%', padding: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Lista de Horarios
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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
          </Stack>

          <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pagination
              paginationMode="client"
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10]}
              disableColumnMenu
              autoHeight
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
