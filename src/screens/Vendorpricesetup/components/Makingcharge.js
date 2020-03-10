import React,{ useEffect} from 'react';
import clsx from 'clsx';
import {lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Toolbar from '@material-ui/core/Toolbar';
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
import { Input} from '@material-ui/core';
import { Query, withApollo } from 'react-apollo';
import {MAKINGCHARGEPRICELIST,PRODUCTLISTSTATUSEDIT} from '../../../graphql/query';
import { useHistory } from "react-router-dom";
import { Button, Switch } from '@material-ui/core';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Moment from 'react-moment';
import {BASE_URL} from '../../../config'
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Filterandsearch from './../../../screens/Productlist/filterandsearch';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/Save';
import { NetworkContext } from '../../../context/NetworkContext';

import Autocomplete from '@material-ui/lab/Autocomplete';
import {
 
  Chip,
  TextField
} from '@material-ui/core';
const columns = [
  { id: 'Metal', label: 'Metal' },
  { id: 'Purity', label: 'Purity' },
  { id: 'From Weight', label: 'From Weight' },
  { id: 'To weight', label: 'To weight' },
  { id: 'Cost Price', label: 'Cost Price' },
  { id: 'Selling Price', label: 'Selling Price' },

  { id: 'Price Type', label: 'Price Type' },
  { id: 'updatedAt', label: 'updatedAt' },
  { id: 'Edit', label: 'Edit' }

];

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));
function createData(name, calories, fat) {
  return { name, calories, fat };
}
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
       
        {columns.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? '' : ''}
                </span>
              ) : null}
            </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
          
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));





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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageCount,setPageCount] = React.useState(0);
  const [offsetValue,setOffsetValue] = React.useState(0)
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [vendorid,setVendorid] = React.useState(props.vendor);
  const [editmc,setEditmc] = React.useState({})

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.contactlist.length - page * rowsPerPage);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Product Id');
  const [editdiamond,setEditdiamond] = React.useState({})
  const [mchargelist,setMchargelist]= React.useState([])
  const [btnEdit, setBtnEdit] = React.useState({
    action: false,
    id: ''
  })

  function CancelEdit(diamondData) {
    setBtnEdit({ ...btnEdit, id:'', action: false })

  }
  function handleEdit(diamondData) {
      setEditmc({
        ...editmc,
        cost_price_id : diamondData.costprice.id,
        selling_price_id : diamondData.sellprice.id,
        weight_start: diamondData.costprice.weight_start,
        weight_end : diamondData.costprice.weight_end,
        cost_price : diamondData.costprice.price,
        selling_price : diamondData.sellprice.price,
        updatedAt : new Date()


      })
    // setProductCtx({
    //   ...productCtx,
    //   editleadtime:diamondData.vendorDeliveryTime,
    //   editreadytoship: diamondData.isReadyToShip,
    //   editisdefault:diamondData.isdefault,
    //   editisactive:diamondData.isActive
    // })
    setBtnEdit({ ...btnEdit, id:diamondData.costprice.id, action: true })

  }
  async function getmclist()
  {
    let bodydata = {
      vendorid : props.vendor
    }

    let response =  await sendNetworkRequest('/getvendormakingprice', {}, bodydata)
   setMchargelist(response.gems)

  }
  useEffect( () => {
    getmclist()
  }, [vendorid])
  async function handleSave(id){
    var bodydata = {}
   

   await sendNetworkRequest('/updatemakingcharge', {}, editmc)

    setBtnEdit({ ...btnEdit, id:"", action: false })
    getmclist()
  }
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleinputChange =type => e => {
    setEditmc({
      ...editmc,
      [type]: e.target.value
    })
      // setProductCtx({ ...productCtx, [type]: e.target.value})
    
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
      
        <Table className={classes.table} border={1} borderColor={"#ddd"} size="small" stickyHeader>
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
          {/* <Query
              query={MAKINGCHARGEPRICELIST}
              onCompleted={data => setPageCount( data.allMakingChargeSettings.totalCount )}
              variables={{ "vendorCode": 'STYPA 010'}}>
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
                          return <> */}
                              {mchargelist.map((row, index) => (
                                  <TableRow key={row.material}>
                                  <TableCell component="th" scope="row">
                                     {row.costprice.material}
                                    
                                  </TableCell>
                                  <TableCell align="left">{row.costprice.purity}</TableCell>

                                  <TableCell align="left">
                                  {
                                    btnEdit.action && btnEdit.id == row.costprice.id ? <Input
                                    variant="outlined"
                                    margin="dense"
                                    label="Cost Price"
                                    fullWidth
                                    className={classes.helperinput}
                                    value= {editmc.weight_start}
                                    onChange={handleinputChange('weight_start')}
                                    id="productvendorcode"
                                    name="Cost Price"
                                    /> : 
                                    <Typography className={classes.heading}> 
                                    {row.costprice.weight_start}
                                   </Typography>  }
                                    </TableCell>

                                    <TableCell align="left">
                                  {
                                    btnEdit.action && btnEdit.id == row.costprice.id ? <Input
                                    variant="outlined"
                                    margin="dense"
                                    label="Cost Price"
                                    fullWidth
                                    className={classes.helperinput}
                                    value= {editmc.weight_end}
                                    onChange={handleinputChange('weight_end')}
                                    id="productvendorcode"
                                    name="Cost Price"
                                    /> : 
                                    <Typography className={classes.heading}> 
                                    {row.costprice.weight_end}
                                   </Typography>  }
                                    </TableCell>

                                    <TableCell align="left">
                                  {
                                    btnEdit.action && btnEdit.id == row.costprice.id ? <Input
                                    variant="outlined"
                                    margin="dense"
                                    label="Cost Price"
                                    fullWidth
                                    className={classes.helperinput}
                                    value= {editmc.cost_price}
                                    onChange={handleinputChange('cost_price')}
                                    id="productvendorcode"
                                    name="Cost Price"
                                    /> : 
                                    <Typography className={classes.heading}> 
                                    {row.costprice.price}
                                   </Typography>  }
                                    </TableCell>


                                    <TableCell align="left">
                                  {
                                    btnEdit.action && btnEdit.id == row.costprice.id ? <Input
                                    variant="outlined"
                                    margin="dense"
                                    label="Cost Price"
                                    fullWidth
                                    className={classes.helperinput}
                                    value= {editmc.selling_price}
                                    onChange={handleinputChange('selling_price')}
                                    id="productvendorcode"
                                    name="Cost Price"
                                    /> : 
                                    <Typography className={classes.heading}> 
                                    {row.sellprice.price}
                                   </Typography>  }
                                    </TableCell>

                                    <TableCell align="left">
                                  {
                                    btnEdit.action && btnEdit.id == row.costprice.id ?  <Autocomplete
                                      id="free-solo-2-demo"
                                      fullWidth
                                      disableClearable
                                      className={classes.fixedTag}
                                      getOptionLabel={option => option.name}
                                      options={[{label: 1,name:"Flat"},{label:2,name:"Percentage"}]}
                                      renderTags={(value, getTagProps) =>
                                      value.map((option, index) => (
                                      <Chip variant="outlined" size="small" label={option.name} {...getTagProps({ index })} />
                                      ))
                                      }
                                      renderInput={params => (
                                      <TextField
                                      {...params}
                                      label="Price Type"
                                      margin="dense"
                                      variant="outlined"
                                      fullWidth
                                      InputProps={{ ...params.InputProps, readOnly: true, type: 'search' }}
                                      />
                                      )}
                                      /> : <Typography className={classes.heading}> 
                                      {row.sellprice.selling_price_type === 1 ? 'Flat' : 'Percentage'} </Typography>  }

                                    </TableCell>


                                  <TableCell align="left">            
                                  <Moment format="DD MMM YYYY hh:mm a">
                                  {row.costprice.updatedAt}
                                  </Moment>
                                  </TableCell>
                                  {
                                    btnEdit.action && btnEdit.id == row.costprice.id ?
                                      <TableCell  style = {{width: 20}} align="center">
                                        <Button onClick={(e) => handleSave(row.costprice.id)}><SaveIcon />
                                        </Button>
                                        <Button onClick={(e) => CancelEdit(row)}><CancelIcon />
                                        </Button>
                                      </TableCell> :
                                      <TableCell align="center" style = {{width: 20}}>
                                        <Button onClick={(e) => handleEdit(row)}><EditIcon />
                                        </Button>
                                      </TableCell>
                                  }
                                </TableRow>
                              ))}
                          {/* </>
                      }
                      else{
                      return <div>{"Fetch Products"}</div>
                      }
                  }}
          </Query> */}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
         {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10,100,200,500]}
                
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
          </TableFooter> */}
        </Table> 
      </div>
    </Paper>
  );
}
export default withApollo(AddContact);
