// resources/js/components/ChatWindow.tsx
import React, { useState, useEffect, useRef, FC, KeyboardEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// For CSV Parsing
import Papa from "papaparse"; 

// Components from resources/js/components/applicationComponents/dashboardComponents
import ApplicationTopBar from "../components/applicationComponents/dashboardComponents/ApplicationTopBar";
import TabLayout from "../components/applicationComponents/dashboardComponents/TabLayout";
import FileUploadButton from "../components/applicationComponents/dashboardComponents/FileUploadButton";

interface Column {
  id: 'username' | 'file_name' | 'imported_date' | 'imported_time' | 'check_result';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'username', label: 'User', minWidth: 10 },
  {
    id: 'file_name',
    label: 'File Name',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'imported_date',
    label: 'Date Imported',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'imported_time',
    label: 'Updated',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'check_result',
    label: 'Check Result',
    minWidth: 170,
    align: 'center',
  },
];

// interface for data record
interface Data 
{
  document_id: string;
  username: string;
  file_name: string;
  imported_date: string;
  imported_time: string;
}

// create a data record
function createData(
    document_id: string,
    username: string,
    file_name: string,
    imported_date: string,
    imported_time: string,
): Data {
    return { document_id, username, file_name, imported_date, imported_time };
}

export function useFetchAndProcessData()
{
  const [rows, setRows] = useState([]);
  const [documents, setDocuments] = useState([]);    
  
  // we stiilll loading the data fam?
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // Fetch records by user
    async function fetchData()
    {
      try 
      {
        const response = await fetch('/documents/fetch-documents-by-user', {
          method: 'GET',
          headers: {
            // Tell the server we are sending JSON data
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // IMPORTANT: Add CSRF token for web routes, or handle in headers for API
            'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
        })

        if (!response.ok)
        {
          throw new Error("HTTPS ERROR! Status: ${response.status}");
        }

        const documents = await response.json();
        setDocuments(documents);
        //console.log("DOCUMENTS: " + documents);

        if (Array.isArray(documents))
        {
          const processedRows = documents.map(item => 
          {
            // Format Date accordingly
            const importDateAndTime = new Date(item.created_at);
            const updateDateAndTime = new Date(item.updated_at);

            // Call your function with the values from each item
            return createData(
              item.id,
              item.username,
              item.file_name,
              importDateAndTime.toLocaleDateString() + ", " + importDateAndTime.toLocaleTimeString(),
              updateDateAndTime.toLocaleDateString() + ", " + updateDateAndTime.toLocaleTimeString(),
            );
          });

          setRows(processedRows);
        }
        else 
        {
          console.error("Invalid data received:", documents);
        }
      }
      catch (error)
      {
        console.error("Failed to fetch data:" + error);
      }
      finally 
      {
        setIsLoading(false);
      }
    }  

    fetchData();

  }, []);

  return { rows, isLoading }; 
};

/**
 * FUNCTION to handle viewing the CSV file!
 */
export function useHandleClickViewDocument(rowId: string)
{
  // For file path from database
  const [ filePath, setFilePath ] = useState([]);
  // FOR CSV FILE CONTENT
  const [ csvContent, setCsvContent ] = useState([]);

  // Get the document id in the MYSQL table using rowID (frontend table)
  useEffect(() => 
    {
      async function fetchRowById()
      {
        try 
        {
          const response = await fetch('/documents/fetch-file-path-by-row-id', {
            method: 'GET',
            headers: {
              // Tell the server we are sending JSON data
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              // IMPORTANT: Add CSRF token for web routes, or handle in headers for API
              'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
          },
          })

          if (!response.ok)
          {
            throw new Error("HTTPS ERROR! Status: ${response.status}");
          }

          // convert to json and send
          const filePath = await response.json();
          setFilePath(filePath);
        }
        catch (error)
        {
          console.error("Failed to fetch data:" + error);
        }
      }
    }, [rowId] // [rowId] here means this effect will rerun only when rowId changes
  );
  
  // FETCH the CSV FILE from the public folder obv
  useEffect(() => 
    {
      const loadCsvData = function() 
      {
        fetch('./' + filePath)
        .then(response => response.text())
        .then(responseText => 
          {
            setCsvContent(responseText);
          }
        )
      };
    }, [filePath] // [filePath] means this effect will rerun only when filePath changes
  );

  console.log("CSV Content Extracted: ");
  console.log(csvContent);

  // Parse CSV and send to the DataViewer react View
  Papa.parse();

  return { csvContent, filePath };
}



function DocumentHistoryTable() 
{
  // For Displaying the table - came with the react component idk what they're being used for pls forgive me onegai
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Call data process function
  const { rows, isLoading } = useFetchAndProcessData();

  if (isLoading)
  {
    return <CircularProgress />;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx = {{ backgroundColor: "gray"}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => 
              {
                const document_id = null;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {
                    columns
                    .map((column) => 
                    {
                      const value = row[column.id];
                      if (column.id === "check_result")
                      {
                        // BUTTON to check document result
                        return (
                          <TableCell key="check_result" align="center">
                            {/* () => function() makes it so that it's called when the comp/button is CLICKED */}
                            {/* function() makes it so that the function is called as soon as it's rendered */}
                            <IconButton aria-label="delete" onClick={() => useHandleClickViewDocument(row.document_id)}>
                              <ExitToAppIcon />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      else 
                      {
                        return ( 
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const ApplicationProcessData: FC = () => 
{
    return (
        <div className = "w-full p-6 mt-4 mb-3">
            {/* MAIN APPLICATION GRID */}
            <Grid container 
                spacing={4}
                justifyContent={"center"} // centers items vertically
                direction="column"  // stacks items
                alignContent={"center"} // centers items horizontally
                alignItems="center"
                sx={{ width: '100%', 
                        border: '1px solid grey'
                    }}
            >
                <Grid size = {8}>
                    <span className="text-gray-700">Upload the required files to import here.</span>
                </Grid>
                <Grid size = {8}>
                    {/* FILE UPLOAD BUTTON */}
                    <FileUploadButton />
                </Grid>
                <Grid size = {8}>
                    <span className="text-gray-700">Note: Only files of .csv type are allowed as of now</span>
                </Grid>
            </Grid>

            {/* DOC IMPORT HISTORY - TABLE  */}
            <Box sx={{ m: 6 }} />
            <Typography variant="h4" component="h4" sx={{ color:"black", }}>
                Document History
            </Typography>
            <DocumentHistoryTable />
        </div>
    );
}

export default ApplicationProcessData;