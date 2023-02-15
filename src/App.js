import React, { useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import ContactDetailRenderer from './ContactDetailRenderer';
import ActioncellRenderer from './ActioncellRenderer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const App = () => {
  const rowValues = [
   {contactName: 'John Doe', contactNumber: 506050440, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'John Smith', contactNumber: 543686435, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'Smith', contactNumber: 457654326, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'Smith', contactNumber: 457654326, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'Smith', contactNumber: 457654326, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'Smith', contactNumber: 457654326, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'Smith', contactNumber: 457654326, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'Smith', contactNumber: 457654326, contactAddress: 'No 607,Main street,Dubai' },
   {contactName: 'Smith', contactNumber: 457654326, contactAddress: 'No 607,Main street,Dubai' }
  ]
 const gridRef = useRef();
 const [rowData, setRowData] = useState(rowValues);
 const [trigeredAction,setTrigeredAction] = useState("");
 const [openDialog,setOpenDialog]= useState(false);
 const [selectedCustomer,setSelectedCustomer] = useState([]);

 const ActionPerformComponent = (params) => {
  return <ActioncellRenderer params={params} setRowData={setRowData} setSelectedCustomer={setSelectedCustomer} setOpenDialog={setOpenDialog} rowData={rowData} setTrigeredAction={setTrigeredAction}/>
};

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedCustomer([]);
    setTrigeredAction("");
  };

const [columnDefs, setColumnDefs] = useState([
  {value: 'contact Name',field:'contactName' , flex:1,cellRenderer: ContactDetailRenderer,cellStyle: () => ( { display: "flex", alignItems: "center", justifyContent: 'flex-start' }) },
  {value: 'contact Number',field:'contactNumber',flex:1,cellRenderer: ContactDetailRenderer,cellStyle: () => ( { display: "flex", alignItems: "center", justifyContent: 'flex-start' })},
  {value: 'contact Address',field:'contactAddress',flex:1,cellRenderer: ContactDetailRenderer,cellStyle: () => ( { display: "flex", alignItems: "center", justifyContent: 'flex-start' })},
  {value: 'Action',field:'action',flex:1, cellRenderer: ActionPerformComponent,cellStyle: () => ( { display: "flex", alignItems: "center", justifyContent: 'flex-start' })}
]);

const viewColumnDefs = [
  {value: 'contact Name',field:'contactName' ,width:200,cellRenderer: ContactDetailRenderer },
  {value: 'contact Number',field:'contactNumber',width:200,cellRenderer: ContactDetailRenderer},
  {value: 'contact Address',field:'contactAddress',width:200,cellRenderer: ContactDetailRenderer},
];

const editChangeHandler = (event) => {
  const valueEdited = selectedCustomer[0];
  valueEdited[event.target.id] = event.target.value;
  const updatedData = [];
  updatedData.push(valueEdited);
  setSelectedCustomer([...updatedData]);
}

const updateEditedData = () => {
  const rowValue = rowData;
  rowValue.map((value)=>{
    if(value.contactName === selectedCustomer.contactName){
      value.contactName = selectedCustomer.contactName;
      value.contactNumber = selectedCustomer.contactNumber;
      value.contactAddress = selectedCustomer.contactAddress;
      return value;
    }
    return value;
  })
  setRowData([...rowValue]);
  setOpenDialog(false);
  setSelectedCustomer([]);
  setTrigeredAction("");
}

 return (
     <div className="ag-theme-alpine" style={{ height: '100vh'}}>
       <AgGridReact
           ref={gridRef}
           rowData={rowData}
           rowHeight={50}
           columnDefs={columnDefs}
           />
        <Dialog
        fullWidth={true}
        maxWidth='md'
        open={openDialog}
        onClose={handleClose}
        >
        <DialogTitle>{trigeredAction=== 'edit'? 'Edit Customer Details':'View Customer Details'}</DialogTitle>
        <DialogContent>
            {(trigeredAction === 'edit')?<div style={{ height: 100}}>
            <TextField id="contactName" onChange={(event)=>editChangeHandler(event)} value={selectedCustomer[0].contactName} label="Customer Name" variant='standard' style={{ margin: 10}}/>
            <TextField id="contactNumber" onChange={(event)=>editChangeHandler(event)} value={selectedCustomer[0].contactNumber} label="Customer Number" variant="standard" style={{ margin: 10}}/>
            <TextField id="contactAddress" onChange={(event)=>editChangeHandler(event)} value={selectedCustomer[0].contactAddress} label="Customer Address" variant="standard" style={{ margin: 10}}/>
            </div>:
            <div className="ag-theme-alpine" style={{ height: 100}}>
            <AgGridReact
           ref={gridRef}
           rowData={selectedCustomer}
           rowHeight={50}
           columnDefs={viewColumnDefs}
           />
            </div>}
        </DialogContent>
        <DialogActions>
        {(trigeredAction === 'edit')?
        <>
        <Button onClick={updateEditedData}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button></>:
        <Button onClick={handleClose}>Close</Button>
        }
          
        </DialogActions>
      </Dialog>
     </div>
 );
};

export default App;