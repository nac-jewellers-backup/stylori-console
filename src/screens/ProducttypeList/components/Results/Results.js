import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import moment from 'moment';
import { Query, withApollo } from 'react-apollo';
import {PRODUCTTYPEMASTER} from '../../../../graphql/query'
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
  const [editcontent,setEditcontent] = React.useState({})

  const classes = useStyles();

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleInputChange = type => e => {
    setEditcontent({ ...editcontent, [type]: e.target.value  })
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

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };
  function Cancelcreate() {
    setBtnEdit({ ...btnEdit, id:'', action: false })    
    props.onCancel();

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
          title="Category"
        />
        <Divider />
        <CardContent className={classes.content}>
          {/* <PerfectScrollbar> */}
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    
                    <TableCell>Name</TableCell>
                    
                    <TableCell align="left">Alias</TableCell>

                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { <Query
                    query={PRODUCTTYPEMASTER}
                    onCompleted={data => setPageCount( data.allMasterProductTypes.totalCount )}
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

                                {data.allMasterProductTypes.nodes.map((row, index) => (
                                 <>
                                 {index == 0 && props.isadd ? 
                                 <TableRow key={row.name}>
                                 <TableCell align="left">
                                 <TextField
                                    variant="outlined"
                                    margin="dense"
                                    contentEditable={false}
                                    id="vendordeliverydays"
                                    name="vendordeliverydays"
                                    value={props.newvendorcode}
                                    onChange={handleInputChange('shortCode')}
      
                                    label="Vendor Code"
                                   />
                                   </TableCell>
                                 <TableCell align="left">
                                 <TextField
                                    variant="outlined"
                                    margin="dense"
                                    contentEditable={false}
                                    id="vendordeliverydays"
                                    name="vendordeliverydays"
                                    value={props.newvendorcode}
                                    onChange={handleInputChange('shortCode')}
      
                                    label="Vendor Code"
                                   />
                                   </TableCell>
                                          
                                  <TableCell  style = {{width: 20}} align="center">
                                    <Button  onClick={(e) => Savevendor(refetch)}><SaveIcon />
                                    </Button>
                                    <Button onClick={(e) => Cancelcreate()}><CancelIcon />
                                    </Button>
                                  </TableCell>
                                   </TableRow>
                                  : null }
                                 <TableRow key={row.name}>

                                
                                 {
                                btnEdit.action && btnEdit.id == row.shortCode && !props.isadd ? 
                                <TableCell align="left">
                                    <TextField
                                      variant="outlined"
                                      margin="dense"
                                      fullWidth
                                      id="categoryname"
                                      name="categoryname"
                                      value={editcontent.name}
                                      onChange={handleInputChange('name')}                        
                                      label="Name"
                                      /> </TableCell> :  <TableCell align="left">{row.name} 
                                        </TableCell> }
                                        {
                                      btnEdit.action && btnEdit.id == row.shortCode && !props.isadd ? 
                                      <TableCell align="left">
                                      <TextField
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                            id="alias"
                                            name="alias"
                                            value={editcontent.alias}
                                            onChange={handleInputChange('alias')}  
                                                                  label="alias"
                                            /> </TableCell> :  <TableCell align="left">{row.alias} 
                                              </TableCell> }
                                  {btnEdit.action && btnEdit.id == row.shortCode && !props.isadd ?
                                    <TableCell  style = {{width: 20}} align="center">
                                      <Button  onClick={(e) => Savevendor(refetch)}><SaveIcon />
                                      </Button>
                                      <Button onClick={(e) => CancelEdit(row)}><CancelIcon />
                                      </Button>
                                    </TableCell> :
                                    <TableCell align="center" onClick={(e) => Editvendor(row)} style = {{width: 20}}>
                                      <Button ><EditIcon />
                                      </Button>
                                    </TableCell>}
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

export default Results;
