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

// Components from resources/js/components/applicationComponents/dashboardComponents
import ApplicationTopBar from "../components/applicationComponents/dashboardComponents/ApplicationTopBar";
import TabLayout from "../components/applicationComponents/dashboardComponents/TabLayout";
import FileUploadButton from "../components/applicationComponents/dashboardComponents/FileUploadButton";

interface Column {
  id: 'username' | 'file_name' | 'imported_date' | 'imported_time';
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
  username: string;
  file_name: string;
  imported_date: string;
  imported_time: string;
}

// create a data record
function createData(
    username: string,
    file_name: string,
    imported_date: string,
    imported_time: string,
): Data {
    return { username, file_name, imported_date, imported_time };
}

// TEST DATA
const rows = [
  createData('India', 'IN', "1324171354", "3287263"),
  createData('China', 'CN', "1403500365", "9596961"),
  createData('Italy', 'IT', "60483973", "301340"),
  createData('United States', 'US', "327167434", "9833520"),
  createData('Canada', 'CA', "37602103", "9984670"),
  createData('Australia', 'AU', "25475400", "7692024"),
  createData('Germany', 'DE', "83019200", "357578"),
  createData('India', 'IN', "1324171354", "3287263"),
  createData('China', 'CN', "1403500365", "9596961"),
  createData('Italy', 'IT', "60483973", "301340"),
  createData('United States', 'US', "327167434", "9833520"),
  createData('Canada', 'CA', "37602103", "9984670"),
  createData('Australia', 'AU', "25475400", "7692024"),
  createData('Germany', 'DE', "83019200", "357578"),
  createData('India', 'IN', "1324171354", "3287263"),
  createData('China', 'CN', "1403500365", "9596961"),
  createData('Italy', 'IT', "60483973", "301340"),
  createData('United States', 'US', "327167434", "9833520"),
  createData('Canada', 'CA', "37602103", "9984670"),
  createData('Australia', 'AU', "25475400", "7692024"),
  createData('Germany', 'DE', "83019200", "357578"),
  createData('India', 'IN', "1324171354", "3287263"),
  createData('China', 'CN', "1403500365", "9596961"),
  createData('Italy', 'IT', "60483973", "301340"),
  createData('United States', 'US', "327167434", "9833520"),
  createData('Canada', 'CA', "37602103", "9984670"),
  createData('Australia', 'AU', "25475400", "7692024"),
  createData('Germany', 'DE', "83019200", "357578"),
  createData('India', 'IN', "1324171354", "3287263"),
  createData('China', 'CN', "1403500365", "9596961"),
  createData('Italy', 'IT', "60483973", "301340"),
  createData('United States', 'US', "327167434", "9833520"),
  createData('Canada', 'CA', "37602103", "9984670"),
  createData('Australia', 'AU', "25475400", "7692024"),
  createData('Germany', 'DE', "83019200", "357578"),
];

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
        //console.log("DOCUMENTS: " + documents);

        if (Array.isArray(documents))
        {
          const processedRows = documents.map(item => 
          {
            //console.log("Date and time:");
            //console.log(item.created_at);
            //console.log(item.updated_at);

            const importDateAndTime = new Date(item.created_at);
            const updateDateAndTime = new Date(item.updated_at);

            // Call your function with the values from each item
            return createData(
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

function DocumentHistoryTable() 
{
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns
                    .filter(column => column.id !== 'check_result') 
                    .map((column) => {
                      const value = row[column.id];
                      return ( 
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key="check_result" align="center">
                      <IconButton aria-label="delete">
                        <ExitToAppIcon />
                      </IconButton>
                    </TableCell>
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