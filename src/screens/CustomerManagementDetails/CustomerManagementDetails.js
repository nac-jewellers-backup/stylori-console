import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Page from '../../components/Page/Page'
import { Header } from './components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));
const master_options = ['Attribute Master','Categories','ProductTypes', 'Materials','Metal Colours','Metal Purities','Collections','Occassions','Styles','Themes','Designs','Weights','Diamond Types',
'Diamond Settings','Diamond Shapes','Earring Backings','Gemstone Settings','Gemstone Shapes','Gemstone Types','Stones','Stone Colours','Stone Shapes',
'Gender','SEO Priorities','Tax Settings 1','Tax Settings 2','Payment Status','Order Status','Shipping Zones','Shipment Setting I','Shipment Setting II']
  const master_options_url = ['masterattributes','categories','producttypes', 'materialmaster','mastercolors','masterpurities','collections','masteroccassions','masterstyles','masterthemes','designs','weights','diamonds','diamondsettings','diamondshapes','earringbacking',
  'gemstonesettings','gemstoneshapes','gemstonetypes','masterstones','masterstonecolors','masterstoneshapes','genders','seopriority','Taxsetup','taxsettings','paymentstatus','orderstatus','zones','shipmensettings','shippingattributes']

export const CustomerManagementDetails = withRouter(props => {

  const { match, history } = props;
  const classes = useStyles();
  const { id, tab } = match.params;

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: 'summary', label: 'Summary' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'logs', label: 'Logs' }
  ];

  if (!tab) {
    //return <Redirect to={`/customerdetails`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
   // return <Redirect to="/errors/error-404" />;
  }

  return (
    <Grid container  spacing={3}>  
    {/* <AddContact contactlist={[]}/> */}
    <Grid container item xs={12} sm={12} spacing={2}>
            <Typography component="h5" variant="h5">
            Configure
          </Typography>
    </Grid>
    
    {master_options.map((text, index) => (
    <Grid  item xs={6} sm={4} lg={3} >
    <Link underline='none' component={RouterLink} to={master_options_url[index]}>
     <Card fullwidth
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
    // <Page
    //   className={classes.root}
    //   title="Customer Management Details"
    // >
    //   <Header />
    //    <Tabs
    //     className={classes.tabs}
    //     onChange={handleTabsChange}
    //     scrollButtons="auto"
    //     value={tab}
    //     variant="scrollable"
    //   >
    //     {tabs.map(tab => (
    //       <Tab
    //         key={tab.value}
    //         label={tab.label}
    //         value={tab.value}
    //       />
    //     ))}
    //   </Tabs>
    //   <Divider className={classes.divider} />
    //  {/* <div className={classes.content}>
    //     {tab === 'summary' && <Summary />}
    //     {tab === 'invoices' && <Invoices />}
    //     {tab === 'logs' && <Logs />}
    //   </div> */}
    // </Page>
  );
});

CustomerManagementDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default CustomerManagementDetails;
