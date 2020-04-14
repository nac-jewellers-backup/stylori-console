import React, { useEffect, useContext, useState } from 'react';

import clsx from 'clsx';
import {lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Toolbar from '@material-ui/core/Toolbar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {Paper, TextField} from '@material-ui/core';
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
import {TaxList,VENDORLISTS,PRODUCTFILTERMASTER,PRODUCTLISTSTATUSEDIT} from '../../graphql/query';
import { useHistory } from "react-router-dom";
import { Button, Switch,Grid,FormControlLabel } from '@material-ui/core';
import { useMutation,useQuery } from '@apollo/react-hooks';
import Moment from 'react-moment';
import {BASE_URL} from '../../config'
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Filterandsearch from './../../screens/Productlist/filterandsearch';
import { NetworkContext } from '../../context/NetworkContext';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/Save';
import EnhancedTableHead from '../../components/EnhancedTableHead'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
// const columns = [
//   { id: 'name', label: 'Name' },
//   { id: 'vendorcode', label: 'Vendor Code' },
//   { id: 'Address', label: 'Address' },
//   { id: 'City', label: 'City' },
//   { id: 'gstNo', label: 'gstNo' },
//   { id: 'vendorDelivaryDays', label: 'vendorDelivaryDays' },
//   { id: 'updatedAt', label: 'updated on' },
//   { id: 'actions', label: 'actions' }

// ];

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
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const   Vendor=(props)=> {
  let history = useHistory();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [pageCount,setPageCount] = React.useState(0);
  const [offsetValue,setOffsetValue] = React.useState(0)
  const [masterlist,setMasterlist] = React.useState(props.values)

  const [productlists,setProductlists] = React.useState([])
  const [allproductlists,setAllProductlists] = React.useState([])
  const [mastercategories,setMastercategories] = React.useState([])
  const [masterproducttypes,setMasterproducttypes] = React.useState([])
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [searchtext,setSearchtext] = React.useState('')
  const [editcontent,setEditcontent] = React.useState({})
  const [isadd,setIsadd] = React.useState(false)
  const [isedit,setIsedit] = React.useState(false)

  const [btnEdit, setBtnEdit] = React.useState({
    action: false,
    id: ''
  })
  function addnewvendor()
  {
    setEditcontent({
      ...editcontent,
      isedit : false
    })
    let masters = masterlist;
    masters.insert(0, []);

    setMasterlist(masters)
     setIsadd(true)
     setBtnEdit({ ...btnEdit, id:null, action: true })

  }
  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
  function Editvendor(vendordata) {
    delete vendordata['action'];

    
    setEditcontent({
      ...editcontent,
      ...vendordata,
      isedit : true
    })

    setBtnEdit({ ...btnEdit, id:vendordata.id, action: true })

  }
  async function Savevendor(refetch) {
      props.onCreate(editcontent)
      setIsadd(false)
  //  let response =  await sendNetworkRequest('/updatetax', {}, editcontent)
    setBtnEdit({ ...btnEdit, id:'', action: false })
   // refetch()
  }
  function Cancelcreate() {

    props.onCancel();

    setBtnEdit({ ...btnEdit, id:'', action: false })
  }
  function searrchcontent()
  {
    props.onSearch(editcontent.searchcontent)

  }
  
  function CancelEdit(diamondData) {
   if(isadd)
   {
     let masters = masterlist;

    masters.splice(0, 1)
    setMasterlist(masterlist)

   }
      setIsadd(false)
    setEditcontent({})
    setBtnEdit({ ...btnEdit, id:'', action: false })
  }
  const handleInputChange = type => e => {
    setEditcontent({ ...editcontent, [type]: e.target.value  })
}
const handleoptionChange = type => (event, value) => {
  setEditcontent({ ...editcontent, [type]: value  })

}
const handleSearchChange = type => e => {
  props.onSearch(e.target.value)
}
const handleChange = type => (event) => {
  setEditcontent({ ...editcontent, [type]: event.target.checked  })

};
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.contactlist.length - page * rowsPerPage);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('hsnNumber');
  function handleChangePage(event, newPage) {
    setPage(newPage);
    setOffsetValue(newPage*rowsPerPage)

  }

  useEffect( () => {
  
    setMasterlist(props.values)
  }, [props.values])
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

  }
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);



  };
  
  return (
    <Paper className={classes.root}>
      
       <Grid container item xs={12} style={{padding: "16px"}} sm={12} alignItems={"flex-end"}>
        <Grid fullwidth item xs={3} sm={3}>

            <Typography component="h6" variant="h6">
            {props.title}

          </Typography>
          </Grid>
          <Grid fullwidth container xs={6} sm={6} alignItems="center" >
          <Grid fullwidth item xs={9} sm={9}  >
                <TextField
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            autoComplete="off"
                            id="vendordeliverydays"
                            name="vendordeliverydays"
                             value={editcontent.searchcontent}
                            onChange={handleInputChange("searchcontent")}
                            label="Search text"
                          />
                     </Grid>
                     <Grid fullwidth item xs={3} sm={3}  >

          <Button variant="contained"  onClick={()=>searrchcontent() } color="primary" >
            Search
        </Button>
        </Grid>
        </Grid>
          <Grid fullwidth item xs={3} sm={3} style={{"text-align":"right"}} >
          {props.button_title ? <Button variant="contained"  onClick={()=>addnewvendor() } color="primary" >
           {props.button_title}
        </Button> : null }
        
        </Grid>
    </Grid>
      {/* <Filterandsearch applyfilter={applyfilter} mastercategory={mastercategories} masterproducttype={masterproducttypes} searchproduct={searchproduct} /> */}
      <div className={classes.tableWrapper}>
        <Table className={classes.table} border={1} borderColor={"#ddd"} size="small" stickyHeader>
        {/* <TableHead>
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
          </TableHead> */}
           <EnhancedTableHead
              columns={props.columns}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
          <TableBody>
          {masterlist.map((row, index) => (
            <>
           
            
            <TableRow>
              {props.columns.map((columnname, index) => (
                <>
                {columnname.key === 'action' ?                  
                <TableCell align="center" style = {{width: 20}}>
                   {
                    btnEdit.action && btnEdit.id == row.id  ?  <>
                    <Button  onClick={(e) => Savevendor()}><SaveIcon />
                     </Button>
                     <Button onClick={(e) => CancelEdit(row)}><CancelIcon />
                     </Button></> : <Button onClick={(e) => Editvendor(row)} ><EditIcon />
                </Button>
                    } 
              </TableCell> :
                <>
                {btnEdit.action && btnEdit.id == row.id  ?
                <TableCell align="left">
                {columnname.type === 2 ?  <Switch
                  onChange={handleChange(columnname.key)}
                  checked={editcontent[columnname.key]}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                /> : null}  
                 {columnname.type === 6 ?     <Button variant="outlined" color="primary">
                                                  {columnname.controllabel}
                                                </Button> : null}  
                {columnname.type == 3 ? 
                  <Autocomplete
                  multiple
                  id="combo-box-demo"
                  options={columnname.mastervaluekey ? props.masters[columnname.mastervaluekey] : props.masters}
                  margin="dense"
                  fullWidth
                  value={editcontent[columnname.defaultkey]}
                  onChange={handleoptionChange(columnname.defaultkey)}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label={columnname.label} variant="outlined" />}
                /> : null }
                 {columnname.type == 5 ? 
                  <Autocomplete
                  
                  id="combo-box-demo"
                  options={props.masters[columnname.mastervaluekey]}
                  margin="dense"
                  fullWidth
                  options={columnname.mastervaluekey ? props.masters[columnname.mastervaluekey] : props.masters}
                  onChange={handleoptionChange(columnname.defaultkey)}
                  value={editcontent[columnname.defaultkey]}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label={columnname.label} variant="outlined" />}
                /> : null }
                {columnname.type == 4 ?
                <Typography> {row[columnname.key]}</Typography> : null}
                {!columnname.type || columnname.type == 1 ? <TextField
                      variant="outlined"
                      margin="dense"
                      
                      id={columnname.key}
                      name={columnname.key}
                      value={editcontent[columnname.key]}
                      onChange={handleInputChange(columnname.key)}
  
                      label={columnname.label}
                     />:null }  </TableCell>  :
                   <TableCell>

                      {columnname.type === 6 ?     <Button onClick={() => props.onPermissionadd(row)} variant="outlined" size="small" color="primary">
                                                  {columnname.controllabel}
                                                </Button> : null}  
                      {columnname.type === 2 ?  <Switch
                        color="primary"
                        name="checkedB"
                        onChange={handleInputChange(columnname.key)}
                        checked={row[columnname.key]}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /> : null}  
         {columnname.type != 2 && columnname.type != 6  ?  <Typography> {row[columnname.key]}</Typography> : null}  

                     
                    </TableCell>
                }
                    </>
                

                }
                </>
              ))}
            </TableRow>
            </>
          ))}

          
          {/* {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}  */}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[50,100,200,500]}
               
                count={[props.values.length]}
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
export default withApollo(Vendor);
