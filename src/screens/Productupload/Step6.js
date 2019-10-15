import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';

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
import { file } from '@babel/types';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


  const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        height: 140,
      },
      img: {
        height: '100%',
        width:'100%',
        objectFit:'contain'
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
  const [metalcolour, setMetalcolour] = React.useState([]);
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    let metalcolour = []
    let product_images = [];
    productCtx.metalcolour.forEach(element => {
      if(element.name === productCtx.default_metal_colour.name)
      {
        product_images[element.name] = [] 
        if(metalcolour.length > 0)
        {
          metalcolour.unshift(element);
        }else{
          metalcolour.push(element)
        }

      }else{
        metalcolour.push(element)
        product_images[element.name] = []
      }

    })
    setMetalcolour(metalcolour)
}, []);
  async function uploadimagetoserver(bodaydata)
  {
  
  //  let responsedata = await sendNetworkRequest('/uploadimage', {}, {image:bodaydata.fileExtension})
  //  var returnData = responsedata.data.returnData;
  //  var signedRequest = returnData.signedRequest;
  //  var url = returnData.url;
  //  console.log("responseurl"+url);
  //  // Put the fileType in the headers for the upload
  //  var options = {
  //      headers: {
  //          'Content-Type': bodaydata.fileExtension,
  //          'Access-Control-Allow-Origin':'*'
  //      }
  //  };
  //  axios.put(signedRequest, bodaydata.file, options)
  //      .then(result => {
  //         alert(url);
  //      })
  //      .catch(error => {
  //      })
  }
  
 const handleInit = () =>
  {
    console.log("FilePond instance has initialised");
  }
  return (
    <React.Fragment>
         <Grid container className={classes.root} spacing={2}>

     <Grid item direction="row" xs={12}>
       <Grid container  justify="left" spacing={2}>

          {metalcolour === undefined ? null : metalcolour.map(value => ( 
            <Grid xs={12} container spacing={1} item>
            <Grid  xs={12}  item>

             <Typography component="h6" variant="h6" align="left">
            {value.name}
             </Typography> 
             </Grid>
             {[0].map(row => (

            <Grid  xs={3} alignItems="center" item>
                <FilePond 
                          labelIdle="Image For"
                          allowMultiple={true}
                          files={[{
                            source: 'https://d3mzho7p59hbyf.cloudfront.net/base_images/10dfff90-ee5f-11e9-943a-a7323a37c1c2.png',
                            options: {
                                type: 'local'
                            }
                        }]}
                          maxFiles={1}  
                          server={{
                          
                            load: (source, load) => {
                                // simulates loading a file from the server
                                fetch(source).then(res => 
                                  
                                  res.blob()).then(load);
                            }
                        }} 
                          onupdatefiles={fileItems => {
                              // Set currently active file objects to this.state
                            
                          }}
                          onaddfile={(error, fileItems)=> {
                            
                          }}
                          onremovefile={(error, fileItem)=>{

                          }}>
                </FilePond>
            </Grid>
             ))}
            <Grid xs={3} item>
              <FilePond 
                          labelIdle="Image For"
                          allowMultiple={true}
                          
                          maxFiles={1}  
                          
                          onupdatefiles={fileItems => {
                              // Set currently active file objects to this.state
                            
                          }}
                          onaddfile={(error, fileItems)=> {
                            
                          }}
                          onremovefile={(error, fileItem)=>{
                            alert(fileItem.fileExtension)

                          }}>
                </FilePond>
                <Grid container xs={12} alignItems="center" spacing={1} item>
                <Grid  xs={8} item>

                <TextField
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      value={"S"+productCtx.product_type_shortcode+(productCtx.masterData.productseries[0].value+1)+"_1"+ value.name.charAt(0)}
                      id="imagename"
                      name="imagename"
                      label="imagename"
                      />  
                                        </Grid>          

                <Grid  xs={4}  item>

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                  >Upload</Button> 
                                    </Grid>          
  
                  </Grid>          
            </Grid>
            
            </Grid>
           ))} 
       </Grid>
     </Grid>

    </Grid>
 
 </React.Fragment>
  );
}