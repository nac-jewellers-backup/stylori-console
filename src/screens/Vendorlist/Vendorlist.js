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

  
 
  function cancelvendorcreation()
  {
    setIsadd(false)


  }
  return (
    <>
    {/* <Newvendor title={'Add new Vendor'} isopen={isadd}/> */}
    <Grid container  spacing={2}>  
    
    
    <Vendor  onCancel={cancelvendorcreation}  />
   
    </Grid>
    </>
  )
});

export default Vendorlist;