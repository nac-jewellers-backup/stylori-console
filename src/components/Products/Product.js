import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { Query, withApollo } from 'react-apollo';
import {PRODUCTLIST,PRODUCTLISTSTATUSEDIT} from '../../graphql/query';
import { useHistory } from "react-router-dom";
import { Button, Switch } from '@material-ui/core';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Moment from 'react-moment';

const columns = [
  { id: 'Product Id', label: 'Product Id' },
  { id: 'name', label: 'Name' },
  { id: 'Product type', label: 'Product type' },
  { id: 'Product Category', label: 'Product Category' },
  { id: 'CreatedAt', label: 'CreatedAt' }
];

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function createData(name, calories, fat) {
  return { name, calories, fat };
}



const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const   AddContact=(props)=> {
  let history = useHistory();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [pageCount,setPageCount] = React.useState(0);
  const [offsetValue,setOffsetValue] = React.useState(0)
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.contactlist.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
    setOffsetValue(newPage*rowsPerPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  function ProductEdit(id){
    // localStorage.setItem('productEditId',id);
    history.push(`product_attributes/${id}`)
  }
  // function productItemStatusChange(id,isactive){
    // let variable = {
    //   "productId": id
    // };
    // let status = isactive ? variable.isActive = false :variable.isActive = true;
    async function productItemStatusChange(id,isactive,refetch){
      let variables ={
        productId:id,
        isActive:isactive ?false:true
      }
      await props.client.mutate({mutation:PRODUCTLISTSTATUSEDIT,variables}).then(res=>{

        if(res!==null){
          refetch();
        }
      }).catch(console.error)
    
    }
    // const [productItemStatusChange,{ data }] = useMutation(PRODUCTLISTSTATUSEDIT);
  // }
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} stickyHeader>
        <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
 
          <TableBody>
          <Query
              query={PRODUCTLIST}
              onCompleted={data => setPageCount( data.allProductLists.totalCount )}
              variables={{ "Veiw": rowsPerPage, "Offset": offsetValue}}>
              {
                  ({ data, loading, error, refetch }) => {
                    debugger
                      if (loading) {
                          // return <Loader />
                      }
                      if (error) {
                        return <div>{error}</div>
                          // return false
                      }
                      if (data) {
                          return <>
                              {data.allProductLists.nodes.map((row, index) => (
                                  <TableRow key={row.name}>
                                  <TableCell component="th" scope="row">
                                    {row.productId}
                                    <Button onClick={(e) => ProductEdit(row.productId)}>
                                    <EditIcon />
                                  </Button>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                     
                                    <Link target='blank_' href={row.transSkuListsByProductId.nodes.length > 0 ? 'https://www.stylori.com/'+row.transSkuListsByProductId.nodes[0].skuUrl : '-'}  variant="body2">
                                    {row.productName}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">{row.productType}</TableCell>
                                  <TableCell align="left">{row.productCategory}</TableCell>
                                  <TableCell align="left">            
                                  <Moment format="DD MMM YYYY hh:mm a">
                                  {row.createdAt}
                                  </Moment>
                                  </TableCell>
                                  
                                </TableRow>
                              ))}
                          </>
                      }
                      else{
                      return <div>data:{data}</div>
                      }
                  }}
          </Query>
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[50,100,200,500]}
                colSpan={5}
                count={pageCount}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
}
export default withApollo(AddContact);
