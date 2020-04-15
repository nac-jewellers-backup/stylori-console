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
import Autocomplete from '@material-ui/lab/Autocomplete';

import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { GOLDPRICESETUPMASTER, PRODUCTDIAMONDTYPES } from '../../graphql/query';
import data from "./data.json"
import Page from '../../components/Page'
import { NetworkContext } from '../../context/NetworkContext';
import {Breadcrumbs} from '../../components'
import {Card,TextField,Checkbox} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

export const Goldpriceupdate = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
  const [searchtext, setSearchtext] = useState("");
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [mastervendors, setMastervendors] = React.useState([])
  const [goldprice, setGoldprice] = React.useState({
    cost_price : '',
    selling_price : ''
  })
  const [defaultpurity, setDefaultpurity] = React.useState({})
  const [purityprices, setPurityprices] = React.useState({})
  const [puritysellingprices, setPuritysellingprices] = React.useState({})
  const [defaultmetal, setDefaultmetal] = React.useState({})

  const [selectedvendors, setSelectedvendors] = React.useState([])
  const [materials, setMaterials] = React.useState([])
  
  const [masterpurities, setMasterpurities] = React.useState([])

  const [ispricecalculated, setIspricecalculated] = React.useState(false)

  const classes = useStyles();

  const [filtervalue, setFiltervalue] = React.useState([])

  async function updateprice()
  {
    let bodycondent = {
      costprices : purityprices,
      sellingprices : puritysellingprices,
      vendors : selectedvendors,
      metal : defaultmetal
    }

     let response =  await sendNetworkRequest('/updatevendorgoldprice', {}, bodycondent)
     alert("price updated successfully")
  }
  const handleChange = type => (event) => {
    let vendorids =[]
    selectedvendors.forEach(element => {
      vendorids.push(element)
    })
    if(event.target.checked)
    {

      if(type == 'All')
      {
        mastervendors.forEach(element => {
          vendorids.push(element.shortCode)
        })
        setSelectedvendors(vendorids)
      }else
      {
        vendorids.push(type)
        setSelectedvendors(vendorids)

      }
    }else{
      if(type == 'All')
      {
        setSelectedvendors([])

      }else{

        let indexval = selectedvendors.indexOf(type)
        vendorids.splice(indexval,1)
        let allindexval = selectedvendors.indexOf('All')
        if(allindexval >  -1)
        {
          vendorids.splice(allindexval,1)

        }

        setSelectedvendors(vendorids)

      }
    }
   // setChecked(event.target.checked);
  };
  async function getmaster()
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GOLDPRICESETUPMASTER  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        let allobj =  {
          "name": "All Vendors",
          "id": "All",
          "shortCode": "All"
        }
        let vendors = [];
        vendors.push(allobj)

        setMaterials(fatchvalue.data.allMasterMaterials.nodes)
        setMasterpurities(fatchvalue.data.allMasterMetalsPurities.nodes)
        fatchvalue.data.allMasterVendors.nodes.forEach(vendorobj => {
          vendors.push(vendorobj)
          selectedvendors.push(vendorobj.shortCode)
        })
         setMastervendors(vendors)
      })
      .catch(console.error)
  }
  useEffect(() => {
    getmaster()
  }, [])
  const handleoptionChange = type => (event, value) => {
   // setEditcontent({ ...editcontent, [type]: value  })
   let vendorid = []
   value.forEach(element => {
    vendorid.push(element.shortCode)
   })
   setSelectedvendors(vendorid)
  }
  const handlemetalChange = type => (event, value) => {
    // setEditcontent({ ...editcontent, [type]: value  })
    if(data[value.name])
    {
      setDefaultpurity(data[value.name])

    }

    setDefaultmetal(value)
   //setDefaultpurity(value)
   }
  const handleInputChange = type => event => {
   // setGoldprice(event.target.value);
   //alert(JSON.stringify(goldprice))
    setGoldprice({...goldprice,[type]: event.target.value })
  }
  const handlePriceChange = type => event => {

    // let goldpriceval = purityprices;
    // goldpriceval[type] = event.target.value;

    setPurityprices({...purityprices,[type]:event.target.value});
  }
  const handlesellingPriceChange = type => event => {

    // let goldpriceval = purityprices;
    // goldpriceval[type] = event.target.value;

    setPuritysellingprices({...puritysellingprices,[type]:event.target.value});
  }
  function getgoldvalue()
  {
    if(defaultmetal.name === 'Gold')
    {
       let default_purity = parseInt()
     let pricejson = {}
     let sellingpricejson = {}
    data.goldpurity.forEach(element => {
      let priceratio = element.shortCode / defaultpurity.shortCode;

      let goldprice_val = priceratio*goldprice.cost_price
      let goldsellingprice_val = priceratio*goldprice.selling_price
      sellingpricejson[element.shortCode] = goldsellingprice_val

      pricejson[element.shortCode] = goldprice_val
    })
    setPuritysellingprices(sellingpricejson)
    setPurityprices(pricejson)
    }else{

    }

    
     setIspricecalculated(true)
   
  }

  return (
    <>
    <Page
    className={classes.root}
    title="Orders Management List"
  >
     <Card className={classes.root} variant="outlined">
      <CardContent>
          <Grid container>
          <Grid container item row alignItems="center" >
          <TextField
                            variant="outlined"
                            margin="dense"

                            autoComplete="off"
                            id="vendordeliverydays"
                            name="vendordeliverydays"
                            value={goldprice.cost_price}
                             onChange={handleInputChange("cost_price")}
                            label="Cost Price"
                          />
                <TextField
                            variant="outlined"
                            margin="dense"
                            style={{marginLeft: 16}}
                            autoComplete="off"
                            id="vendordeliverydays"
                            name="vendordeliverydays"
                            value={goldprice.selling_price}
                             onChange={handleInputChange("selling_price")}
                            label="Selling Price"
                          />
               <Autocomplete
                  id="combo-box-demo"
                  options={materials}
                  margin="dense"
                  fullWidth
                  style={{marginLeft: 16}}
                 value={defaultmetal}
                   onChange={handlemetalChange("material")}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} style={{width:200}} margin="dense" label={"Material"} variant="outlined" />}
                /> 
             {defaultpurity.name ?  <Autocomplete
                  id="combo-box-demo"
                  options={masterpurities}
                  margin="dense"
                  fullWidth
                  disabled
                  style={{marginLeft: 16, width:200}}
                  value={defaultpurity}
                   onChange={handleoptionChange("defaultpurity")}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params}  margin="dense" label={"purity"}                   style={{ width:200}}
                  variant="outlined" />}
                />  : null }
                <Button variant="contained" size="small" onClick={getgoldvalue} style={{marginLeft: 16}}  color="primary" >
                  Get Price
               </Button>
          </Grid>
          {ispricecalculated ?
          <>
          {data.goldpurity.map((purityname, index) =>(
            <Grid container item row alignItems="center" >

            <Typography className={classes.title} style={{marginRight: 16}} color="textSecondary" >
               Price for {purityname.name}
             </Typography>
                 
                 <TextField
                     variant="outlined"
                     margin="dense"
                     autoComplete="off"
                     id="vendordeliverydays"
                     name="vendordeliverydays"
                     value={purityprices[purityname.shortCode]}
                      onChange={handlePriceChange(purityname.shortCode)}
                     label="Price"
                   />
                    <TextField
                     variant="outlined"
                     margin="dense"
                     autoComplete="off"
                     style={{marginLeft: 16}}

                     id="vendordeliverydays"
                     name="vendordeliverydays"
                     value={puritysellingprices[purityname.shortCode]}
                      onChange={handlesellingPriceChange(purityname.shortCode)}
                     label="Price"
                   />
   </Grid>
          ))}
          <Grid item xs={12} sm={6} lg={3} >
          <Autocomplete
                  id="combo-box-demo"
                  options={mastervendors}
                    multiple
                  // value={editcontent[columnname.defaultkey]}
                   onChange={handleoptionChange("defaultpurity")}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params}  margin="dense" fullWidth label={"Vendors"} variant="outlined" />}
                /> 
        </Grid>
          </> : null}
          
         </Grid>
         <Grid item  >

         <Button variant="contained"  size="small" onClick={updateprice} style={{marginTop: 16 }}  color="primary" >
                  Update Vendor Gold Price
               </Button>
            </Grid>
      </CardContent>
      </Card>

{/* 
      {ispricecalculated  ? <Card style={{marginTop: 16}}  variant="outlined">
      <CardContent>
          <Grid container>
          
           {mastervendors.map((vendors, index) =>(
            <Grid container item row alignItems="center" >
              <Grid item xs={3} alignItems="center" >

            <Typography className={classes.title} style={{marginRight: 16}} color="textSecondary" >
              {vendors.name}
             </Typography>
             </Grid>
             <Grid item xs={3} alignItems="center" >

             <Checkbox
                 checked={selectedvendors.indexOf(vendors.shortCode) > -1}
                onChange={handleChange(vendors.shortCode)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
                   </Grid>
   </Grid>
          ))}
         </Grid>
         <Button variant="contained"  size="small" onClick={updateprice} style={{marginLeft: 16 , textAlign:"center"}}  color="primary" >
                  Update Vendor Gold Price
               </Button>

      </CardContent>
      </Card> : null}
    */}
    </Page>
    </>
  )
});

export default Goldpriceupdate;