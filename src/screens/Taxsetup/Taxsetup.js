import React,{useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Mastercontent from '../../components/Mastercontent';
import data from "./data.json"
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { TaxList, PRODUCTDIAMONDTYPES } from '../../graphql/query';
import { NetworkContext } from '../../context/NetworkContext';


export const Taxsetup = withRouter(props => {
  const [mastervalue, setMastervalue] = React.useState([])
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [filtervalue, setFiltervalue] = React.useState([])

  async function createtax(taxcontent)
  {
    let response =  await sendNetworkRequest('/updatetax', {}, taxcontent)

  }
  async function search(taxcontent)
  {
    const filteredHomes = mastervalue.filter( x => 
      x.hsnNumber ? x.hsnNumber.match(taxcontent+ ".*") : null || 
      x.taxName ?  x.taxName.match(taxcontent+ ".*") : null
    );
    setFiltervalue(filteredHomes)
  }
  useEffect(() => {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: TaxList  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        setMastervalue(fatchvalue.data.allMasterTaxSettings.nodes)
        setFiltervalue(fatchvalue.data.allMasterTaxSettings.nodes)
      })
      .catch(console.error)
  }, [])
  return (
    <>
    <Grid container  spacing={2}>  
   
    {/* <Mastercontent onCancel={canceltaxcreation} isadd={isadd} columns={data.columns}/>  */}
     <Mastercontent onCreate={createtax} onSearch={search} columns={data.columns} values={filtervalue}/>

    </Grid>
    </>
  )
});

export default Taxsetup;