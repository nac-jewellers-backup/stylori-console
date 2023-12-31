import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {CategoryComponents} from './../../components'
import { DateTimePicker } from "@material-ui/pickers";
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  Card,
  Grid,
  Chip,
  Button, 
  TextField,
  CardHeader,
  CardContent,
  Tabs, Tab, 
  Divider,
  colors
} from '@material-ui/core';
import { VoucherContext } from '../../../../context';
const tabs = [
  { value: 'Category', label: 'Category' },
  { value: 'Producttype', label: 'Product type' },
  { value: 'Material', label: 'Material' },
  { value: 'Collections', label: 'Collections' },
  { value: 'Occations', label: 'Occations' },
  { value: 'Styles', label: 'Styles' },
  { value: 'Themes', label: 'Themes' }


];
const useStyles = makeStyles(theme => ({
  root: {},
  option: {
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'flex-center',
    padding: theme.spacing(1),
    maxWidth: '100%',
    minWidth: '100%',
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  cardcontent:{
    display: 'flex',
    alignItems: 'flex-center',

  },
  selectedOption: {
    backgroundColor: colors.grey[200]
  },
  optionRadio: {
    margin: -10
  },
  content: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)

  },
  optionDetails: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  
}));

const AttributeComponent = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { voucherCtx, setVoucherCtx ,voucherMaster} = React.useContext(VoucherContext);
  const [attrobj, setAttrobj] = useState(props.attributes);
  const [isgold, setIsgold] = useState(false);
  const [isdiamond, setIsdiamond] = useState(false);
  const [tabnames, setTabnames] = useState([
    "Category",
    "Producttype",
    "Material",
    "Collections",
    "Occations",
    "Styles",
    "Themes"

  ]);

  const [selected, setSelected] = useState(1);
  const [selectedtab, setSelectedtab] = useState("Category");
  const [selectedDate, handleDateChange] = useState(new Date());
  const handleChange = (event, option) => {
    setSelected(option);

  };
  useEffect(() => {
    // alert(JSON.stringify(props.attributes))
    // setAttrobj(props.attributes)
  }, [props.attributes])
 const myFunction = () => {
    props.onAdded(attrobj)
  }
  const handleoptionChange = type => (event, value) => {
    if(type === 'materials')
    {
      let elements_arr = []
      value.forEach(element => {
        elements_arr.push(element.name)
        
      });
      if(elements_arr.indexOf("Gold") > -1)
      {
        setIsgold(true)
      }else
      {
        setIsgold(false)
      }

      if(elements_arr.indexOf("Diamond") > -1)
      {
        setIsdiamond(true)
      }else
      {
        setIsdiamond(false)
      }
    }
      setAttrobj({
        ...attrobj,
        [type]: value
      })
      
     // props.onAdded(type,value)

  }
  const handleTabsChange = (event, value) => {
    if(value == 'Material')
    {
      // tabs.push(  { value: 'Diamond Types', label: 'Diamond Types' },
      // )
      if(tabnames.indexOf("Purity") === -1)
      {
        tabnames.splice(3, 0, "Purity");

      }

    }
    setSelectedtab(value);
  };
  useEffect(() => {
  }, []);
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
  
      
      <div className={classes.content}>
      <Grid container  spacing={2}>  
      <Grid   item xs={4} sm={4} >
                  <Autocomplete
                       id="free-solo-2-demo"
                       disabled
                       className={classes.fixedTag}
                       fullWidth
                       getOptionLabel={option => option.hsnNumber}
                        options={props.masters.shiprates}
                       value={props.selectedrate}
                       renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                       <Chip variant="outlined" size="small" label={option.hsnNumber} {...getTagProps({ index })} />
                       ))
                       }
                       renderInput={params => (
                       <TextField
                       {...params}
                       label="Tax Settings"
                       margin="dense"
                       variant="outlined"
                       fullWidth
                       />
                       )}
                       />
        </Grid>
      <Grid   item xs={4} sm={4} >
                  <Autocomplete
                       id="free-solo-2-demo"
                       multiple
                       value={attrobj ? attrobj.category : []}
                       className={classes.fixedTag}
                       fullWidth
                       getOptionLabel={option => option.name}
                       options={props.masters.product_categories}
                       onChange={handleoptionChange('category')}
                       renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                       <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
                       ))
                       }
                       renderInput={params => (
                       <TextField
                       {...params}
                       label="Product Category"
                       margin="dense"
                       variant="outlined"
                       fullWidth
                       />
                       )}
                       />
        </Grid>
       
        <Grid   item xs={4} sm={4} >
           <Autocomplete
           id="free-solo-2-demo"
           multiple

           value={attrobj.product_types}
           className={classes.fixedTag}
           fullWidth
            options={props.masters.product_types}
           onChange={handleoptionChange('product_types')}
           getOptionLabel={option => option.name}
          // value={props.isedit ? voucherCtx.product_types : attrobj.product_types}

           renderTags={(value, getTagProps) =>
           value.map((option, index) => (
           <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
           ))
           }
           renderInput={params => (
           <TextField
           {...params}
           label="Product Types"
           margin="dense"
           variant="outlined"
           fullWidth
          //  error = {productCtx.error_message.selected_sizes}

          //  InputProps={{ ...params.InputProps, type: 'search' }}
           />
           )}
           />
        </Grid>
        <Grid   item xs={4} sm={4} >
            
            <Autocomplete
           id="free-solo-2-demo"
           multiple
           value={attrobj.materials}
           className={classes.fixedTag}
           fullWidth
         //  value={props.isedit ? voucherCtx.materials : attrobj.materials}
           options={props.masters.materials}
           onChange={handleoptionChange('materials')}
           getOptionLabel={option => option.name}
           renderTags={(value, getTagProps) =>
           value.map((option, index) => (
           <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
           ))
           }
           renderInput={params => (
           <TextField
           {...params}
           label="Materials"
           margin="dense"
           variant="outlined"
           fullWidth
          //  error = {productCtx.error_message.selected_sizes}

          //  InputProps={{ ...params.InputProps, type: 'search' }}
           />
           )}
           />
</Grid>
{isgold ||  attrobj.purities ? 
  <Grid   item xs={4} sm={4} >
            
  <Autocomplete
 id="free-solo-2-demo"
 multiple
  value={attrobj.purities}
 className={classes.fixedTag}
 fullWidth
 options={props.masters.purities}
 onChange={handleoptionChange('purities')}
 getOptionLabel={option => option.name}
 //value={attrobj.purities}
 renderTags={(value, getTagProps) =>
 value.map((option, index) => (
 <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
 ))
 }
 renderInput={params => (
 <TextField
 {...params}
 label="Purity"
 margin="dense"
 variant="outlined"
 fullWidth
//  error = {productCtx.error_message.selected_sizes}

//  InputProps={{ ...params.InputProps, type: 'search' }}
 />
 )}
 />
</Grid>  : null
}
{isdiamond || attrobj.components ? 
<Grid   item xs={4} sm={4} >
            
            <Autocomplete
           id="free-solo-2-demo"
           multiple
            value={attrobj.components}
           className={classes.fixedTag}
           fullWidth
           getOptionLabel={option => option.diamondtype}

           options={props.masters.diamondtypes}
           onChange={handleoptionChange('components')}
           renderTags={(value, getTagProps) =>
           value.map((option, index) => (
           <Chip variant="outlined" size="small" label={option.diamondtype} {...getTagProps({ index })} />
           ))
           }
           renderInput={params => (
           <TextField
           {...params}
           label="Diamond Types"
           margin="dense"
           variant="outlined"
           fullWidth
          //  error = {productCtx.error_message.selected_sizes}

          //  InputProps={{ ...params.InputProps, type: 'search' }}
           />
           )}
           />
</Grid>  : null }
<Grid   item xs={4} sm={4} >
            
            <Autocomplete
           id="free-solo-2-demo"
           multiple
            value={attrobj.collections}
           className={classes.fixedTag}
           fullWidth
           options={props.masters.collections}
           onChange={handleoptionChange('collections')}
           getOptionLabel={option => option.name}
          // value={props.isedit ? voucherCtx.collections : attrobj.collections}

                   renderTags={(value, getTagProps) =>
           value.map((option, index) => (
           <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
           ))
           }
           renderInput={params => (
           <TextField
           {...params}
           label="Collections"
           margin="dense"
           variant="outlined"
           fullWidth
          //  error = {productCtx.error_message.selected_sizes}

          //  InputProps={{ ...params.InputProps, type: 'search' }}
           />
           )}
           />
</Grid>   
<Grid   item xs={4} sm={4} >
            
            <Autocomplete
           id="free-solo-2-demo"
           multiple
            value={attrobj.occations}
           className={classes.fixedTag}
           fullWidth
            options={props.masters.occations}
           onChange={handleoptionChange('occations')}
           getOptionLabel={option => option.name}
          // value={props.isedit ? voucherCtx.occations : attrobj.occations}

           renderTags={(value, getTagProps) =>
           value.map((option, index) => (
           <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
           ))
           }
           renderInput={params => (
           <TextField
           {...params}
           label="Occassions"
           margin="dense"
           variant="outlined"
           fullWidth
          //  error = {productCtx.error_message.selected_sizes}

          //  InputProps={{ ...params.InputProps, type: 'search' }}
           />
           )}
           />
</Grid> 
<Grid   item xs={4} sm={4} >
            
            <Autocomplete
           id="free-solo-2-demo"
           multiple
            value={attrobj.styles}
           className={classes.fixedTag}
           fullWidth
           options={props.masters.styles}
           onChange={handleoptionChange('styles')}
           getOptionLabel={option => option.name}
          // value={props.isedit ? voucherCtx.styles : attrobj.styles}

           renderTags={(value, getTagProps) =>
           value.map((option, index) => (
           <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
           ))
           }
           renderInput={params => (
           <TextField
           {...params}
           label="Styles"
           margin="dense"
           variant="outlined"
           fullWidth
          //  error = {productCtx.error_message.selected_sizes}

          //  InputProps={{ ...params.InputProps, type: 'search' }}
           />
           )}
           />
</Grid> 
<Grid   item xs={4} sm={4} >
            
            <Autocomplete
           id="free-solo-2-demo"
           multiple
            value={attrobj.themes}
           className={classes.fixedTag}
           fullWidth
            options={props.masters.themes}
           onChange={handleoptionChange('themes')}
           getOptionLabel={option => option.name}
          // value={props.isedit ? voucherCtx.themes : attrobj.themes}

           renderTags={(value, getTagProps) =>
           value.map((option, index) => (
           <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
           ))
           }
           renderInput={params => (
           <TextField
           {...params}
           label="Themes"
           margin="dense"
           variant="outlined"
           fullWidth
          //  error = {productCtx.error_message.selected_sizes}

          //  InputProps={{ ...params.InputProps, type: 'search' }}
           />
           )}
           />
</Grid> 
        {props.isedit ? null : <Grid item xs={12} style={{marginTop:16, textAlign:"center"}} >

          <Button onClick={() => props.onAdded(attrobj)} color="primary" variant="contained">Update</Button>
           </Grid> }
        </Grid>    
     
      
        </div>
    </Card>
  );
};

AttributeComponent.propTypes = {
  className: PropTypes.string,
  match: PropTypes.object.isRequired

};
export default AttributeComponent;
