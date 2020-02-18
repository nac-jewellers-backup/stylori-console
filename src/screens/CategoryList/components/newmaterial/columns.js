import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './table.css'



const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    conatainerRow:{
        width:"300px",
        color:"#6f6f6f",
        display: "grid",
    padding: "16px 24px",
    maxHeight:" 256px",
    fontSize:"9px",
    overflowX: "visible",
    overflowY: "scroll",
    gridColumnGap: "24px",
    gridTemplateColumns: "repeat(2, 1fr)",

    [theme.breakpoints.up("sm")]: {
        width:"500px",
        color:"#6f6f6f",
        display: "grid",
    padding: "16px 24px",
    maxHeight:" 270px",
    fontSize:"14px",
    overflowX: "visible",
    overflowY: "scroll",
    gridColumnGap: "20px",
    gridTemplateColumns: "repeat(3, 1fr)"
    }

    }
}));



export default function Columns(props) {
    const classes = useStyles();

    const checkboxrow = [
        {
            id:1,
            name:"Published",
            isActive: false,       
        },
        {
            id:2,
            name:"AVB",
            isActive:false,      
        },
        {
            id:3,
            name:"Price",
            isActive: false,       
        },
        {
            id:4,
            name:"Type",
            isActive:  false,      
        },
        {
            id:5,
            name:"Flavour",
            isActive: false ,     
        },
        {
            id:6,
            name:"Flavour",
            isActive:false,        
        },
        {
            id:7,
            name: "Material",
            isActive:false,        
        },
        {
            id:8,
            name:"Medium",
            isActive:false,        
        },
        {
            id:9,
            name:"Shoe size",
            isActive:false,        
        },
        {
            id:10,
            name:"Shoe size",
            isActive:false,        
        },
        {
            id:11,
            name:"Shoe size",
            isActive:false,        
        },
        {
            id:12,
            name:"Shoe size",
            isActive:false,        
        },
        {
            id:13,
            name:"Shoe size",
            isActive:false,        
        },
        {
            id:14,
            name:"Shoe size",
            isActive:false,        
        },
        {
            id:15,
            name:"Shoe size",
            isActive:false,        
        }
        
        
        
        
        
    ]
    const [columns,setColumns ] = React.useState({
        listOfValue:checkboxrow
    })
    function stateChange(id){
        let listOfValue = columns.listOfValue.map((data,index)=>{
            if(id===data.id){
                data.isActive = data.isActive?false:true;
            }
            return data;
        })
        setColumns({
            listOfValue
        })
    }
    function resetButton(){
        let listOfValue = columns.listOfValue.map((data,index)=>{
                data.isActive = false;
            
            return data;
        })
        setColumns({
            listOfValue
        })
    }
    // const lists = columns.listOfValue.map((head) =>
    //     (
    //         <Grid conatiner>
    //             <Grid item xs={4}><Checkbox
    //                 value="secondary"
    //                 color="primary"
    //                 inputProps={{ 'aria-label': 'secondary checkbox' }}
    //                 checked = {head.isActive}
    //                 onChange = {()=>stateChange(head.id)}
                
    //             />
    //                 <h3 style={{ display: "inline-block", fontWeight: "500" }}>{head}</h3>
    //             </Grid>
    //         </Grid>
    //     )

    // );

   




    return (
        
         <div style={{ maxHeight: "420px"}}>
            <Typography style={{ fontWeight: "400", color: "#6f6f6f", width: "90%", margin: "6px auto" }} className={classes.typography} variant="h5">(number) columns selected out of (total number)</Typography>
            <Grid style={{ height: "270px", borderBottom: "1px solid #6f6f6f", borderTop: "1px solid #6f6f6f", width: "95%", margin: "auto", paddingTop: "5px", paddingBottom: "10px" }}>
                <Grid conatiner>
              <Grid item   className={classes.conatainerRow}>
                   {columns.listOfValue.map((head) =><Grid container>
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                               checked = {head.isActive}
                    onChange = {()=>stateChange(head.id)}
                            
                        />
                   <h3 style={{fontWeight: "500" }}>{head.name}</h3></Grid>)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid style={{ display: "flex", justifyContent: "space-between", margin: "10px auto", width: "90%" }}>
                <Grid>
                    <Button size="large" onClick={()=>resetButton()}>RESET</Button>
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button size="large" onClick={()=>props.columnclose()}>cancel</Button>
                    <Button color="primary" backgroundColor="secondary" size="large" variant="contained" className={classes.margin}>
                        SAVE
                    </Button>
                </Grid>
            </Grid>
        </div>
        
    );
}
