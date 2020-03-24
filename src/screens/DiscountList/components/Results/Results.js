import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import moment from 'moment';
import { Query, withApollo } from 'react-apollo';
import {SALEDISCOUNTS,DELETESALEDISCOUNT} from '../../../../graphql/query'
import ConformationAlert from '../../../../components/ConformationAlert'

import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
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
function handleDelete(diamondData) {

  setDeleteid(diamondData.id)
  setIsconformation(true);
}
 async function handledelete(datacontent,refetch)
  {
    let variables ={
      elementId:deleteid
    }
    await props.client.mutate({mutation:DELETESALEDISCOUNT,variables}).then(res=>{

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
    await props.client.mutate({mutation:DELETESALEDISCOUNT,variables}).then(res=>{

      if(res!==null){
        refetch();
        // refetchval()
      }
    }).catch(err => {

    })
    setIsconformation(false);

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
                    query={SALEDISCOUNTS}
                    onCompleted={data => setPageCount( data.allSaleDiscounts.totalCount )}
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
                                {data.allSaleDiscounts.nodes.map((row, index) => (
                                  
                                 <>

                                  <TableRow key={row.name}>
                                  <TableCell align="left">{row.discountName} 
                                              </TableCell>
                                    <TableCell align="left">{row.components.join(' , ')} 
                                              </TableCell>
                                              <TableCell align="left">{row.discountType == 2 ? row.discountValue+'%' : row.discountValue} 
                                              </TableCell>
                                              <TableCell align="left">{row.productAttributesText ? row.productAttributesText : ""
                                              } 
                                              </TableCell>
                                    <TableCell align="center" onClick={(e) => handleDelete(row,refetch)} style = {{width: 20}}>
                                      <Button ><DeleteIcon />
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
            count={orders.length}
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
