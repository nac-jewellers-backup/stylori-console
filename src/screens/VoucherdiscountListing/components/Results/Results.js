import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import moment from 'moment';
import { Query, withApollo } from 'react-apollo';
import {VOUCHERDISCOUNTS,DELETEVOUCHERDISCOUNT,VOUCHERSTATUSEDIT} from '../../../../graphql/query'
import ConformationAlert from '../../../../components/ConformationAlert'
import { useHistory } from "react-router-dom";

import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/Save';
import VisibleIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import CreateIcon from '@material-ui/icons/Create';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  Table,
  TextField,
  FormControlLabel,
  Switch,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  colors
} from '@material-ui/core';

import { Label, ReviewStars } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  },
  actions: {
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, orders, ...rest } = props;
  const [pageCount,setPageCount] = React.useState(0);
  const [offsetValue,setOffsetValue] = React.useState(0)
  let history = useHistory();

  const [btnEdit, setBtnEdit] = React.useState({
    action: false,
    id: ''
  })
  const [isconformation,setIsconformation] = React.useState(false)

  
  const [editcontent,setEditcontent] = React.useState({})

  const classes = useStyles();
  const [deleteid, setDeleteid] = React.useState('');

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleInputChange = type => e => {
    setEditcontent({ ...editcontent, [type]: e.target.value  })
}
function handleEdit(diamondData) {

history.push(`voucherdiscount/${diamondData.id}`)
}
function handleDelete(diamondData) {

  setDeleteid(diamondData.id)
  setIsconformation(true);
}
 async function handledelete(datacontent,refetch)
  {
    let variables ={
      elementId:deleteid
    }
    await props.client.mutate({mutation:DELETEVOUCHERDISCOUNT,variables}).then(res=>{

      if(res!==null){
        refetch();
        // refetchval()
      }
    }).catch(err => {

    })
    setIsconformation(false);

  }
  function Editvendor(vendordata) {
    setEditcontent({
      ...editcontent,
      alias : vendordata.alias,
      name : vendordata.name,
      isedit: true
    })
    setBtnEdit({ ...btnEdit, id:vendordata.shortCode, action: true })

  }
  async function Savevendor(refetch) {
  }
  function CancelEdit(diamondData) {
    setBtnEdit({ ...btnEdit, id:'', action: false })
  }
  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const hidedeleteconformation = () => {
    setIsconformation(false);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };
  function Cancelcreate() {
    setBtnEdit({ ...btnEdit, id:'', action: false })    
    props.onCancel();

  }
  async function handledelete(datacontent,refetch)
  {
   
    let variables ={
      elementId:deleteid
    }
    await props.client.mutate({mutation:DELETEVOUCHERDISCOUNT,variables}).then(res=>{

      if(res!==null){
        refetch();
        // refetchval()
      }
    }).catch(err => {

    })
    setIsconformation(false);

  }
  function handleChange(event,voucherid, refetch)
  {
    handlestatusChange(voucherid,event.target.checked, refetch)
  }

  async function handlestatusChange(id,isactive,refetch){
    let variables ={
      voucherId:id,
      isActive:isactive
    }
    await props.client.mutate({mutation:VOUCHERSTATUSEDIT,variables}).then(res=>{

      if(res!==null){
        refetch();
      }
    }).catch(console.error)
  
  }
  const paymentStatusColors = {
    canceled: colors.grey[600],
    pending: colors.orange[600],
    completed: colors.green[600],
    rejected: colors.red[600]
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
  
      <Card>
        <CardHeader
          title={props.title}
        />
        <Divider />
        <CardContent className={classes.content}>
          {/* <PerfectScrollbar> */}
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    {props.tablecolumns.map((row, index) => (
                          <TableCell>{row}</TableCell>
                    ))}   
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                { <Query
                    query={VOUCHERDISCOUNTS}
                    onCompleted={data => setPageCount( data.allVouchers.totalCount)}
                    variables={{ "Veiw": rowsPerPage, "Offset": offsetValue}}>
                    {
                        ({ data, loading, error, refetch }) => {
                            if (loading) {
                                // return <Loader />
                            }
                            if (error) {
                              return <div>{error}</div>
                                // return false
                            }
                            if (data) { 
                                return <> 
                                 <ConformationAlert 
                                    title={"Are you sure to delete?"} 
                                    positivebtn={"Yes"} 
                                    negativebtn={"No"} 
                                    message={""} 
                                    data={deleteid}
                                    refetch={refetch}
                                    onSuccess={handledelete}
                                    onCancel={hidedeleteconformation}
                                    isshow={isconformation} />
                                {data.allVouchers.nodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                 <>
                                  <TableRow key={row.name}>
                                    <TableCell align="left">
                                    {row.name}
                                              </TableCell>
                                              <TableCell align="left">
                                              {row.code}
                                              </TableCell>
                                              <TableCell align="left">
                                              {row.description}
                                              </TableCell>
                                              <TableCell align="left">
                                              {row.uses} / {row.maxUses}
                                              </TableCell>
                                              <TableCell align="left"> <FormControlLabel
                                                    label={row.isActive ? "" : ""}

                                                    control={
                                                      <Switch checked={row.isActive}  name="checkedA" 
                                                      onChange={(event) => handleChange(event,row.id,refetch)} 
                                                      />
                                                    }
                                                  /></TableCell>
                                    <TableCell align="center" onClick={(e) => handleEdit(row,refetch)} style = {{width: 20}}>
                                      <Button ><VisibleIcon />
                                      </Button>
                                    </TableCell>
                                    </TableRow>
                                    </>

                                      ))}
                         </> 
                       }
                      else{
                      return <div>{"Fetch Products"}</div>
                     
                 } } }
                </Query>  }
                </TableBody>
              </Table>
            </div>
          {/* </PerfectScrollbar> */}
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={pageCount}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      {/* <TableEditBar selected={selectedOrders} /> */}
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

Results.defaultProps = {
  orders: []
};

export default withApollo(Results);
