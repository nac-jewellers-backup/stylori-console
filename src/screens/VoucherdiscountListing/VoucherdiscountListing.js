import React,{useState} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Mastercontent from '../../components/Mastercontent/Mastercontent';
import data from "./data.json"
import Page from '../../components/Page/Page'
import { Header, Results } from './components';
const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));
let colimns = [
  "Name",
  "code",
  "description",
  "actions"
]
export const VoucherdiscountListing = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
  const [searchtext, setSearchtext] = useState("");
  const classes = useStyles();


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
  
  return (
    <>
    <Page
    className={classes.root}
    title="Orders Management List"
  >

    <Header  onSearch={applysearch} onAdd={addcategory}/>
    <Results
    title={"Voucher Discount"}
       className={classes.results}
       tablecolumns={colimns}
      searchtext={searchtext}
      isadd={isadd}
      onCancel={cancelcreation}
    />
   
    </Page>
    </>
  )
});

export default VoucherdiscountListing;