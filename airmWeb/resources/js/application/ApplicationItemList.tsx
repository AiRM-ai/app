import * as React from 'react';
import { useState, useEffect, useRef, FC, KeyboardEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Dialog, DialogContent, DialogTitle, DialogActions, CircularProgress } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 

function AddItemInputForm({ open, handleClose }) 
{
    const addItemToDatabase = async (formData: any) => {
      try 
      {
        console.log(formData);

        // Use fetch to send a POST request to our new Laravel endpoint (in web.php)
        const response = await fetch('/data/add-item', {
          method: 'POST',
          headers: {
            // Tell the server we are sending JSON data
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // IMPORTANT: Add CSRF token for web routes, or handle in headers for API
            'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
          },
          body: JSON.stringify(formData), // Convert the JS object to a JSON string
        });

        if (!response.ok) 
        {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add item.');
        }

        const result = await response.json();
        console.log('Success:', result.message);
        alert('Added Item Successfully!!');

      } 
      catch (error) 
      {
        console.error('Error adding item:', error);
        alert('Error: Could not add the item.');
      }
  };

  // FOR FORM DATA + verification if all required fields are there or not
  const [formData, setFormData] = useState({
    item_name: '',
    item_description: '',
    item_category: '',
    item_price: '',
    item_stock: '',
    item_currency: 'JPY',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => 
    {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific error for the field being edited
    if (errors[name]) 
    {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => 
  {
    let tempErrors = {};
    tempErrors.item_name = formData.item_name ? '' : 'This field is required.';
    tempErrors.item_category = formData.item_category ? '' : 'This field is required.';
    tempErrors.item_price = formData.item_price ? '' : 'This field is required.';
    tempErrors.item_stock = formData.item_stock ? '' : 'This field is required.';
    setErrors(tempErrors);

    // This checks if all the values in the tempErrors object are empty strings
    return Object.values(tempErrors).every((x) => x === '');
  };

  // Clear form after submission
  const clearForm = () =>
  {
    formData.item_name = '';
    formData.item_description = '';
    formData.item_category = '';
    formData.item_stock = '';
    formData.item_price = '';
    formData.item_currency = 'JPY';
  }

  // FORM SUBMISSION!!--->
  const handleSubmit = () => 
  {
    if (validate()) 
    {
      // Proceed with form submission logic
      console.log('Item Added Successfully:', formData);
      addItemToDatabase(formData);
      handleClose(); // Close the dialog
      clearForm();
    }
  };

  // FOR all the possible currencies
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, flexDirection: "row" }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              value={formData.item_name}
              onChange={handleChange}
              error={!!errors.item_name} // The `!!` converts the string to a boolean
              helperText={errors.item_name}
              name="item_name"
              id="item_name"
              label="Item Name"
              variant="filled"
            />
            <TextField
              value={formData.item_description}
              onChange={handleChange}
              name="item_description"
              id="item_description"
              label="Item Description"
              variant="filled"
            />
            <TextField
              required
              value={formData.item_category}
              onChange={handleChange}
              error={!!errors.item_category} // The `!!` converts the string to a boolean
              helperText={errors.item_category}
              name="item_category"
              id="item_category"
              label="Item Category"
              variant="filled"
            />
            <TextField
              value={formData.item_price}
              onChange={handleChange}
              error={!!errors.item_price} // The `!!` converts the string to a boolean
              helperText={errors.item_price}
              name = "item_price"
              id="item_price"
              label="Item Price"
              variant="filled"
              type="number"
            />
            <TextField
              value={formData.item_stock}
              onChange={handleChange}
              error={!!errors.item_stock} // The `!!` converts the string to a boolean
              helperText={errors.item_stock}
              name="item_stock"
              id="item_stock"
              label="Item Stock"
              variant="filled"
              type="number"
              slotProps = {{ htmlInput: {step: 1,}, }}
            />
            <TextField
              select
              value={formData.item_currency}
              onChange={handleChange}
              name="item_currency"
              id="item_currency"
              label="Select Item Currency"
              helperText="Please select your item's currency"
              variant="filled"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

function Row(props: { row: ReturnType<typeof createData>, onDelete: (id: string) => void }) 
{
  const { row, onDelete } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.item_name}
        </TableCell>
        <TableCell align="right">{row.item_category}</TableCell>
        <TableCell align="right">{row.item_stock}</TableCell>
        <TableCell align="right">{row.item_price}</TableCell>
        <TableCell align="right">{row.item_currency}</TableCell>
        <TableCell align="center">
            <IconButton 
                aria-label="delete-item" 
                color="error" // Makes it red
                onClick = {() => onDelete(row.item_id)}
            >
                <DeleteIcon />
            </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Item Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="left">{row.item_description}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// FUNCTION to create a data item
function createData(
  item_name: string,
  item_description: string,
  item_category: string,
  item_stock: number,
  item_price: number,
  item_currency: string,
  item_id: string,
) {
  return {
    item_name,
    item_description,
    item_category,
    item_stock,
    item_price,
    item_currency,
    item_id,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 2,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

// TEST DATA
const rows = [
  createData('Frozen yoghurt', "Greek yogurt that's forzen", "yogrutt", 24, 4.0, "DIN", "1"),
  createData('Ice cream sandwich', "237", "ts", 37, 4.3, "EUR", "2"),
  createData('Eclair', "262", "pmo", 24, 6.0, "JPY", "3"),
  createData('Cupcake', "305", "icl", 67, 4.3, "USD", "4"),
  createData('Gingerbread', "356", "fam", 49, 3.9, "INR", "5"),
];


// FUNCTION TO GET DATA FROM THE DATABASE/BACKEND

export function useFetchAndProcessData()
{
  const [rows, setRows] = useState([]);
  const [documents, setDocuments] = useState([]);    
  
  // we stiilll loading the data fam?
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => 
  {

    // Fetch records by user
    async function fetchData()
    {
      try 
      {
        const response = await fetch('/data/get-items-by-user', 
        {
          method: 'GET',
          headers: 
          {
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

        const items = await response.json();
        console.log("ITEMS: " + items);

        if (Array.isArray(items))
        {
          const processedRows = items.map(item => 
          {
            // Call your function with the values from each item
            return createData(
              item.item_name,
              item.item_description,
              item.item_category,
              item.item_stock,
              item.item_price,
              item.item_currency,
              item.id, //ensure it exists even in the sql db
            );
          });

          setRows(processedRows);
        }
        else 
        {
          console.error("Invalid data received:", items);
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

  // i'm returning setRows as well so we can delete items
  return { rows, isLoading, setRows }; 
};


// Function to show the actual table
export default function CollapsibleTable() 
{
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => 
  {
    setOpen(true);
  };

  const handleClose = () => 
  {
    setOpen(false);
  };

  // For deleting item
  //// Old= const handleDeleteItemClick = (id: string) => 
  async function handleDeleteItemClick(id: string)
  {
    if(confirm("Are you sure you want to delete this item?")) 
    {
        console.log("Deleting item with ID:", id);
        
        // TODO: Call your API here to delete
        // await fetch('/data/delete-item', { method: 'POST', body: JSON.stringify({ id }) ... });
        try 
        {
          const response = await fetch("/data/delete-item", {
            method: "POST",
            headers:
            {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
            body: JSON.stringify({ id: id }),
          });

          if (!response.ok)
          {
            throw new Error(`HTTPS ERROR! Status: ${response.status}`);
          }

          const data = await response.json();

          
          // 201 means success, check controller
          if (response.status === 201 || response.status === 200)
          {
            alert("Item deleted successfully!");
          }
          else
          {
            alert("Error occurred while trying to delete item.");
          }

        }
        catch (error)
        {
          console.error("An error occurred while trying to delete an item: " + error);
          alert("Error occurred while trying to delete item.");
        }
    }
  };

  // Call data process function
  const { rows, isLoading } = useFetchAndProcessData();

  if (isLoading)
  {
    return <CircularProgress />;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Item Name</TableCell>
              <TableCell align="right">Item Category</TableCell>
              <TableCell align="right">Item Stock</TableCell>
              <TableCell align="right">Item Price</TableCell>
              <TableCell align="right">Item Currency</TableCell>
              <TableCell align="center">Delete Item</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.map((row) => (
                <Row 
                  key={row.name} 
                  row={row}
                  onDelete = {handleDeleteItemClick}
                />
                // <Row key={row.name} row={row} onclick={handleDeleteItem} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* FLOATING ACTION BUTTON FOR INPUT (ADDING ITEM) */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      <AddItemInputForm open={open} handleClose={handleClose} />
    </div>
  );
}