import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { withRouter } from "react-router-dom";
import {General, Results} from './components'
import Mastercontent from '../../components/Mastercontent'
import data from './data.json'
import { NetworkContext } from '../../context/NetworkContext';

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
export const Customerdetails = withRouter(props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [masters, setMasters] = React.useState({});
  let user_id = props.location.pathname.split('/')[2];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
async function getmaster()
  {
    let response =  await sendNetworkRequest('/getuserinfo', {}, {user_id : user_id})
    setMasters(response.userinfo)
  }
  React.useEffect(() => {
    getmaster()
  }, [])
  return (
    <div className={classes.root}>
      
      <Tabs
        orientation="vertical"
        variant="standard"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Personal Information" {...a11yProps(0)} />
        <Tab label="Address Book" {...a11yProps(1)} />
        <Tab label="Shopping Bag" {...a11yProps(2)} />
        <Tab label="Wish list" {...a11yProps(3)} />
        <Tab label="All Orders" {...a11yProps(4)} />
 
      </Tabs>
      <TabPanel value={value} style={{width :  '50%'}} index={0}>
      <General /> </TabPanel>
      <TabPanel style={{width :  '100%'}} value={value} index={1}>      
          <Results title={'Address Book'} masters={masters.addressess} columns={data.addressbook}/>
      </TabPanel>
      <TabPanel style={{width :  '100%'}} value={value} index={2}>

      <Results title={'Shopping Bag'} masters={[]} columns={data.shoppingbag}/>
      
      </TabPanel>
      <TabPanel  style={{width :  '100%'}}  value={value} index={3}>
      <Results title={'Wishlist'} masters={masters.wishlists} columns={data.wishlists}/>
      </TabPanel>
      <TabPanel style={{width :  '100%'}} value={value} index={4}>
      <Results title={'All Orders'}   columns={data.orders} masters={masters.orders}/>
      </TabPanel>
      
     
    </div>
  );
});

export default Customerdetails;