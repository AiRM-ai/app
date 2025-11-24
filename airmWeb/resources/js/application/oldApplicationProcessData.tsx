import React, { useState, useEffect, useRef, FC, KeyboardEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
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


function Row( props: { row: ReturnType<typeof createData> })
{
  const { row } = props;

  // state to track if this state opened or nah
  const [ open, setOpen ] = useState(false);

  const { csvContent, loading } = useDocumentLoader(open ? row.document_id : null);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/* CHANGE: This is the Expand/Collapse Button Column */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
        {/* Render the rest of your columns normally */}
        {columns.map((column) => {
            const value = row[column.id];
            return (
                <TableCell key={column.id} align={column.align}>
                     {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                </TableCell>
            )
        })}
      </TableRow>

      {/* CHANGE: The Expanded Row Section */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Check Result (CSV Content)
              </Typography>
              
              {/* Display CSV Content */}
              <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 1, maxHeight: '300px', overflow: 'auto' }}>
                 {loading ? (
                    <CircularProgress size={20} />
                 ) : (
                    <pre style={{ margin: 0, fontSize: '0.8rem' }}>
                        {csvContent || "No content loaded."}
                    </pre>
                 )}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
} 


// useFetchAndProcessData
/**
 * called use cuz react is weird, wants me to name the custom hook starting with use
 * 
 * @param refreshTrigger to see if the table needs a refresh or not
 * @returns 
 */
export function useFetchAndProcessData(refreshTrigger: number)
{
  const [rows, setRows] = useState([]);
  const [documents, setDocuments] = useState([]);    
  
  // we stiilll loading the data fam?
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // Fetch records by user
    async function fetchData()
    {
      // Reset loading to true when a refresh occurs
      setIsLoading(true);

      try 
      {
        const response = await fetch('api/documents/fetch-documents-by-user', {
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

    // whenever refreshTrigger changes, the use effect runs again!
  }, [refreshTrigger]);

  return { rows, isLoading }; 
};

/**
 * FUNCTION to handle viewing the CSV file!
 */
export function useDocumentLoader(rowId: string | null) 
{
  const [filePath, setFilePath] = useState<string | null>(null);
  const [csvContent, setCsvContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch the File Path when rowId changes
  useEffect(() =>
    {
    // Don't run if there is no rowId selected
    if (!rowId) return;

    async function fetchFilePathById() 
    {
      setLoading(true);
      try 
      {
        // Pass rowId in the URL, and not THE body, because it is a GET request
        const response = await fetch(`/api/documents/fetch-file-path-by-id?id=${rowId}`, {
          method: 'GET',
          headers: 
          {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
          },
        });

        if (!response.ok)
        {
          throw new Error(`HTTPS ERROR! Status: ${response.status}`);
        } 

        const data = await response.json();
        console.log("Laravel Response Data: " + data);
        console.log("Laravel Response Data File Path: " + data.file_path);

        const pathString = data.file_path || data; 

        // Assuming the API returns { path: "some/path.csv" } or similar
        setFilePath(pathString); 
      } 
      catch (error) 
      {
        console.error("Failed to fetch file path:", error);
      }
    }

    fetchFilePathById(); 

  }, [rowId]);

  console.log("FILE PATH: " + filePath);

  // Fetch the CSV content ONLY when filePath changes
  useEffect(() => 
  {
    if (!filePath || filePath.length === 0)
    {
      return; 
    } 

    const loadCsvData = function() 
    {
        // Ensure we construct the URL correctly
        // If filePath already contains "uploads/", don't add it again.
        // If it's just the filename, add the folder.
        // 
        const url = `/storage/${filePath}`; // Adjust based on where your files live in 'public'

        console.log("Fetching CSV content from:", url);

        fetch(url)
        .then(response => response.text())
        .then(responseText => {
          //console.log("RESPONSE TEXT: " + responseText);
          setCsvContent(responseText);
          setLoading(false); // Done loading
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    };

    loadCsvData(); 

  }, [filePath]);

  console.log("CSV CONTENT: " + csvContent);

  return { csvContent, filePath, loading };
}

// interface for props to accept the refreshTrigger
// pass these to the DocumentHistoryTable function
interface DocumentHistoryTableProps
{
  refreshTrigger: number;
}

function DocumentHistoryTable({ refreshTrigger }: DocumentHistoryTableProps ) 
{
  // Remember to call hooks only at the top level components
  // For Displaying the table - came with the react component idk what they're being used for pls forgive me onegai
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // State to track which row the user clicked
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  // It will sit waiting. It won't fetch anything until selectedRowId is set.
  const { csvContent, loading } = useDocumentLoader(selectedRowId);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Call data process function
  const { rows, isLoading } = useFetchAndProcessData(refreshTrigger);

  if (isLoading)
  {
    return <CircularProgress />;
  }

  // For viewing CSV files
  const handleViewDocumentClick = (id: string) => 
  {
    setSelectedRowId(id);
  };

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
                            <IconButton aria-label="view-document" onClick={() => handleViewDocumentClick(row.document_id)}>
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
  // created state to track the updates
  const [refreshKey, setRefreshKey] = useState(0);

  // state handler function that incremenets the key (which forces a refresh)
  const handleRefreshData = () =>
  {
    console.log("Refreshing...");
    setRefreshKey(prevKey => prevKey + 1);
  }

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
                    <FileUploadButton 
                      onUploadSuccess = {handleRefreshData} // to refresh the table
                    />
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
            <DocumentHistoryTable 
              refreshTrigger = {refreshKey}
            />
        </div> 
    );
}

export default ApplicationProcessData;