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
// import Papa from "papaparse"; 

// Components from resources/js/components/applicationComponents/dashboardComponents
import ApplicationTopBar from "../components/applicationComponents/dashboardComponents/ApplicationTopBar";
import TabLayout from "../components/applicationComponents/dashboardComponents/TabLayout";
import FileUploadButton from "../components/applicationComponents/dashboardComponents/FileUploadButton";

// Assuming these are external components your dashboard needs:
import ApplicationDataViewer from './ApplicationDataViewer';
import ApplicationItemList from './ApplicationItemList';

// --- INTERFACES AND DATA STRUCTURES ---

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
    // Removed format from ApplicationProcessData2.tsx as it doesn't apply to strings
  },
  {
    id: 'imported_date',
    label: 'Date Imported',
    minWidth: 170,
    align: 'center',
    // Removed format from ApplicationProcessData2.tsx
  },
  {
    id: 'imported_time',
    label: 'Updated',
    minWidth: 170,
    align: 'center',
    // Removed format from ApplicationProcessData2.tsx
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


// --- HOOKS ---

export function useFetchAndProcessData(refreshTrigger: number)
{
  // [COMMENT: Retained from ApplicationProcessData2.tsx]
  // FIX: Explicitly set the type of the 'rows' state to Data[] for better typing
  const [rows, setRows] = useState<Data[]>([]);
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
          // [COMMENT: Fixed template literal]
          throw new Error(`HTTPS ERROR! Status: ${response.status}`);
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

          // [COMMENT: Cast rows to Data[]]
          setRows(processedRows as Data[]);
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
        // console.log("Laravel Response Data: " + data); // Removed console.log
        // console.log("Laravel Response Data File Path: " + data.file_path); // Removed console.log

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

  // console.log("FILE PATH: " + filePath); // Removed console.log

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
        const url = `/storage/${filePath}`; // Adjust based on where your files live in 'public'

        // console.log("Fetching CSV content from:", url); // Removed console.log

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

  // console.log("CSV CONTENT: " + csvContent); // Removed console.log

  return { csvContent, filePath, loading };
}

// [COMMENT: Added back the UsingModel hook required for running the prediction]
function UsingModel(documentId: string | null)
{
    // The useDocumentLoader handles fetching the file content (csvContent)
    const { csvContent, filePath, loading: docLoading } = useDocumentLoader(documentId);
    
    // State for overall prediction process
    const [loading, setLoading] = useState(docLoading);
    const [predictionResult, setPredictionResult] = useState<any>(null); 

    useEffect(() => {
        // Only run prediction if content is fetched and a file path exists
        if (!csvContent || !filePath) return;
        
        const callFastApiPrediction = async (content: string, path: string) => {
            setLoading(true);
            // Extract filename from the path
            const fileName = path.split('/').pop() || 'data.csv'; 

            try {
                // Laravel proxy route that forwards the CSV data to FastAPI
                const response = await fetch('/api/predictions/fetch', { 
                    method: 'POST',
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    },
                    body: JSON.stringify({ 
                        csv_content: content, 
                        file_name: fileName   
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    setPredictionResult({ error: data.error || 'Prediction failed' });
                    return;
                }

                setPredictionResult(data);                 
            } catch (error) {
                setPredictionResult({ error: 'Network error or service unavailable.' });
            } finally {
                setLoading(false);
            }
        };

        callFastApiPrediction(csvContent, filePath);

    }, [csvContent, filePath]);

    // Keep loading state in sync with docLoading
    useEffect(() => {
        if (docLoading) {
            setLoading(true);
        }
    }, [docLoading]);
    
    return { csvContent, filePath, loading, predictionResult }; 
}

// --- HELPER COMPONENTS ---

interface DocumentHistoryTableProps
{
  refreshTrigger: number;
  // [COMMENT: Added prop to receive selected row ID from parent ApplicationProcessData]
  selectedRowId: string | null; 
  // [COMMENT: Added prop to send the selected row ID back to parent ApplicationProcessData]
  onRowSelect: (id: string) => void; 
}

interface PredictionViewProps {
    documentId: string | null;
}

function DocumentHistoryTable({ refreshTrigger, selectedRowId, onRowSelect }: DocumentHistoryTableProps) 
{
  // For Displaying the table 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Call data process function
  const { rows, isLoading } = useFetchAndProcessData(refreshTrigger);

  if (isLoading)
  {
    return <CircularProgress />;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // For viewing CSV files
  const handleViewDocumentClick = (id: string) => 
  {
    // [COMMENT: Changed from setting internal state to calling the prop handler]
    onRowSelect(id);
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
                return (
                  // [COMMENT: Added highlighting based on selectedRowId prop]
                  <TableRow 
                      hover 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={row.document_id} 
                      sx={{ backgroundColor: row.document_id === selectedRowId ? '#e0f7fa' : 'inherit' }}
                  >
                    {
                    columns
                    .map((column) => 
                    {
                      // [COMMENT: Fixed column value access]
                      const value = row[column.id as keyof Data]; 
                      
                      if (column.id === "check_result")
                      {
                        // BUTTON to check document result
                        return (
                          <TableCell key="check_result" align="center">
                            {/* Pass the document_id to the handler */}
                            <IconButton aria-label="predict" onClick={() => handleViewDocumentClick(row.document_id)}>
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

// [COMMENT: Added back PredictionView component]
function PredictionView({ documentId }: PredictionViewProps) {
    const { loading, predictionResult, filePath } = UsingModel(documentId); 

    if (!documentId) {
        return <p>Select a document from the table below to run the prediction model.</p>;
    }

    if (loading) {
        return <p>Loading data and running prediction on document **{documentId}**...</p>;
    }
    
    if (predictionResult) {
        if (predictionResult.error) {
            return (
                <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
                    <h4>❌ Prediction Failed</h4>
                    <p>File: **{filePath?.split('/').pop()}**</p>
                    <p>Error Details: {predictionResult.error}</p>
                </div>
            );
        }
        
        return (
            <div style={{ border: '1px solid green', padding: '10px' }}>
                <h4>✅ Prediction Complete!</h4>
                <p>Filename: **{predictionResult.filename}**</p>
                <p>Rows Processed: **{predictionResult.row_count}**</p>
                <pre style={{ maxHeight: '200px', overflowY: 'scroll', background: '#f4f4f4', padding: '10px' }}>
                    {JSON.stringify(predictionResult.predictions, null, 2)}
                </pre>
            </div>
        );
    }

    return <p>Ready to run model on document ID: **{documentId}**</p>;
}


// --- APPLICATION PROCESS DATA (Content for Tab 0) ---

const ApplicationProcessData: FC = () => 
{
  // [COMMENT: Retained state for file upload refresh from ApplicationProcessData2.tsx]
  const [refreshKey, setRefreshKey] = useState(0);

  // [COMMENT: Added state for document selection to trigger prediction]
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // state handler function that incremenets the key (which forces a refresh)
  const handleRefreshData = () =>
  {
    console.log("Refreshing...");
    setRefreshKey(prevKey => prevKey + 1);
  }

  // [COMMENT: Added handler for document selection]
  const handleDocumentSelection = (id: string) => {
      setSelectedDocumentId(id);
  };


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
                <Grid item>
                    <span className="text-gray-700">Upload the required files to import here.</span>
                </Grid>
                <Grid item>
                    {/* FILE UPLOAD BUTTON */}
                    <FileUploadButton 
                      onUploadSuccess = {handleRefreshData} // to refresh the table
                    />
                </Grid>
                <Grid item>
                    <span className="text-gray-700">Note: Only files of .csv type are allowed as of now</span>
                </Grid>
            </Grid>

            {/* DOC IMPORT HISTORY - TABLE  */}
            <Box sx={{ m: 6 }} />
            <Typography variant="h4" component="h4" sx={{ color:"black", }}>
                Document History
            </Typography>
            
            {/* [COMMENT: Added Prediction View component] */}
            <Box sx={{ m: 2 }} />
            <PredictionView documentId={selectedDocumentId} /> 
            <Box sx={{ m: 2 }} />

            {/* [COMMENT: Updated DocumentHistoryTable props to handle prediction state] */}
            <DocumentHistoryTable 
              refreshTrigger = {refreshKey}
              selectedRowId={selectedDocumentId}
              onRowSelect={handleDocumentSelection}
            />
        </div>
    );
}


// --- MAIN DASHBOARD COMPONENT (From original applicationDashboard.tsx) ---

const ApplicationDashboard: FC = () => 
{
    // Current Tab State
    const [tabValue, setTabValue] = useState(0);

    // Handler to switch tabs and all
    const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
        setTabValue(newValue);
    };

    // Function to decide which page to render
    const renderPage = () => {
        // console.log("TAB VALUE =" + tabValue); // Removed console.log

        switch (tabValue) {
        case 0:
            return <ApplicationProcessData />;
        case 1:
            return <ApplicationDataViewer />;
        case 2:
            return <ApplicationItemList />;
        default:
            return <ApplicationProcessData />;
        }
    };

    return (
        <div>
            {/* Application Top Bar */}
            <ApplicationTopBar tabValue={tabValue} handleTabChange={handleTabChange} />

            {/* MAIN APPLICATION GRID */}
            {/* Based on which tab is selected lol */}
            <Box>
                {renderPage()}
            </Box>
        </div>
    );
}

export default ApplicationDashboard;