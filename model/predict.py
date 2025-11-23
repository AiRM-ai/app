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
    columns_to_drop = [
        'Financial Name',
        'Common Name',
        'Tracking Type',
        'Stock Number',
        'Category',
        'Object',
        'Unit Cost',
        'Unit of Measure',
        'Status',
        'Total Value',
        'Modified Date',
        'Published Date',
        'Record ID'
    ]
    # df = df.drop(columns=columns_to_drop, axis = 1)

    df['Re-Order Status'] = df['Re-Order Status'].map({'Re-Order Needed': 1, 'Not Needed': 0})
    # print(df.columns)

    features = ['Re-Order Threshold', 'Total On Hand', 'Re-Order Turnaround Time', 'Re-Order Status']

    target = ['Re-Order Threshold']

    columns_to_convert = [
    'Re-Order Threshold',
    'Total On Hand',
    'Re-Order Turnaround Time'
    ]

    for col in columns_to_convert:
    #handling non numerical data
        df[col] = pd.to_numeric(df[col], errors='coerce')
        

    df = df.dropna() #dropping empty columns 
    X = df[features]
    y = df[target]


    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = xgb.XGBRegressor(objective='reg:squarederror', 
                    n_estimators=500,  #best: 500         
                    learning_rate=0.04,   #0.04      
                    max_depth=12,             #12
                    subsample=0.8,              
                    colsample_bytree=0.8,       
                    random_state=42)

    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    # print(y_pred)
    
    
    results_df = pd.DataFrame({
        'product_id': X_test['product_id'],
        'product_category_name': X_test['product_category_name'],
        'actual_qty': y_test,
        'predicted_qty': y_pred
    })

    results_df = results_df.reset_index(drop=True)


    output_json_path = 'restock_predict_with_ids.json'


    try:
        result = results_df.to_json(output_json_path, orient='records', indent=4)
    except Exception as e:
        print(f"\n Error saving JSON file: {e}")
    
    return result
#     return y_pred
# #     mse = mean_squared_error(y_test, y_pred)
# #     print(mse) #0.09366819262504578


# # predict()