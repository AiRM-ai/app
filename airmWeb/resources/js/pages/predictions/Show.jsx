import React, { useState } from 'react';
// Import your custom hook (assuming it's exported from a file)
import { UsingModel } from './path/to/UsingModelFile'; 

function PredictionView({ documentId }) {
    // 1. Call the hook, passing the ID of the document you want to predict on
    const { csvContent, loading, predictionResult } = UsingModel(documentId);

    if (loading) {
        return <p>Loading data and running prediction...</p>;
    }
    
    // 2. Display the prediction results once they are available
    if (predictionResult) {
        if (predictionResult.error) {
            return <p style={{ color: 'red' }}>Prediction Failed: {predictionResult.error}</p>;
        }
        
        // Assuming the prediction result is an array of records (your JSON output)
        return (
            <div>
                <h2>Prediction Results</h2>
                <p>Filename: {predictionResult.filename}</p>
                <p>Rows Processed: {predictionResult.row_count}</p>
                <pre>{JSON.stringify(predictionResult.predictions, null, 2)}</pre>
            </div>
        );
    }

    // This handles the state before the hook has done anything (e.g., documentId is null)
    return <p>Select a document to run predictions.</p>;
}

// Example usage:
// function App() {
//    const [selectedId, setSelectedId] = useState('123'); // Replace with actual state management
//    return <PredictionView documentId={selectedId} />;
// }