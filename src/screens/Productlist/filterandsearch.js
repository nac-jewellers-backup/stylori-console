import React from 'react';
import { Form, Grid,Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {

  Chip

} from '@material-ui/core';




const useStyless = makeStyles(theme => ({
  button: {
    color: "#06847B",
    border: "1px solid #7bbcb7",
    '&:hover': {
      backgroundColor: "rgba(6, 132, 123, 0.1)",
      border: "1px solid #06847B",
    }
  },
}));


const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
 

}));

const options = [
  "Show some love to Material-UI",
  "Show all notification content",
  "Hide sensitive notification content",
  "Hide all notification content"
];

export default function FormPropsTextFields(props) {
  const classess = useStyless();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchtext, setSearchtext] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [producttype, setProducttype] = React.useState("");

  // const handleinputChange =type => e => {
  // props.searchproduct(e.target.value)
  // }
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleinputChange =type => e => {
    setSearchtext(e.target.value)
  }
  const handlecategoryChange = type => (event, value) => {
    setCategory( value.name)
    props.applyfilter(searchtext, value.name, producttype)

}
const handletypeChange = type => (event, value) => {
  setProducttype(value.name)
  props.applyfilter(searchtext, category, value.name  )

}
  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
   function applyfilter() {
     props.applyfilter(searchtext, category, producttype)
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className="search" style={{ display: "flex", justifyContent: "space-around", background: "white", borderTop: "1px solid #e4e4e4", borderBottom: "1px solid #e4e4e4" }}>
      <Grid lg={3} md={3} sm={3}  >
      <Autocomplete
                      
                      fullWidth
                      id="free-solo-2-demo"
                      style={{ margin: "auto",marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
                      className={classes.fixedTag}
                      getOptionLabel={option => option.name}
                      options={props.mastercategory}
                      onChange={handlecategoryChange('product_category')}

                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Filter By Product Category"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, readOnly: true, type: 'search' }}
                      />
                      )}
                      />
      </Grid>
      <Grid lg={3} md={3} sm={3} >

      <Autocomplete
                      id="free-solo-2-demo"
                      style={{ margin: "auto",marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
                      className={classes.fixedTag}
                      getOptionLabel={option => option.name}
                      options={props.masterproducttype}
                      onChange={handletypeChange('product_type')}

                      renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                      <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
                      ))
                      }
                      renderInput={params => (
                      <TextField
                      {...params}
                      label="Filter By Product Type"
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{ ...params.InputProps, readOnly: true, type: 'search' }}
                      />
                      )}
                      />
      </Grid>
      <Grid lg={3} md={3} sm={3}>
          <TextField fullWidth margin="dense" onChange={handleinputChange('productname')} placeholder={"Search by product name or product id"} onChange={handleinputChange('productname')} id="outlined-basic" variant="outlined"  style={{ margin: "auto",marginLeft: "10px", marginTop: "18px", marginBottom: "10px" }}/>
          
      </Grid>
      <Grid lg={3} md={3} sm={3}>

      <Button onClick={(e) => applyfilter()} color="primary" variant="contained" style={{ marginLeft: "10px", marginTop: "18px", marginBottom: "10px" }} >
                  Search
          </Button>
          </Grid>

    </div>
  );
}
