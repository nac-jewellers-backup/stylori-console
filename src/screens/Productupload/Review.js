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
import DeleteIcon from '@material-ui/icons/Delete';
import "./Productupload.css"
import { func } from 'prop-types';

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
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
    
    <Grid container xs={12} spacing={2}>

    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Diamond Type/Clarity</FormLabel>

    <Box mt={1}>

                <Select
                    className="selectionoverlay"
                    placeholder="Diamond Type/Clarity"
                    onChange={handleChange("diamondclarity")}
                    value={productCtx.diamondclarity}
                    options={productCtx.masterData.diamondclarities  }
                  />
             </Box>
       
    </Grid>

    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Diamond Colour</FormLabel>
                <Box mt={1}>
                  <Select
                    className="selectionoverlay"
                    placeholder="Diamond Colour"
                    onChange={handleChange('diamondcolor')}
                    value={productCtx.diamondcolor}
                    options={productCtx.masterData.diamondcolors}
                  />
                  </Box>

    
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Diamond Setting</FormLabel>
                <Box mt={1}>
        <Select 
                    className="selectionoverlay"
                    placeholder="Diamond Setting"
                    onChange={handleChange('diamondsettings')}
                    value={productCtx.diamondsettings}
                    options={productCtx.masterData.diamondsettings}
                  />
                  </Box>
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Diamond Shape</FormLabel>

    <Box mt={1}>
    <Select

                    className="selectmargin"
                    placeholder="Diamond Shape"
                    value={productCtx.diamondshape}
                    onChange={handleChange('diamondshape')}
                    options={productCtx.masterData.diamondshapes}
                  />
                  </Box>
    
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">#of Stones</FormLabel>
    <Box mt={1}>
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
          </Box>
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Weight</FormLabel>
    <Box mt={1}>
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
          </Box>
    </Grid>
    </Grid>
    </Grid>
    <Grid  container xs={12} spacing={2}>

    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Gemstone Type</FormLabel>
    <Box mt={1}>
                <Select
                    className="selectionoverlay"
                    placeholder="Gemstone Type"
                    value={productCtx.gemstonetype}
                    onChange={handleChange('gemstonetype')}
                    options={productCtx.masterData.gemstontypes}
                  />
             </Box>   
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Gemstone Shape</FormLabel>
    <Box mt={1}>
     <Select
                    className="selectionoverlay"
                    placeholder="Gemstone Shape"
                    value={productCtx.gemstoneshape}
                    onChange={handleChange('gemstoneshape')}
                    options={productCtx.masterData.gemstonshapes}
                  />
                  </Box>
    
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Gemstone Settings</FormLabel>
    <Box mt={1}>
        <Select 
                    className="selectionoverlay"
                    placeholder="Gemstone Setting"
                    value={productCtx.gemstonesettings}
                    onChange={handleChange('gemstonesettings')}
                    options={productCtx.masterData.gemstonesettings}
                  />
                  </Box>
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Gemstone Shape</FormLabel>
    <Box mt={1}>
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
    
    </Box>
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">#of Stones</FormLabel>
    <Box mt={1}>
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
         </Box> 
    </Grid>
    <Grid item xs={4} >
    <FormLabel component="legend" labelPlacement="start">Weight</FormLabel>
    <Box mt={1}>    
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
         </Box> 
    </Grid>
    
    </Grid>

    <Grid container item xs={12} justify="flex-end">
    <Button variant="contained" onClick={handleClick}  size="small" color="primary" className={classes.button}>
        Add
      </Button>

    </Grid>
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
 </React.Fragment>
  );
}