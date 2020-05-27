import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { withRouter } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {General, Results} from './components'
import Mastercontent from '../../components/Mastercontent'
import data from './data.json'
import { NetworkContext } from '../../context/NetworkContext';
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Divider,
  Switch,
  TextField,
  Typography,
  colors
} from '@material-ui/core';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '80vh'
  },
  tabs: {
    minWidth: '250px',
    maxWidth: '250px',
    backgroundColor: theme.palette.background.paper,
    marginRight : theme.spacing(2),
    borderRight: `2px solid ${theme.palette.divider}`,
  },
}));
const master_options = ['Address Book','Wish List','Orders']
  const master_options_url = ['/address','/userwishlist','/orderlist']

export const Customerdetails = withRouter(props => {
  const classes = useStyles();
  let history = useHistory();

  const [value, setValue] = React.useState(0);
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [masters, setMasters] = React.useState({});
  const [customer, setCustomer] = React.useState({});
  function ProductEdit(id){
    // localStorage.setItem('productEditId',id);
    // history.push(`orderlist/${id}`)
    window.location.href = `orderlist/${id}`
  }
  let user_id = props.location.pathname.split('/')[2];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
async function getmaster()
  {
    let response =  await sendNetworkRequest('/getuserinfo', {}, {user_id : user_id})
    setMasters(response.userinfo)

    setCustomer(response.userprofile)
  }
  React.useEffect(() => {
    getmaster()
  }, [])
  return (
    <Grid container  spacing={3}>  
    {/* <AddContact contactlist={[]}/> */}
    {/* <Grid container item xs={12} sm={12} spacing={2}>
            <Typography component="h5" variant="h5">
            Configure
          </Typography>
    </Grid> */}
    <Grid container item xs={12} sm={12} lg={12} >
    <Grid  item xs={12} sm={6} lg={6} >
    <General customer ={customer} /> 

      </Grid>

    </Grid>
    {master_options.map((text, index) => (
    <Grid  item xs={6} sm={2} lg={2} >
    <Link underline='none' component={RouterLink}  to={master_options_url[index]+'/'+user_id}>
     <Card fullwidth
    //  onClick={(e) => ProductEdit(customer.id)}
     className="card2">
        <CardContent >
          <Typography style={{textAlign: "center",marginTop:8}} component="h6" variant="h5">
            {text}
          </Typography>
          
          {/* <Typography variant="body2" style={{textAlign: "center",marginTop:8}} color="textSecondary">
            Lorem Ipsum
          </Typography> */}
        </CardContent>
        
     
    </Card>
    </Link>
    </Grid>
    ))}

    
    </Grid>
    // <div className={classes.root}>
      
    //   <Tabs
    //     orientation="vertical"
    //     variant="standard"
    //     value={value}
    //     onChange={handleChange}
    //     aria-label="Vertical tabs example"
    //     className={classes.tabs}
    //   >
    //     <Tab label="Personal Information" {...a11yProps(0)} />
    //     <Tab label="Address Book" {...a11yProps(1)} />
    //     <Tab label="Shopping Bag" {...a11yProps(2)} />
    //     <Tab label="Wish list" {...a11yProps(3)} />
    //     <Tab label="All Orders" {...a11yProps(4)} />
 
    //   </Tabs>
    //   <TabPanel value={value} style={{width :  '50%'}} index={0}>
    //   <General customer ={customer} /> </TabPanel>
    //   <TabPanel style={{width :  '100%'}} value={value} index={1}>      
    //       <Results title={'Address Book'} masters={masters.addressess} columns={data.addressbook}/>
    //   </TabPanel>
    //   <TabPanel style={{width :  '100%'}} value={value} index={2}>

    //   <Results title={'Shopping Bag'} masters={[]} columns={data.shoppingbag}/>
      
    //   </TabPanel>
    //   <TabPanel  style={{width :  '100%'}}  value={value} index={3}>
    //   <Results title={'Wishlist'} masters={masters.wishlists} columns={data.wishlists}/>
    //   </TabPanel>
    //   <TabPanel style={{width :  '100%'}} value={value} index={4}>
    //   <Results title={'All Orders'}   columns={data.orders} masters={masters.orders}/>
    //   </TabPanel>
      
     
    // </div>
  );
});

export default Customerdetails;