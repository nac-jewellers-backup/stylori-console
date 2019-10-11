
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { MaterialContext } from '../../context';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import AddContact from '../../components/AddContact'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
export default function Content() {
    const { materialCtx, setMaterialCtx ,materialMaster} = React.useContext(MaterialContext);
    console.log(JSON.stringify(materialCtx))
    console.log(JSON.stringify(materialMaster))
    return (

        <Grid container  spacing={2}>  
        <Grid container item xs={12} sm={12} alignItems={"flex-end"}>
            <Grid fullwidth item xs={6} sm={6}>
    
                <Typography component="h6" variant="h6">
                Materials
              </Typography>
              </Grid>
              <Grid fullwidth item xs={6} sm={6} style={{"text-align":"right"}} >
    
              <Link underline='none' component={RouterLink} to={'/productupload'}>
              <Button variant="outlined" color="primary" >
                Add New Material
            </Button>
            
            </Link>
            </Grid>
        </Grid>
        <AddContact contactlist={materialCtx.materialMaster.materials} />
       
        </Grid>
      )
    }
