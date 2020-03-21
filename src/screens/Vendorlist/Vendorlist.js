import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Newvendor from '../../components/Newvendor'
import { NetworkContext } from '../../context/NetworkContext';



export const Vendorlist = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [newvendorcode, setNewvendorcode] = React.useState("")

  
 async function addnewvendor()
  {

    let response =  await sendNetworkRequest('/getnewvendorcode', {}, {})
    setIsadd(true)
    setNewvendorcode(response.newvendorcode)
  }
  function cancelvendorcreation()
  {
    setIsadd(false)


  }
  return (
    <>
    {/* <Newvendor title={'Add new Vendor'} isopen={isadd}/> */}
    <Grid container  spacing={2}>  
    
    <Grid container item xs={12} sm={12} alignItems={"flex-end"}>
        <Grid fullwidth item xs={6} sm={6}>

            <Typography component="h6" variant="h6">
            Vendors
          </Typography>
          </Grid>
          <Grid fullwidth item xs={6} sm={6} style={{"text-align":"right"}} >
          <Button variant="outlined"  onClick={()=>addnewvendor() } color="primary" >
          Add New Vendor
        </Button>
        
        </Grid>
    </Grid>
    <Vendor  onCancel={cancelvendorcreation} isadd={isadd} newvendorcode={newvendorcode} />
   
    </Grid>
    </>
  )
});

export default Vendorlist;