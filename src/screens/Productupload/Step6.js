import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
 // Import React FilePond
 import { FilePond, registerPlugin } from 'react-filepond';
 import TextField from '@material-ui/core/TextField';

 // Import FilePond styles
 import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
 
import { ProductContext } from '../../context';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


  const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        width: 150,
      },
      control: {
        padding: theme.spacing(2),
      },
      input: {
        display: 'none',
      },
  }));
  
  
  
  
export default function Review() {
  const classes = useStyles();
  const { productCtx, setProductCtx } = React.useContext(ProductContext);

 
  return (
    <React.Fragment>
    <Grid container xs={12} spacing={2}>
    <Grid item xs={12} >
    <Typography component="h6" variant="h6" align="left">
        {/* {productCtx.default_metal_colour.name} */}

          </Typography> 
    </Grid>
    <Grid item xs={12} >
    <Typography component="h6" variant="h6" align="left">
            Rose Gold
          </Typography> 
    </Grid>
    
    <Grid item xs={12}>
        <Grid container justify="left" spacing={2}>
           {[0, 1, 2, 3, 4].map((value, index) => ( 
            <Grid xs={2} item>

                  <FilePond 
                          
                          labelIdle={index === 5 ? 'Add More Images' : 'Image '+(index+1)}
                          imagePreviewHeight={100}
                          allowMultiple={true}
                          maxFiles={5}                           
                          onupdatefiles={fileItems => {
                              // Set currently active file objects to this.state
                    }}>
            
                </FilePond>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  id="companyname"
                  label="Image Url"
                  name="companyname"
                  autoComplete="off"
                 />
            </Grid>
           ))} 
            
            
        </Grid>
        <Grid container justify="left" spacing={2}>
        <Grid item xs={12} >
    <Typography component="h6" variant="h6" align="left">
            White Gold
          </Typography> 
    </Grid> 
           {[0, 1].map(value => ( 

            <Grid xs={2} container item >

              <FilePond 
                          labelIdle="Default image "
                          imagePreviewHeight={100}
                          allowMultiple={true}
                          maxFiles={5}                           
                          onupdatefiles={fileItems => {
                              // Set currently active file objects to this.state
                            
                          }}>
                </FilePond>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  id="companyname"
                  label="Image Url"
                  name="companyname"
                  autoComplete="off"
                 />
                 <Button
                    variant="contained"
                    color="primary"
                    size="small"
                  >
            Submit
          </Button>
            </Grid>
           ))} 
            
            
        </Grid>
        <Grid container justify="left" spacing={2}>
        <Grid item xs={12} >
    <Typography component="h6" variant="h6" align="left">
            White Gold
          </Typography> 
    </Grid> 
           {[0, 1].map(value => ( 
            <Grid xs={2} item>

              <FilePond 
                          
                          labelIdle="Default image "
                          imagePreviewHeight={100}
                          allowMultiple={true}
                          maxFiles={5}                           
                          onupdatefiles={fileItems => {
                              // Set currently active file objects to this.state
                            
                          }}>
                </FilePond>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  id="companyname"
                  label="Image Url"
                  name="companyname"
                  autoComplete="off"
                 />
            </Grid>
           ))} 
            
            
        </Grid>
      </Grid>
    
   
        </Grid>
 </React.Fragment>
  );
}