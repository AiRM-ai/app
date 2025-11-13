import * as React from 'react';
import { useState } from 'react';
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
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Button } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function AddItemInputForm({ open, handleClose }) 
{
    const addItemToDatabase = async (formData: any) => {
      try 
      {
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
        alert('Error: Could add the item.');
      }
  };

  // FOR FORM DATA + verification if all required fields are there or not
  const [formData, setFormData] = useState({
    item_name: '',
    item_description: '',
    item_price: '',
    item_stock: '',
    item_currency: 'JPY',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific error for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.item_name = formData.item_name ? '' : 'This field is required.';
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
    formData.item_stock = '';
    formData.item_price = '';
    formData.item_currency = 'JPY';

  }

  // FORM SUBMISSION!!--->
  const handleSubmit = () => {
    if (validate()) 
    {
      // Proceed with form submission logic
      console.log('Item Added Successfully:', formData);
      addItemToDatabase(formData);
      handleClose(); // Close the dialog
      clearForm();
    }
  };

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

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
export default function CollapsibleTable() 
{
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
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