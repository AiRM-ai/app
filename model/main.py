# app.py
from fastapi import FastAPI, File, UploadFile
from io import BytesIO
import pandas as pd
from fastapi.testclient import TestClient
# import TestClient
from predict import predict # Import the function from model.py
import io

app = FastAPI()

@app.post("/model/prediction")
async def predict_from_csv(file: UploadFile = File(...)):
  
    contents = await file.read()

    buffer = BytesIO(contents)
    
    try:
        
        data_df = pd.read_csv(buffer)
        
    except pd.errors.EmptyDataError:
        return {"error": "The uploaded CSV file is empty."}
    except Exception as e:
        return {"error": f"Failed to process CSV file: {e}"}


    try:
        predictions = predict(data_df)
        
    except KeyError:
        # FIX: Update the required_cols list to accurately reflect the columns 
        # needed by predict.py (features + identifiers for output)
        required_cols = [
            'Re-Order Threshold', 
            'Total On Hand', 
            'Re-Order Turnaround Time', 
            'Re-Order Status', 
            'Stock Number', 
            'Common Name'
        ]
        return {"error": f"CSV file must contain columns: {required_cols}. Please check column names and capitalization."}

    return {
        "filename": file.filename,
        "row_count": len(data_df),
        "predictions": predictions
    }
    
client = TestClient(app)

# TESTING
'''
def test_predict_from_csv_endpoint():
  
    csv = 'C:/Users/alisa/Documents/AiRM-prediction-model/Arterial_Management_Materials_Warehouse_Inventory_20251024.csv'
  
    response = client.post("/predict-from-csv/", files={"file": ("test.csv", io.BytesIO(csv.encode()), "text/csv")})
    body = response.json()
    assert body

test_predict_from_csv_endpoint()
'''
