import xgboost as xgb
from sklearn.model_selection import train_test_split
import pandas as pd 
from sklearn.multioutput import MultiOutputRegressor
import numpy as np
from sklearn.metrics import mean_squared_error

#reorder threshold: the minimum stock level of an item
# that triggers a new order to be placed with a supplier
#reorder turnaround time: the time it takes for an order to be placed, processed, and received
def predict(df):
    # df = pd.read_csv('C:/Users/alisa/Documents/AiRM-prediction-model/Arterial_Management_Materials_Warehouse_Inventory_20251024.csv', delimiter=',')
    print(df.head(10))
    df.columns = df.columns.str.strip()
    print("Current DataFrame Columns:")
    print(df.columns.tolist())
    
  
    df['Re-Order Status'] = df['Re-Order Status'].map({'Re-Order Needed': 1, 'Not Needed': 0})

    model_features = ['Re-Order Threshold', 'Total On Hand', 'Re-Order Turnaround Time', 'Re-Order Status']
    # Target 
    target = ['Re-Order Threshold']
    
  
    columns_to_convert = [
        'Re-Order Threshold',
        'Total On Hand',
        'Re-Order Turnaround Time'
    ]

    for col in columns_to_convert:
        # handling non numerical data
        df[col] = pd.to_numeric(df[col], errors='coerce')
        
    df = df.dropna(subset=model_features + target) 

    try:
        X_data = df.copy()
     
        identifiers = X_data[['Stock Number', 'Common Name']] 
    except KeyError as e:
        print(f"Error: Identifier column missing from data: {e}")
    
        X_data = df
        identifiers = df.index.to_frame(name='index')

  
    X = X_data[model_features]
    y = X_data[target]

   
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    

    model = xgb.XGBRegressor(objective='reg:squarederror', 
                    n_estimators=500,        
                    learning_rate=0.04,  
                    max_depth=12,            
                    subsample=0.8,              
                    colsample_bytree=0.8,       
                    random_state=42)

    model.fit(X_train, y_train)
    #y_pred = model.predict(X_test)
    y_pred = model.predict(X)
    

    #test_identifiers = identifiers.loc[X_test.index]
    final_identifiers = identifiers

    '''
    results_df = pd.DataFrame({
    
        'Stock_Number': test_identifiers['Stock Number'] if 'Stock Number' in test_identifiers.columns else X_test.index,
        'Common_Name': test_identifiers['Common Name'] if 'Common Name' in test_identifiers.columns else '',
        
        #'Actual_Reorder_Threshold': y_test.iloc[:, 0].values, # Use .values to match y_pred shape
        'Predicted_Reorder_Threshold': y_pred
    })'''

    results_df = pd.DataFrame({
    
        # --- CHANGE 3: Update columns to use the full dataset variables ---
        # We use 'final_identifiers' instead of 'test_identifiers'
        # We use 'y' (full targets) instead of 'y_test'
        
        'Stock_Number': final_identifiers['Stock Number'] if 'Stock Number' in final_identifiers.columns else X.index,
        'Common_Name': final_identifiers['Common Name'] if 'Common Name' in final_identifiers.columns else '',
        
        'Actual_Reorder_Threshold': y.iloc[:, 0].values, 
        'Predicted_Reorder_Threshold': y_pred
    })

    results_df = results_df.reset_index(drop=True)

    output_json_path = 'restock_predict_with_ids.json'

    try:
        result_json = results_df.to_json(output_json_path, orient='records', indent=4)
        print(f"Prediction results saved to {output_json_path}")
    except Exception as e:
        print(f"\n Error saving JSON file: {e}")
 
        result_json = results_df.to_json(orient='records', indent=4) 

    # gives fastAPI a list object that it will send to react
    result_data = results_df.to_dict(orient='records')
    

    return result_data      