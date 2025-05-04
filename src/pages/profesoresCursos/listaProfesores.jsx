import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Box, Typography, TextField } from '@mui/material';
import { obtenerProfesores } from '../../services/profesoresServices';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../../components/navbar/navbar';

// autoTable(jsPDF.API); // <- Registro del plugin en jsPDF


export default function ListaProfesores() {
  const [rows, setRows] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
  ];

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const data = await obtenerProfesores();
        const profesoresConId = data.map((item, index) => ({        
          ...item,
          id: item.id || index,
        }));
        setRows(profesoresConId);
      } catch (error) {
        console.error('Error al obtener profesores:', error);
      }
    };

    fetchProfesores();
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedFilter = filterText.toLowerCase();
    return rows.filter(row =>
      [row.nombre]
        .some(val => (val || '').toLowerCase().includes(normalizedFilter))
    );
  }, [rows, filterText]);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Profesores');
    XLSX.writeFile(workbook, 'profesores.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text('Lista de Profesores', 14, 10);

    autoTable(doc, {
      head: [['Nombre',]],
      body: filteredRows.map(row => [
        row.nombre,
      ]),
      startY: 20,
    });

    doc.save('profesores.pdf');
  };

  return (
    <>
      <Navbar />
      <div className='z-0'>
        <Box sx={{ width: '100%', padding: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Lista de Profesores
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
