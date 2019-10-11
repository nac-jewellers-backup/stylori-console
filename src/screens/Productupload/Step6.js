import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
import { NetworkContext } from '../../context/NetworkContext';

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
  const { sendNetworkRequest } = React.useContext(NetworkContext);

  async function uploadimagetoserver(bodaydata)
  {
   let responsedata = await sendNetworkRequest('/uploadimage', {}, {image:bodaydata.fileExtension})
   var returnData = responsedata.data.returnData;
   var signedRequest = returnData.signedRequest;
   var url = returnData.url;
   console.log("responseurl"+url);
   // Put the fileType in the headers for the upload
   var options = {
       headers: {
           'Content-Type': bodaydata.fileExtension,
           'Access-Control-Allow-Origin':'*'
       }
   };
   axios.put(signedRequest, bodaydata, options)
       .then(result => {
          alert(url);
       })
       .catch(error => {
       })
  }
 const handleInit = () =>
  {
    console.log("FilePond instance has initialised");
  }
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
                          oninit={() => handleInit()}
                          labelIdle={index === 5 ? 'Add More Images' : 'Image '+(index+1)}
                          imagePreviewHeight={100}
                          allowMultiple={true}
                          acceptedFileTypes={['image/*']}
                          maxFiles={5} 
                          onprocessfile={(err, fileItem) => {

                            console.log('onprocessfile', fileItem.filename, fileItem.source);
                    
                           
                    
                        }}
                          onaddfile={(err, fileItem) => {
                            console.log('onaddfile', fileItem.fileExtension, fileItem.source);
                            uploadimagetoserver(fileItem)

                          }}
                          onremovefile={(fileItem) => {
                    
                            console.log('onremovefile', fileItem);
                    
                          }}                          
                          onupdatefiles={fileItems => {
                            console.log("fileuploaded");
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