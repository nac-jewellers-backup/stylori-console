import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import moment from 'moment';
import PropTypes from 'prop-types';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';

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
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
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

  const classes = useStyles();

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleSelectAll = event => {
    const selectedOrders = event.target.checked
      ? orders.map(order => order.id)
      : [];

    setSelectedOrders(selectedOrders);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrders.indexOf(id);
    let newSelectedOrders = [];

    if (selectedIndex === -1) {
      newSelectedOrders = newSelectedOrders.concat(selectedOrders, id);
    } else if (selectedIndex === 0) {
      newSelectedOrders = newSelectedOrders.concat(selectedOrders.slice(1));
    } else if (selectedIndex === selectedOrders.length - 1) {
      newSelectedOrders = newSelectedOrders.concat(selectedOrders.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedOrders = newSelectedOrders.concat(
        selectedOrders.slice(0, selectedIndex),
        selectedOrders.slice(selectedIndex + 1)
      );
    }

    setSelectedOrders(newSelectedOrders);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

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
      {/* <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {orders.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(orders.length / rowsPerPage)}
      </Typography> */}
      <Card>
        
        <CardContent className={classes.content}>
          {/* <PerfectScrollbar> */}
            <div className={classes.tableWrapper}>
              <Table className={classes.table} border={1} borderColor={"#ddd"} size="small">
                <TableHead>
                  <TableRow>
                  {props.columnobjs.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.name}
                </TableCell>
              ))}
                    {/* <TableCell>Order ID</TableCell>
                    
                    <TableCell align="left">Order Date</TableCell>
                    <TableCell align="center">Customer Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Mobile</TableCell>
                    <TableCell align="center">Shipping Address</TableCell>
                    <TableCell align="center">Gift Message</TableCell>
                    <TableCell align="center">Payment Type</TableCell>
                    <TableCell align="center">Payment Status</TableCell> */}
                    {/* <TableCell align="center">Waybill No</TableCell>
                    <TableCell align="center">Comments</TableCell>
                    <TableCell align="center">PG Response</TableCell> */}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
                    <TableRow
                      // key={order.id}
                      // selected={selectedOrders.indexOf(order.id) !== -1}
                    >
                      {props.columnobjs.map(col => (
                       
                      <TableCell>{order[col.key]}</TableCell>
                      ))}                      

                      {/* {props.showcolumns.indexOf('Order ID') > -1 ? <TableCell >{order.id}</TableCell> : null }
                      {props.showcolumns.indexOf('Order Date') > -1 ? <TableCell align="left" style = {{width: 120}}>            
                                  <Moment format="DD MMM YYYY hh:mm a">
                                  {order.createdAt}
                                  </Moment>
                                  </TableCell> : null }
                      {props.showcolumns.indexOf('Customer Name') > -1 ? <TableCell align="left">{order.shoppingCartByCartId.userProfileByUserprofileId ? order.shoppingCartByCartId.userProfileByUserprofileId.firstName : ''}</TableCell> :  null}
                      {props.showcolumns.indexOf('Email') > -1 ? <TableCell align="left" style = {{width: 40}}>{order.shoppingCartByCartId.userProfileByUserprofileId ? order.shoppingCartByCartId.userProfileByUserprofileId.email : ''}</TableCell> : null}
                      {props.showcolumns.indexOf('Phone Number') > -1 ? <TableCell align="left" style = {{width: 40}}>{order.shoppingCartByCartId.userProfileByUserprofileId ? order.shoppingCartByCartId.userProfileByUserprofileId.mobile : ''}</TableCell> : null }
                      {props.showcolumns.indexOf('Shipping Address') > -1 ?  <TableCell align="left">{order.shoppingCartByCartId.cartAddressesByCartId.nodes.length > 0 ? order.shoppingCartByCartId.cartAddressesByCartId.nodes[0].addressline1 : ''}</TableCell> : null }
                      {props.showcolumns.indexOf('Gift Message') > -1 ? <TableCell align="left">{order.shoppingCartByCartId.giftwrapsByCartId.nodes.length > 0 ? order.shoppingCartByCartId.giftwrapsByCartId.nodes[0].message : ''}</TableCell> : null }
                      {props.showcolumns.indexOf('Payment Type') > -1 ? <TableCell >{order.paymentMode}</TableCell> : null }
                      {props.showcolumns.indexOf('Payment Status') > -1 ? <TableCell >{order.paymentStatus}</TableCell> : null }
                      {props.showcolumns.indexOf('Waybill No') > -1 ? <TableCell >{order.waybill}</TableCell> : null }
                      {props.showcolumns.indexOf('Comments') > -1 ? <TableCell >{order.comments}</TableCell> : null }
                      {props.showcolumns.indexOf('Pg Response') > -1 ? <TableCell >{order.pgresponse}</TableCell> : null }
                      {props.showcolumns.indexOf('SKUs') > -1 ? <TableCell >{order.skus}</TableCell> : null } */}

                      {/* <TableCell align="center">
                      <IconButton aria-label="add to favorites">
                        <CreateIcon />
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                        <DeleteIcon />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  ))}
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
            rowsPerPageOptions={[50, 100, 250]}
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
