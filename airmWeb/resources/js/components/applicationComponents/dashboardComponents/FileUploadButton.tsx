import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  // Create a state to hold the selected files
  const [selectedFiles, setSelectedFiles] = useState<string[] | any>(null);

  /**
   * This function is called by handleFileChange.
   * Sends the filename to your Laravel backend.
   * 
   * The file will be posted to routes/api.php
   * 
   * Check the routes in routes/api.php
   */
  const saveDocumentMetadata = async (fileName: string) => {
    try {
      // The data we want to send, formatted as a JavaScript object
      const documentData = {
        file: fileName,
      };

      // Use fetch to send a POST request to our new Laravel endpoint
      const response = await fetch('/documents/save-metadata', {
        method: 'POST',
        headers: {
          // Tell the server we are sending JSON data
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // IMPORTANT: Add CSRF token for web routes, or handle in headers for API
          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
        body: JSON.stringify(documentData), // Convert the JS object to a JSON string
      });

      if (!response.ok) 
      {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save document metadata.');
      }

      const result = await response.json();
      console.log('Success:', result.message);
      alert('Document record saved!');

    } 
    catch (error) 
    {
      console.error('Error saving document:', error);
      alert('Error: Could not save the document record.');
    }
  };

  /**
   * handleFileChange runs when a file is uploaded
   * 
   * I don't know why event data type is so weird - I HATE REACT I HATE TYPESCRIPT
   * @param event 
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    const files = event.target.files;
    setSelectedFiles(event.target.files);
    console.log(event.target.files); // You can still log them

    if (files && files.length > 0) 
    {
      // We'll just process the first file for this example
      const firstFile = files[0];
      console.log('File selected:', firstFile.name);

      // Immediately call the function to save the metadata to the backend
      saveDocumentMetadata(firstFile.name);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        accept=".csv, text/csv"
        onChange={handleFileChange}
        multiple
      />
    </Button>
  );
}
