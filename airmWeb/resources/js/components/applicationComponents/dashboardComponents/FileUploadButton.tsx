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

  // I don't know why event data type is so weird - I HATE REACT I HATE TYPESCRIPT
  const handleFileChange = (event: { target: { files: any; }; }) => {
    // When files are selected, update the state
    setSelectedFiles(event.target.files);
    console.log(event.target.files); // You can still log them
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert("Please select files first!");
      return;
    }
    
    // This is where you will send the files to the server
    // (See Step 2 below)
    console.log("Uploading:", selectedFiles);

    // 1. Create a FormData object
    const formData = new FormData();

    // 2. Append each file to the FormData object
    // The key 'files[]' is important for Laravel to recognize it as an array of files
    for (let i = 0; i < selectedFiles.length; i++) 
    {
      formData.append('files[]', selectedFiles[i]);
    }

    try {
      // 3. Use fetch to send the form data to your Laravel backend
      const response = await fetch('/api/upload', { // Your Laravel API endpoint
        method: 'POST',
        body: formData,
        // Headers are often set automatically by the browser when sending FormData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Files uploaded successfully!');

    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files.');
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
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}
