import React,{useState,useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Mastercontent from '../../components/Mastercontent/Mastercontent';
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { SHIPPINGZONES,MASTERCOUNTRIES } from '../../graphql/query';
import data from "./data.json"
import Page from '../../components/Page'
import { NetworkContext } from '../../context/NetworkContext';
import {Breadcrumbs} from '../../components'

const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

export const Shippingzones = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
  const [searchtext, setSearchtext] = useState("");
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [mastervalue, setMastervalue] = React.useState([])
  const [mastercountries, setMastercountries] = React.useState([])

  const classes = useStyles();

  const [filtervalue, setFiltervalue] = React.useState([])

  
  async function createtax(taxcontent)
  {
   let response =  await sendNetworkRequest('/manageshippingzone', {}, taxcontent)
    getmaster()
  }
  async function getmastercountries()
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: MASTERCOUNTRIES  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        setMastercountries(fatchvalue.data.allMasterCountries.nodes)
      })
      .catch(console.error)
  }
  function getmaster()
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: SHIPPINGZONES  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        let zones = []
        if(fatchvalue.data.allShippingZones.nodes)
        {
          fatchvalue.data.allShippingZones.nodes.forEach(element => {
            let countries = []
            let countrydefault = []

            if(element.shippingZoneCountriesByZoneId)
            {
              
              if(element.shippingZoneCountriesByZoneId.nodes)
              {
                element.shippingZoneCountriesByZoneId.nodes.forEach(countryobj => {
                  countries.push(countryobj.masterCountryByCountryId.name)
                  countrydefault.push(countryobj.masterCountryByCountryId)
                })
              }
            }
            let zoneobj = {
              id : element.id,
              isActive : element.isActive,
              name : element.name,
              country  : countries.join(" , "),
              zonecountry : countrydefault
            }
            zones.push(zoneobj)
          });
        }

        setMastervalue(zones)
        setFiltervalue(zones)
      })
      .catch(console.error)
  }
  useEffect(() => {
    getmastercountries()
    getmaster()
  }, [])
  function applysearch(searchcontent)
  {
    setSearchtext(searchcontent)
  }
  function addcategory()
  {
    setIsadd(true)
  }
  function cancelcreation()
  {
    setIsadd(false)
  }
 
  async function search(taxcontent)
  {
    const filteredHomes = mastervalue.filter( x => 
      x.name.toLowerCase() ? x.name.toLowerCase().match(taxcontent+ ".*") : null 
    );
    setFiltervalue(filteredHomes)
  }
  return (
    <>
    <Page
    className={classes.root}
    title="Orders Management List"
  >

    {/* <Header onSearch={applysearch} onAdd={addcategory}/> */}
    {/* <Results
       className={classes.results}
      searchtext={searchtext}
      isadd={isadd}
      onCancel={cancelcreation}
    /> */}
    <Breadcrumbs></Breadcrumbs>

        <Mastercontent title= {"Shipping Zones"} button_title="Add New" 
        masters={mastercountries}
        onCreate={createtax} onSearch={search} columns={data.columns} values={filtervalue}/>

    </Page>
    </>
  )
});

export default Shippingzones;