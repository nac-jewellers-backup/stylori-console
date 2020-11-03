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
import { DIAMONDMASTER, PRODUCTDIAMONDTYPES } from '../../graphql/query';
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

export const Masterdiamonds = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
  const [searchtext, setSearchtext] = useState("");
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [mastervalue, setMastervalue] = React.useState([])

  const classes = useStyles();

  const [filtervalue, setFiltervalue] = React.useState([])

  
  async function createtax(taxcontent)
  {

    let response =  await sendNetworkRequest('/managediamondtypes', {}, taxcontent)
     getmaster()
  }
  async function getmaster()
  {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: DIAMONDMASTER  })
    };
    // console.log("helo",setProductCtx)
    fetch(url, opts)
      .then(res => res.json())
      .then(fatchvalue => {
        setMastervalue(fatchvalue.data.allMasterDiamondTypes.nodes)
        setFiltervalue(fatchvalue.data.allMasterDiamondTypes.nodes)
      })
      .catch(console.error)
  }
  useEffect(() => {
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
      x.diamondColor &&  x.diamondColor.toLowerCase().match(taxcontent+ ".*") ||
      x.diamondClarity && x.diamondClarity.toLowerCase().match(taxcontent+ ".*")
    );
    setFiltervalue(filteredHomes)
  }
  return (
    <>
    <Page
    className={classes.root}
    title="Orders Management List"
  >
<Breadcrumbs></Breadcrumbs>

    {/* <Header onSearch={applysearch} onAdd={addcategory}/> */}
    {/* <Results
       className={classes.results}
      searchtext={searchtext}
      isadd={isadd}
      onCancel={cancelcreation}
    /> */}
        <Mastercontent title= {"Master Diamonds"} button_title="Add New" onCreate={createtax} onSearch={search} columns={data.columns} values={filtervalue}/>

    </Page>
    </>
  )
});

export default Masterdiamonds;