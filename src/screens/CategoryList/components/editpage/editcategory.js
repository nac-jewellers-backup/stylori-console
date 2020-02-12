import React from 'react';
import {Grid,Typography,TextField,FormGroup} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

// const IOSSwitch = withStyles(theme => ({
//     root: {
//       width: 42,
//       height: 26,
//       padding: 0,
//       margin: theme.spacing(1),
//     },
//     switchBase: {
//       padding: 1,
//       '&$checked': {
//         transform: 'translateX(16px)',
//         color: theme.palette.common.white,
//         '& + $track': {
//           backgroundColor: '#52d869',
//           opacity: 1,
//           border: 'none',
//         },
//       },
//       '&$focusVisible $thumb': {
//         color: '#52d869',
//         border: '6px solid #fff',
//       },
//     },
//     thumb: {
//       width: 24,
//       height: 24,
//     },
//     track: {
//       borderRadius: 26 / 2,
//       border: `1px solid ${theme.palette.grey[400]}`,
//       backgroundColor: theme.palette.grey[50],
//       opacity: 1,
//       transition: theme.transitions.create(['background-color', 'border']),
//     },
//     checked: {},
//     focusVisible: {},
//   }))(({ classes, ...props }) => {
//     return (
//       <Switch
//         focusVisibleClassName={classes.focusVisible}
//         disableRipple
//         classes={{
//           root: classes.root,
//           switchBase: classes.switchBase,
//           thumb: classes.thumb,
//           track: classes.track,
//           checked: classes.checked,
//         }}
//         {...props}
//       />
//     );
//   });
 

export default function editcategory(){
    // const [state, setState] = React.useState({
    //     checkedA: true,
    //     checkedB: true,
    //     checkedC: true,
    //   });
    //   const handleChange = name => event => {
    //     setState({ ...state, [name]: event.target.checked });
    //   };
    
    
      
    


          return(
              <div>
                    <Grid>
                        <Typography variant="h2" style={{marginTop:"25px",marginBottom:"50px",fontWeight:"400",fontSize:"22px"}}>Edit Category Items</Typography>
                    </Grid>
                    <Grid>
                        <Grid style={{display:"flex",justifyContent:"space-between",width:"80%",margin:"auto",marginBottom:"75px"}}>
                            <Grid ls={4} sm={6} >                   
                                <TextField id="outlined-basic" label="Name" margin="dense" variant="outlined" color="primary" />
                            </Grid>
                            <Grid ls={4} sm={6}>                   
                                <TextField id="outlined-basic" label="URL" margin="dense" variant="outlined" color="primary" />
                            </Grid>
                            <Grid ls={4} sm={6}>                    
                            <   TextField id="outlined-basic" label="SEO Text" margin="dense" variant="outlined" color="primary" />
                            </Grid>
                        </Grid>
                        <Grid style={{display:"flex",justifyContent:"space-between",width:"80%",margin:"auto"}}>
                            <Grid ls={4} sm={6}>                   
                                <Typography variant="h4" style={{fontWeight:"400",paddingBottom:"5px",fontSize:"19px",marginLeft:"5px"}}>For Filters</Typography> 
                                {/* <FormGroup>
      
                                <FormControlLabel
                                    control={
                                    <IOSSwitch
                                        checked={state.checkedB}
                                        onChange={handleChange('checkedB')}
                                        value="checkedB"
                                    />
                                    }
                                    label="iOS style"
                                />
                                
                                </FormGroup> */}
                            </Grid>
                            <Grid ls={4} sm={6}>                   
                                <Typography variant="h4" style={{fontWeight:"400",paddingBottom:"5px",fontSize:"19px",marginLeft:"5px"}}>For Search</Typography>
                            </Grid>
                            <Grid ls={4} sm={6}>                    
                                <Typography variant="h4" style={{fontWeight:"400",paddingBottom:"5px",fontSize:"19px",marginLeft:"5px"}}>For Price</Typography>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid style={{display:"flex",justifyContent:"flex-end",width:"80%",margin:"auto",marginTop:"50px"}}>
                            <Button  className="product" variant="contained" size="medium" color="primary" backgroundColor="secondary" style={{margin:"auto 10px"}}>
                                Cancel
                            </Button>
                            <Button  className="product" variant="contained" size="medium" color="primary" backgroundColor="secondary" style={{margin:"auto 10px"}}>
                                Save
                            </Button>    
                            </Grid>
                            <Grid>

                            </Grid>
                        </Grid>
                    </Grid>    

              </div>
          )
}