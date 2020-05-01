import React,{useState,useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { SHIPPINGCHARGES, ACTIVESHIPPINGZONES } from '../../graphql/query';
import { SHIPPINGMASTER, TAXMASTER } from '../../services/queries';
import { useHistory } from "react-router-dom";

import data from "./data.json"
import Page from '../../components/Page'
import { NetworkContext } from '../../context/NetworkContext';
import {Breadcrumbs} from '../../components'
import {AttributesComponent} from './components'
import { parse } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

export const Addtaxattributes = withRouter(props => {
  let history = useHistory()
  const [isadd, setIsadd] = React.useState(false)
  const [rateid, setRateid] = React.useState('')

  const [searchtext, setSearchtext] = useState("");
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [masters, setMasters] = React.useState({})
  const [mastervalue, setMastervalue] = React.useState([])
  const [selectedrate, setSelectedrate] = React.useState({})
  const [selectedattr, setSelectedattr] = React.useState({})
  const [isloaded, setIsloaded] = React.useState(false)

  const classes = useStyles();

  const [filtervalue, setFiltervalue] = React.useState([])

  function addattributes(value)
  {

    let attrs = []
  let display_arr = []
    let keys = Object.keys(value);
    keys.forEach(key => {
      let values = []
      let alias_arr = []
      value[key].forEach(valueobj =>{
        values.push(valueobj.name)
        alias_arr.push(valueobj.alias)
        attrs.push(valueobj.name)
      })
      
      let displaytext = key + ' : ' + values.join(' , ')
      display_arr.push(displaytext)
    })

  updateattributes(value,display_arr.join(' | '))

  }
  async function updateattributes(taxcontent,displaytext)
  {
    let reqbody = {
      rateid : rateid,
      attributes : taxcontent,
      display_text : displaytext
    } 

    let response =  await sendNetworkRequest('/manageshippingattributes', {}, reqbody)
    //  getmaster()
     //   alert(JSON.stringify(response))
     history.push('/shippingattributes')
    
  }
  async function getmastervalues(ratevalue)
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: TAXMASTER  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        let selectedattributes = [];
        const diamondtypes = fatchvalue.data.allMasterDiamondTypes.nodes.map(_ => ({
          ..._,
          "alias": _.shortCode,
          "diamondtype":_.diamondColor+_.diamondClarity
      }))
        if(fatchvalue.data.allMasterTaxSettings.nodes.length == 0)
        {
          setMasters({
            product_categories : fatchvalue.data.allMasterProductCategories.nodes,
            product_types : fatchvalue.data.allMasterProductTypes.nodes,
            materials :  fatchvalue.data.allMasterMaterials.nodes,
            purities :  fatchvalue.data.allMasterMetalsPurities.nodes,
            diamondtypes : diamondtypes,
            collections : fatchvalue.data.allMasterCollections.nodes,
            occations : fatchvalue.data.allMasterOccasions.nodes,
            styles : fatchvalue.data.allMasterStyles.nodes,
            themes : fatchvalue.data.allMasterThemes.nodes,
            shiprates : fatchvalue.data.allMasterTaxSettings.nodes
          })
          setIsloaded(true)
        }
        fatchvalue.data.allMasterTaxSettings.nodes.forEach(element => {
           
          if(element.id == ratevalue)
          {
            let attr = {}
            setSelectedrate(element)
            let categories = element.productAttributes;

            var selectedcategory = []
            alert(JSON.stringify(fatchvalue.data.allMasterProductCategories.nodes))
            
            fatchvalue.data.allMasterProductCategories.nodes.forEach(catobj => {
              if(categories)
              {
                if(categories.indexOf(catobj.alias) > -1)
                {
                  selectedcategory.push(catobj)
                }
              }
              

            })

            attr['category'] = selectedcategory
            selectedcategory = []
            fatchvalue.data.allMasterProductTypes.nodes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })

            attr['product_types'] = selectedcategory

            selectedcategory = []
            fatchvalue.data.allMasterMaterials.nodes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })

            attr['materials'] = selectedcategory
            selectedcategory = []
            fatchvalue.data.allMasterMetalsPurities.nodes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })
            
            attr['purities'] = selectedcategory
            selectedcategory = []
            fatchvalue.data.allMasterCollections.nodes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })

            attr['collections'] = selectedcategory
            selectedcategory = []
            fatchvalue.data.allMasterOccasions.nodes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })

            attr['occations'] = selectedcategory
            selectedcategory =[]
            fatchvalue.data.allMasterStyles.nodes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })
            
            attr['styles'] = selectedcategory
            selectedcategory =[]
            fatchvalue.data.allMasterThemes.nodes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })

            attr['themes'] = selectedcategory
            selectedcategory =[]
            diamondtypes.forEach(catobj => {
              if(categories)
              {
              if(categories.indexOf(catobj.alias) > -1)
              {
                selectedcategory.push(catobj)
              }
            }
            })
            
            attr['components'] = selectedcategory
            setSelectedattr(attr)
          }
          setMasters({
            product_categories : fatchvalue.data.allMasterProductCategories.nodes,
            product_types : fatchvalue.data.allMasterProductTypes.nodes,
            materials :  fatchvalue.data.allMasterMaterials.nodes,
            purities :  fatchvalue.data.allMasterMetalsPurities.nodes,
            diamondtypes : diamondtypes,
            collections : fatchvalue.data.allMasterCollections.nodes,
            occations : fatchvalue.data.allMasterOccasions.nodes,
            styles : fatchvalue.data.allMasterStyles.nodes,
            themes : fatchvalue.data.allMasterThemes.nodes,
            shiprates : fatchvalue.data.allMasterTaxSettings.nodes
          })
          setIsloaded(true)
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
    let prod_id = props.location.pathname.split('/')[2];
    setRateid(prod_id)
    getmastervalues(prod_id)
   // getmaster()
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
    
 {isloaded ?  <AttributesComponent isedit={false} attributes={selectedattr ? selectedattr : {}} selectedrate={selectedrate} masters={masters} onAdded={addattributes} className={classes.aboutvoucher} /> : null} 

    </Page>
    </>
  )
});

export default Addtaxattributes;