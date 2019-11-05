import React from 'react';
import clsx from 'clsx';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Input} from '../../components/Input.js'
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import { ProductContext } from '../../context';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import SelectPlaceholder from '../../components/SelectPlaceholder.js'

import DeleteIcon from '@material-ui/icons/Delete';
import "./Productupload.css"
import { func } from 'prop-types';

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(0),
    },
    paper: {
      padding: theme.spacing(2),
      width: '100%'
    },
    gempapper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      width: '100%'
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  }));
  
export default function Review() {
  const classes = useStyles();
  const theme = useTheme();
  const inputLabel = React.useRef(null);


  const { productCtx, setProductCtx, masterData } = React.useContext(ProductContext);
  const handleInputChange = type => e => {
    setProductCtx({ ...productCtx, [type]: e.target.value  })
  }
  const handleChange = type => selectedOption => {
    setProductCtx({ ...productCtx, [type]: selectedOption })
  };
  function editmaterial(name) {
    clearmetalvalue();
    assignvalue(productCtx.metals[name], name);
  }
  function deletematerial(name) {
    clearmetalvalue();
    var metalsarr  = productCtx.metals;
    metalsarr.splice(name,1)
    setProductCtx({ ...productCtx, metals: metalsarr })

  }
  function clearmetalvalue()
  {
    setProductCtx({ ...productCtx, 
      diamondsettings: "",
      diamondcolor:"",
      diamondclarity:"",
      diamondshape:"",
      diamondcount:"",
      diamondweight:"",
      gemstonetype:"",
      gemstoneshape:"",
      gemstonesettings:"",
      gemstonesize:"",
      gemstonecount:"",
      gemstoneweight:""
    })

  }
  function assignvalue(metalobj, indexval)
  {
    if(metalobj.metalname === 'Diamond')
    {
    setProductCtx({ ...productCtx, 
      diamondsettings: metalobj.settings,
      diamondcolor:metalobj.color,
      diamondclarity:metalobj.clarity,
      diamondshape:metalobj.shape,
      diamondcount:metalobj.count,
      diamondweight:metalobj.weight,
    metalindex: indexval})
    }else
    {
      setProductCtx({ ...productCtx, 
        gemstonesettings: metalobj.settings,
        gemstoneshape:metalobj.color,
        gemstonetype:metalobj.clarity,
        gemstonesize:metalobj.shape,
        gemstonecount:metalobj.count,
        gemstoneweight:metalobj.weight,
      metalindex: indexval})
    }

  }
  function handleClick(e) {
    var metalsarr  = productCtx.metals;
    var stonedetails = {};
    stonedetails['metalname'] = productCtx.metal.label;
    if(productCtx.diamondclarity)
    {
      stonedetails['metalname'] = "Diamond"
    stonedetails['settings'] = productCtx.diamondsettings;
    stonedetails['color'] = productCtx.diamondcolor;
    stonedetails['clarity'] = productCtx.diamondclarity;
    stonedetails['shape'] = productCtx.diamondshape;
    stonedetails['count'] = productCtx.diamondcount;
    stonedetails['weight'] = productCtx.diamondweight;

    }else{
      stonedetails['metalname'] = "Gemstone"
      stonedetails['clarity'] = productCtx.gemstonetype;
      stonedetails['color'] = productCtx.gemstoneshape;
      stonedetails['settings'] = productCtx.gemstonesettings;
      stonedetails['shape'] = productCtx.gemstonesize;
      stonedetails['count'] = productCtx.gemstonecount;
      stonedetails['weight'] = productCtx.gemstoneweight;
    }

    if(productCtx.metalindex === -1)
    {
      stonedetails['id'] = metalsarr.length;

      metalsarr.push(stonedetails) 

    }else
    {
      stonedetails['id'] = productCtx.metalindex

      metalsarr[productCtx.metalindex] = stonedetails;
    }
    setProductCtx({ ...productCtx, metals: metalsarr })
    clearmetalvalue()
  }
  return (
    <React.Fragment>
    <Grid container xs={12} spacing={2}>
      {!productCtx.material_names.includes("Diamond") ? null : <Paper className={classes.paper} >
        <Grid container xs={12} spacing={1}>

        <Grid item xs={4} >
                        <SelectPlaceholder
                        fullWidth
                        placeholder="Diamond Type/Clarity"
                        onChange={handleChange("diamondclarity")}
                        value={productCtx.diamondclarity}
                        options={productCtx.masterData.diamondclarities  }
                        placeholderzindex="9"
                        selectzindex="9"
                        placeholderUp={productCtx.diamondclarity ? true : false}

                      />
              
          
        </Grid>

        <Grid item xs={4} >
        
                      <SelectPlaceholder
                      fullWidth
                        placeholder="Diamond Colour"
                        onChange={handleChange('diamondcolor')}
                        value={productCtx.diamondcolor}
                        options={productCtx.masterData.diamondcolors}
                        placeholderzindex="8"
                        selectzindex="8"
                        placeholderUp={productCtx.diamondcolor ? true : false}
                      />

        
        </Grid>
        <Grid item xs={4} >
        
            <SelectPlaceholder
            fullWidth
                        placeholder="Diamond Setting"
                        onChange={handleChange('diamondsettings')}
                        value={productCtx.diamondsettings}
                        options={productCtx.masterData.diamondsettings}
                        placeholderzindex="7"
                        selectzindex="7"
                        placeholderUp={productCtx.diamondsettings ? true : false}
                      />
        </Grid>
        <Grid item xs={4} >
      
        <SelectPlaceholder

                        placeholder="Diamond Shape"
                        value={productCtx.diamondshape}
                        onChange={handleChange('diamondshape')}
                        options={productCtx.masterData.diamondshapes}
                        placeholderzindex="6"
                        selectzindex="6"
                        placeholderUp={productCtx.diamondshape ? true : false}
                      />
        
        </Grid>
        <Grid item xs={4} >
        
          <Input
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              label="#of Stones"
              name="size"
              type="number"
              autoComplete="size"
              onChange={handleInputChange('diamondcount')}
              value={productCtx.diamondcount}
              />
        </Grid>
        <Grid item xs={4} >
      
          <Input
              variant="outlined"
              fullWidth
              id="size"
              margin="dense"
              label="Weight"
              name="size"
              autoComplete="size"
              onChange={handleInputChange('diamondweight')}
              value={productCtx.diamondweight}
              />
        </Grid>
        <Grid container item xs={12} justify="flex-end">
        <Button variant="contained" onClick={handleClick}  size="small" color="primary" className={classes.button}>
            Add Diamond
          </Button>

        </Grid>
        </Grid>
      
      
        </Paper>
      }

      {!productCtx.material_names.includes("Gemstone") ? null : <Paper className={classes.gempapper} >

          <Grid  container xs={12} spacing={1}>

      <Grid item xs={4} >
      
                  <SelectPlaceholder
                      placeholder="Gemstone Type"
                      value={productCtx.gemstonetype}
                      onChange={handleChange('gemstonetype')}
                      options={productCtx.masterData.gemstontypes}
                      placeholderzindex="5"
                      selectzindex="5"
                      placeholderUp={productCtx.gemstonetype ? true : false}
                    />
              
      </Grid>
    
      <Grid item xs={4} >
    
      <SelectPlaceholder
                      placeholder="Gemstone Shape"
                      value={productCtx.gemstoneshape}
                      onChange={handleChange('gemstoneshape')}
                      options={productCtx.masterData.gemstonshapes}
                      placeholderzindex="4"
                      selectzindex="4"
                      placeholderUp={productCtx.gemstoneshape ? true : false}
                    />
      
      </Grid>
      <Grid item xs={4} >
      
          <SelectPlaceholder
                      placeholder="Gemstone Setting"
                      value={productCtx.gemstonesettings}
                      onChange={handleChange('gemstonesettings')}
                      options={productCtx.masterData.gemstonesettings}
                      placeholderzindex="3"
                      selectzindex="3"
                      placeholderUp={productCtx.gemstonesettings ? true : false}
                    />
      </Grid>
      <Grid item xs={4} >
    
      <Input
            variant="outlined"
            fullWidth
            id="size"
            margin="dense"
            label="Gemstone Size"
            name="size"
            onChange={handleInputChange('gemstonesize')}
            autoComplete="size"
            value={productCtx.gemstonesize}
            />
      
      
      </Grid>
      <Grid item xs={4} >
      
        <Input
            variant="outlined"
            fullWidth
            id="size"
            margin="dense"
            label="#of Stones"
            name="size"
            autoComplete="size"
            onChange={handleInputChange('gemstonecount')}
            value={productCtx.gemstonecount}
            />
      </Grid>
      <Grid item xs={4} >
        
        <Input
            variant="outlined"
            fullWidth
            id="size"
            margin="dense"
            label="Weight"
            name="size"
            autoComplete="size"
            onChange={handleInputChange('gemstoneweight')}
            value={productCtx.gemstoneweight}
            />
      </Grid>
      <Grid container item xs={12} justify="flex-end">
      <Button variant="contained" onClick={handleClick}  size="small" color="primary" >
          Add Gemstone
        </Button>

      </Grid>
      </Grid>
            </Paper>
      }
    <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Stone</TableCell>
            <TableCell align="right">Type/Clarity</TableCell>
            <TableCell align="right">Colour</TableCell>
            <TableCell align="right">Setting</TableCell>
            <TableCell align="right">Shape</TableCell>
            <TableCell align="right">#of stone</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {productCtx.metals.map(row => (
            <TableRow key={row.metalname}>
              <TableCell component="th" scope="row">
                {row.metalname}
              </TableCell>
              <TableCell align="right">{row.clarity.label}</TableCell>
              <TableCell align="right">{row.color.label}</TableCell>
              <TableCell align="right">{row.settings.label}</TableCell>
              <TableCell align="right">{row.metalname ==  'Diamond'? row.shape.label : row.shape}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="center"><EditIcon id={row.metalname} onClick={()=>editmaterial(row.id)}/> </TableCell>
              <TableCell align="center"><DeleteIcon id={row.metalname} onClick={()=>deletematerial(row.id)}/></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
        <Grid item xs={6} >
        </Grid> 
        </Grid>
 </React.Fragment>
  );
}