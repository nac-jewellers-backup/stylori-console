import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    conatainerRow:{
        color:"#6f6f6f",
        display: "grid",
    padding: "16px 24px",
    maxHeight:" 256px",
    overflowX: "visible",
    overflowY: "scroll",
    gridColumnGap: "24px",
    gridTemplateColumns: "repeat(3, 1fr)"
    }
}));



export default function Columns(props) {
    const classes = useStyles();

    const checkboxrow = [
        "Published",
        "AVB",
        "Price",
        "Type",
        "Flavour",
        "Flavour",
        "Material",
        "Medium",
        "Shoe size",
        "Color",
        "Size",
        "Material",
        "Size",
        "Size",
        "Size",
    ]
    const lists = checkboxrow.map((head) =>
        (
            <Grid conatiner>
                <Grid item xs={4}><Checkbox
                    value="secondary"
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    value="checked"
                
                />
                    <h3 style={{ display: "inline-block", fontWeight: "500" }}>{head}</h3>
                </Grid>
            </Grid>
        )

    );

   




    return (
        <div style={{ width: "550px", height: "400px"}}>
            <Typography style={{ fontWeight: "400", color: "#6f6f6f", width: "90%", margin: "6px auto" }} className={classes.typography} variant="h5">(number) columns selected out of (total number)</Typography>
            <Grid style={{ height: "270px", borderBottom: "1px solid #6f6f6f", borderTop: "1px solid #6f6f6f", width: "95%", margin: "auto", paddingTop: "5px", paddingBottom: "10px" }}>
                <Grid conatiner>
              <Grid item   className={classes.conatainerRow}>
                   {checkboxrow.map((head) =><Grid container>
                        <Checkbox
                            value="secondary"
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            
                        />
                   <h3 style={{ display: "inline-block", fontWeight: "500" }}>{head}</h3></Grid>)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid style={{ display: "flex", justifyContent: "space-between", margin: "10px auto", width: "90%" }}>
                <Grid>
                    <Button size="large" onClick={()=>{}}>RESET</Button>
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button size="large" onClick={()=>props.columnclose()}>cancel</Button>
                    <Button style={{ backgroundColor: "#06847b", color: "white", marginLeft: "10px" }} size="large" variant="contained" className={classes.margin}>
                        SAVE
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
