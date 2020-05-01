import React,{useState,useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Attributescontent from './Attributescontent/Attributescontent';
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { SHIPPINGCHARGES, ACTIVESHIPPINGZONES } from '../../graphql/query';
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

export const Taxattributes = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
  const [searchtext, setSearchtext] = useState("");
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [masters, setMasters] = React.useState({})
  const [mastervalue, setMastervalue] = React.useState([])

  
  const classes = useStyles();

  const [filtervalue, setFiltervalue] = React.useState([])

  
  async function createtax(taxcontent)
  {
    console.log(JSON.stringify(taxcontent))
    let response =  await sendNetworkRequest('/manageshipmentsettings', {}, taxcontent)
     getmaster()
  }
  async function getmastervalues()
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: ACTIVESHIPPINGZONES  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
      
        setMasters({
          "zones":fatchvalue.data.allShippingZones.nodes,
          "ranges":[{
            "id":1,
            "name":"By Weight"
          },{
            "id":1,
            "name":"By Value"
          }]
        })

      })
      .catch(console.error)

  }
  async function getmaster()
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: SHIPPINGCHARGES  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        let shipmentcharges = []

        if(fatchvalue.data.allShippingCharges.nodes)
        {

          fatchvalue.data.allShippingCharges.nodes.forEach(element => {
            let shipobj = {}
            shipobj['id'] = element.id;

            shipobj['name'] = element.name;
            shipobj['rangeFrom'] = element.rangeFrom;
            shipobj['rangeTo'] = element.rangeTo;
            shipobj['shipmentCharge'] = element.shipmentCharge;
            shipobj['displayAttributes'] = element.displayAttributes;

            shipobj['isActive'] = element.isActive;
            
                if(element.shippingZoneByZoneId)
                {
                  let zines_arr = []
                  zines_arr.push(element.shippingZoneByZoneId)
                  shipobj['shippingzones'] = element.shippingZoneByZoneId
                  shipobj['zone'] = element.shippingZoneByZoneId.name

                }

                if(element.chargeType == 1)
                {
                  shipobj['rangetype'] = {
                    "id":1,
                    "name":"By Weight"
                  }
                  shipobj['range'] = "By Weight"
                }else{
                  shipobj['rangetype'] = {
                    "id":2,
                    "name":"By Value"
                  }
                  shipobj['range'] = "By Value"
                }
                shipmentcharges.push(shipobj)
          });
        }
        setMastervalue(shipmentcharges)
        setFiltervalue(shipmentcharges)
      })
      .catch(console.error)
  }
  useEffect(() => {
    alert("i mahe etr")
    getmastervalues()
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

        <Attributescontent title= {"Tax Attributes"} 
        masters={masters}
        button_title="Add New" onCreate={createtax} onSearch={search} columns={data.columns} values={filtervalue}/>

    </Page>
    </>
  )
});

export default Taxattributes;