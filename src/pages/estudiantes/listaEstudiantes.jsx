import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Stack,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// autoTable(jsPDF.API); // <- Registro del plugin en jsPDF


export default function ListaEstudiantes() {
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns = [
    { field: 'cedula', headerName: 'Cédula', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'telefono', headerName: 'Teléfono', flex: 1 },
    { field: 'especialidad', headerName: 'Especialidad', flex: 1 },
    { field: 'subespecialidad', headerName: 'Subespecialidad', flex: 1 },
  ];

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await axios.get('http://localhost:444/api/estudiantes/getEstudiantes');
        const estudiantesConId = res.data.map((item, index) => ({
          ...item,
          id: item.id || index,
        }));
        setRows(estudiantesConId);
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    };

    fetchEstudiantes();
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
    XLSX.writeFile(workbook, 'estudiantes.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
  
    doc.text('Lista de Estudiantes', 14, 10);
  
    autoTable(doc, {
      head: [['Cédula', 'Nombre', 'Teléfono', 'Especialidad', 'Subespecialidad']],
      body: filteredRows.map(row => [
        row.cedula,
        row.nombre,
        row.telefono,
        row.especialidad,
        row.subespecialidad,
      ]),
      startY: 20,
    });
  
    doc.save('estudiantes.pdf');
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Lista de Estudiantes
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
  );
}
