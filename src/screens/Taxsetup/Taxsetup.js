import React,{useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Query, withApollo } from 'react-apollo';

import Mastercontent from '../../components/Mastercontent';
import data from "./data.json"
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { TaxList, CREATETAXSETUP } from '../../graphql/query';
import { NetworkContext } from '../../context/NetworkContext';


export const Taxsetup = withRouter(props => {
  const [mastervalue, setMastervalue] = React.useState([])
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [filtervalue, setFiltervalue] = React.useState([])

  async function createtax(taxcontent)
  {
    let response =  await sendNetworkRequest('/managetaxsetup', {}, taxcontent)
   // alert(JSON.stringify(response))
    getmaster()
  } 
  

  // async function createtax(taxcontent){
    
  //   let variables ={
     
  //      taxValue: taxcontent.taxValue, 
  //      taxName: taxcontent.taxName,
  //     hsnNumber: taxcontent.hsnNumber
  //   }
  //   console.log()
  //   // await props.client.mutate({mutation:CREATETAXSETUP,variables}).then(res=>{

  //   //   if(res!==null){
        
  //   //   }
  //   // }).catch(console.error)
  
  // }
  async function search(taxcontent)
  {
    const filteredHomes = mastervalue.filter( x => 
      x.hsnNumber ? x.hsnNumber.match(taxcontent+ ".*") : null || 
      x.taxName ?  x.taxName.match(taxcontent+ ".*") : null
    );
    setFiltervalue(filteredHomes)
  }
  async function getmaster()
  {
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
  }
  useEffect(() => {
    getmaster()
  }, [])
  return (
    <>
    <Grid container  spacing={2}>  
   
    {/* <Mastercontent onCancel={canceltaxcreation} isadd={isadd} columns={data.columns}/>  */}
     <Mastercontent title={"Tax Setup"} button_title={"Add new"} onCreate={createtax} onSearch={search} columns={data.columns} values={filtervalue}/>

    </Grid>
    </>
  )
});

export default withApollo(Taxsetup);