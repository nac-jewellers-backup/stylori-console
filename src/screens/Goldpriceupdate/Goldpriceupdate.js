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
import { MASTERVENDORS, PRODUCTDIAMONDTYPES } from '../../graphql/query';
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
  const [goldprice, setGoldprice] = React.useState('')
  const [defaultpurity, setDefaultpurity] = React.useState({})
  const [purityprices, setPurityprices] = React.useState({})
  const [selectedvendors, setSelectedvendors] = React.useState([])

  const [ispricecalculated, setIspricecalculated] = React.useState(false)

  const classes = useStyles();

  const [filtervalue, setFiltervalue] = React.useState([])

  async function updateprice()
  {
    let bodycondent = {
      prices : purityprices,
      vendors : selectedvendors
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
      body: JSON.stringify({ query: MASTERVENDORS  })
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
        fatchvalue.data.allMasterVendors.nodes.forEach(vendorobj => {
          vendors.push(vendorobj)
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
   setDefaultpurity(value)
  }
  const handleInputChange = type => event => {
    setGoldprice(event.target.value);
  }
  const handlePriceChange = type => event => {

    // let goldpriceval = purityprices;
    // goldpriceval[type] = event.target.value;

    setPurityprices({...purityprices,[type]:event.target.value});
  }
  function getgoldvalue()
  {
    // alert(JSON.stringify(goldprice))
    // alert(JSON.stringify(defaultpurity))
     let default_purity = parseInt()
     let pricejson = {}
    data.purity.forEach(element => {
      let priceratio = element.values / defaultpurity.values;
      let goldprice_val = priceratio*goldprice
      pricejson[element.values] = goldprice_val
    })
    setPurityprices(pricejson)
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
                            value={goldprice}
                             onChange={handleInputChange("goldprice")}
                            label="Gold Price"
                          />
               <Autocomplete
                  id="combo-box-demo"
                  options={data.purity}
                  margin="dense"
                  fullWidth
                  style={{marginLeft: 16}}
                  // value={editcontent[columnname.defaultkey]}
                   onChange={handleoptionChange("defaultpurity")}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params}  margin="dense" label={"choose purity"} variant="outlined" />}
                /> 
                <Button variant="contained" size="small" onClick={getgoldvalue} style={{marginLeft: 16}}  color="primary" >
                  Get Price
               </Button>
          </Grid>
          {ispricecalculated ?
          <>
          {data.purity.map((purityname, index) =>(
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
                     value={purityprices[purityname.values]}
                      onChange={handlePriceChange(purityname.values)}
                     label="Price"
                   />
   </Grid>
          ))}
          </> : null}
           
         </Grid>
      </CardContent>
      </Card>


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
   
    </Page>
    </>
  )
});

export default Goldpriceupdate;