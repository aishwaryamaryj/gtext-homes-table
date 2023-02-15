import React from 'react';
import Button from '@mui/material/Button';
const ActioncellRenderer = (props) => {
    const {setTrigeredAction,setOpenDialog,setSelectedCustomer} =props;

    const rowEditOrViewAction = (preferedAction)=> {
        const selectedValue = [];
        selectedValue.push(props.params.data);
        setSelectedCustomer([...selectedValue]);
        setTrigeredAction(preferedAction);
        setOpenDialog(true);
    };

    const deleteAction = ()=> {
        const rowValue = props.rowData;
        let index = rowValue.findIndex((item) => {
            return item.contactName === props.params.data.contactName;
        });
        if(index>=0){
            rowValue.splice(index,1);
            props.setRowData([...rowValue]);
        }
    };
      

 return (
     <div>
       <Button variant="contained" style={{marginRight: 10}} onClick={()=>{rowEditOrViewAction('edit')}}>Edit</Button>
       <Button variant="contained" style={{marginRight: 10}} onClick={()=>{deleteAction()}}>Delete</Button>
       <Button variant="contained" onClick={()=>{rowEditOrViewAction('view')}}>View</Button>
     </div>
 );
};

export default ActioncellRenderer;