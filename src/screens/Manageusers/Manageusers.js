import React,{useState,useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Vendor from '../../components/Vendor/Vendor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Mastercontent from './Mastercontent';
import { API_URL, GRAPHQL_DEV_CLIENT } from '../../config';
import { MASTERCATEGORIES, PRODUCTDIAMONDTYPES } from '../../graphql/query';
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

export const Manageusers = withRouter(props => {
  const [isadd, setIsadd] = React.useState(false)
  const [searchtext, setSearchtext] = useState("");
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [mastervalue, setMastervalue] = React.useState([])
  const [masterroles, setMasterroles] = React.useState([])
  const [totalcount, setTotalcount] = React.useState(0)

  const [bodycontent, setBodycontent] = React.useState({
    "seacrchtext" : '',
    "size": 50,
    "offset":0
  })

  const classes = useStyles();

  const [filtervalue, setFiltervalue] = React.useState([])

  async function createtax(taxcontent)
  {
    let roles = []
    taxcontent.roles.forEach(element => {
      roles.push(element.name)
    })
    let bodydata = { 
      username : taxcontent.username,
      password : '123456789',
      email: taxcontent.email,
      roles : roles

    }

    let response =  await sendNetworkRequest('/api/auth/signup', {}, bodydata)
     getmaster()
  }
  async function getmasterroles()
  {

    let response =  await sendNetworkRequest('/getmasterroles', {}, {})
  
    
    setMasterroles(response.roles) 

     getmaster(50,0)
  }
  function changeresult(filtercontent)
  {
    setBodycontent(filtercontent)
  }
  async function getmaster(size,offset,searchtext)
  {
   
    let response =  await sendNetworkRequest('/getwebusers', {}, {size,offset,searchtext})
    let adminusers = response.users.rows;
    let users = []
    setTotalcount(response.users.count)
    adminusers.forEach(element => {
      //   let userobj = {}
      //   userobj['id'] = element.id;
      //  // userobj['username'] = element.username;
      //  // userobj['password'] = element.password;
      //   userobj['email'] = element.email;
      //   userobj['mobile'] = element.mobile;
      //   userobj['status'] = element.status === 'Active' ? true : false;
      //   let roles = []
      //   let rolesnames = []

      //   let userroles = element.user_roles;
      //   userroles.forEach(userroleobj => {

      //     let roleobj = {}
      //     roleobj['id'] = userroleobj.master_role.id
      //     roleobj['name'] = userroleobj.master_role.name
      //     roles.push(roleobj)
      //     rolesnames.push(userroleobj.master_role.name)
      //   })
      //   userobj['roles'] = roles
      //   userobj['rolenames'] = rolesnames.join(' , ')
        if(element.orders)
        {
          element['orders'] = element.orders.length
        }else{
          element['orders'] = 0
        }
        users.push(element)
    });

    setFiltervalue(users)
    setMastervalue(users)
    //getmaster()
  }
  useEffect(() => {
    getmasterroles()
  }, [])

  function applysearch(searchcontent)
  {
    //setSearchtext(searchcontent)
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
    getmaster(bodycontent.size,bodycontent.offset,taxcontent)
  }
  async function changepageoffset(taxcontent)
  {
    setBodycontent({...bodycontent,offset: taxcontent})
    getmaster(bodycontent.size,taxcontent,bodycontent.seacrchtext)
  }
  async function changepagesize(taxcontent)
  {
    setBodycontent({...bodycontent,size: taxcontent})
    getmaster(taxcontent,bodycontent.offset,bodycontent.seacrchtext)
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
        <Mastercontent title= {"Website Users"} totalcount={totalcount} fitltercontent={bodycontent}  onCreate={createtax} onSearch={search} onPagechange={changepageoffset} onPagesizechange={changepagesize} columns={data.columns} masters={masterroles} values={filtervalue} />

    </Page>
    </>
  )
});

export default Manageusers;