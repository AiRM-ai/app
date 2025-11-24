import React, { useState, useEffect, FC, ChangeEvent } from 'react';
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
import { Typography, Button, Input, CircularProgress, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// For CSV Parsing (Kept for completeness, though not directly used in this file's logic)
// import Papa from "papaparse"; 

// Components from resources/js/components/applicationComponents/dashboardComponents
import ApplicationTopBar from "../components/applicationComponents/dashboardComponents/ApplicationTopBar";
import TabLayout from "../components/applicationComponents/dashboardComponents/TabLayout";

// [COMMENT: REMOVED external import for FileUploadButton]
// import FileUploadButton from "../components/applicationComponents/dashboardComponents/FileUploadButton";

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
  },
  {
    id: 'imported_date',
    label: 'Date Imported',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'imported_time',
    label: 'Updated',
    minWidth: 170,
    align: 'center',
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
  const [rows, setRows] = useState<Data[]>([]);
  const [documents, setDocuments] = useState([]);    
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function fetchData()
    {
      setIsLoading(true);

      try 
      {
        const response = await fetch('api/documents/fetch-documents-by-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
        })

        if (!response.ok)
        {
          throw new Error(`HTTPS ERROR! Status: ${response.status}`);
        }

        const documents = await response.json();
        setDocuments(documents);

        if (Array.isArray(documents))
        {
          const processedRows = documents.map(item => 
          {
            const importDateAndTime = new Date(item.created_at);
            const updateDateAndTime = new Date(item.updated_at);

            return createData(
              item.id,
              item.username,
              item.file_name,
              importDateAndTime.toLocaleDateString() + ", " + importDateAndTime.toLocaleTimeString(),
              updateDateAndTime.toLocaleDateString() + ", " + updateDateAndTime.toLocaleTimeString(),
            );
          });

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

  }, [refreshTrigger]);

  return { rows, isLoading }; 
};

export function useDocumentLoader(rowId: string | null) 
{
  const [filePath, setFilePath] = useState<string | null>(null);
  const [csvContent, setCsvContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>
    {
    if (!rowId) return;

    async function fetchFilePathById() 
    {
      setLoading(true);
      try 
      {
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
        const pathString = data.file_path || data; 

        setFilePath(pathString); 
      } 
      catch (error) 
      {
        console.error("Failed to fetch file path:", error);
      }
    }

    fetchFilePathById(); 

  }, [rowId]);

  useEffect(() => 
  {
    if (!filePath || filePath.length === 0)
    {
      return; 
    } 

    const loadCsvData = function() 
    {
        const url = `/storage/${filePath}`; 

        fetch(url)
        .then(response => response.text())
        .then(responseText => {
          setCsvContent(responseText);
          setLoading(false); 
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    };

    loadCsvData(); 

  }, [filePath]);

  return { csvContent, filePath, loading };
}

function UsingModel(documentId: string | null)
{
    const { csvContent, filePath, loading: docLoading } = useDocumentLoader(documentId);
    
    const [loading, setLoading] = useState(docLoading);
    const [predictionResult, setPredictionResult] = useState<any>(null); 

    useEffect(() => {
        if (!csvContent || !filePath) return;
        
        const callFastApiPrediction = async (content: string, path: string) => 
        {
            setLoading(true);
            const fileName = path.split('/').pop() || 'data.csv'; 

            try {
                const response = await fetch('/predictions/fetch', { 
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

    useEffect(() => {
        if (docLoading) {
            setLoading(true);
        }
    }, [docLoading]);
    
    return { csvContent, filePath, loading, predictionResult }; 
}

// --- LOCAL FILE UPLOAD BUTTON COMPONENT (NEW IMPLEMENTATION WITH STATUS) ---

interface LocalFileUploadButtonProps {
    onUploadSuccess: () => void;
}

const LocalFileUploadButton: FC<LocalFileUploadButtonProps> = ({ onUploadSuccess }) => {
    // [COMMENT: State for selected file, upload status, and messages]
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile && selectedFile.name.endsWith('.csv')) {
            setFile(selectedFile);
            setStatus('idle');
            setStatusMessage(`Ready to upload: ${selectedFile.name}`);
        } else {
            setFile(null);
            setStatus('error');
            setStatusMessage('Error: Please select a valid .csv file.');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('error');
            setStatusMessage('No file selected.');
            return;
        }

        setStatus('loading');
        setUploading(true);
        setStatusMessage(`Uploading ${file.name}...`);

        const formData = new FormData();
        // IMPORTANT: The key 'csv_file' must match the expected input name on your Laravel backend route
        formData.append('csv_file', file);

        try {
            // [COMMENT: Targeting the Laravel upload endpoint]
            const response = await fetch('/api/documents/upload', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    // Note: 'Content-Type': 'multipart/form-data' is NOT set here.
                    // The browser automatically sets it when sending FormData, including the correct boundary.
                },
                body: formData,
            });

            const responseData = await response.json();

            if (!response.ok) {
                setStatus('error');
                setStatusMessage(`Upload failed: ${responseData.message || 'Server error'}`);
                return;
            }

            setStatus('success');
            setStatusMessage('File uploaded successfully! Table updating...');
            onUploadSuccess(); // Trigger table refresh
        } catch (error) {
            setStatus('error');
            setStatusMessage('Network error. Could not connect to the upload service.');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
            // Clear status after a short delay for better UX
            setTimeout(() => setStatus('idle'), 3000); 
        }
    };

    // Helper component to display the status
    const StatusDisplay = () => {
        if (status === 'loading') {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography color="primary">{statusMessage}</Typography>
                </Box>
            );
        }
        if (status === 'error') {
            return <Alert severity="error">{statusMessage}</Alert>;
        }
        if (status === 'success') {
            return <Alert severity="success">{statusMessage}</Alert>;
        }
        if (file && status === 'idle') {
            return <Typography color="textSecondary">{statusMessage}</Typography>;
        }
        return null;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <label htmlFor="csv-upload-button">
                    <Input
                        accept=".csv"
                        id="csv-upload-button"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <Button variant="contained" component="span" disabled={uploading}>
                        {file ? 'Change File' : 'Select CSV File'}
                    </Button>
                </label>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleUpload} 
                    disabled={!file || uploading || status === 'error'}
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </Box>
            <StatusDisplay />
        </Box>
    );
};

// --- HELPER COMPONENTS (DocumentHistoryTable and PredictionView remain unchanged) ---

interface DocumentHistoryTableProps
{
  refreshTrigger: number;
  selectedRowId: string | null; 
  onRowSelect: (id: string) => void; 
}

interface PredictionViewProps {
    documentId: string | null;
}

function DocumentHistoryTable({ refreshTrigger, selectedRowId, onRowSelect }: DocumentHistoryTableProps) 
{
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleViewDocumentClick = (id: string) => 
  {
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
                      const value = row[column.id as keyof Data]; 
                      
                      if (column.id === "check_result")
                      {
                        return (
                          <TableCell key="check_result" align="center">
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
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const handleRefreshData = () =>
  {
    console.log("Refreshing Document History Table...");
    setRefreshKey(prevKey => prevKey + 1);
  }

  const handleDocumentSelection = (id: string) => {
      setSelectedDocumentId(id);
  };


    return (
        <div className = "w-full p-6 mt-4 mb-3">
            {/* MAIN APPLICATION GRID: FILE UPLOAD SECTION */}
            <Grid container 
                spacing={4}
                justifyContent={"center"} 
                direction="column"  
                alignContent={"center"} 
                alignItems="center"
                sx={{ width: '100%', 
                        border: '1px solid grey'
                    }}
            >
                <Grid size = {8}>
                    <span className="text-gray-700">Upload the required files to import here.</span>
                </Grid>
                <Grid>
                    {/* FILE UPLOAD BUTTON (Now using the local implementation with status) */}
                    <LocalFileUploadButton 
                      onUploadSuccess = {handleRefreshData} 
                    />
                </Grid>
                <Grid>
                    <span className="text-gray-700">Note: Only files of .csv type are allowed as of now</span>
                </Grid>
            </Grid>

            {/* DOC IMPORT HISTORY - TABLE  */}
            <Box sx={{ m: 6 }} />
            <Typography variant="h4" component="h4" sx={{ color:"black", }}>
                Document History
            </Typography>
            
            {/* PREDICTION VIEW */}
            <Box sx={{ m: 2 }} />
            <PredictionView documentId={selectedDocumentId} /> 
            <Box sx={{ m: 2 }} />

            {/* DOCUMENT HISTORY TABLE */}
            <DocumentHistoryTable 
              refreshTrigger = {refreshKey}
              selectedRowId={selectedDocumentId}
              onRowSelect={handleDocumentSelection}
            />
        </div>
    );
}


export default ApplicationProcessData;