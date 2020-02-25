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
import { Typography, Button, Chip, TextField, Input } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ProductContext } from '../../context';
import Switch from '@material-ui/core/Switch';
const columns = [
  { id: 'SKU', label: 'SKU', minWidth: 100 },
  { id: 'Metal Colour', label: 'Metal Colour', minWidth: 100 },
  { id: 'Metal Purity', label: 'Metal Purity', minWidth: 200 },
  { id: 'Gold Weight', label: 'Gold Weight', minWidth: 200 },
  { id: 'Size', label: 'Size', minWidth: 100 },
  { id: 'Diamond Colour-Clarity', label: 'Diamond Colour-Clarity', minWidth: 200 },
  { id: 'Gemstone', label: 'Gemstone', minWidth: 100 },
  {
    id: 'Disable',
    label: 'Disable',
    minWidth: 120,
    align: 'center',
    format: value => value.toFixed(2),
  }
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
  fixedTag: {
    padding: 0,
    '& .MuiOutlinedInput-root':{
      padding: 0,
    }
  },
  root:{
    marginTop: theme.spacing(2)
  },
  table:{
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%'
  },
  gempapper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: '100%'
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

export default function Variants(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { productCtx, setProductCtx} = React.useContext(ProductContext);
  const [btnEdit, setBtnEdit] = React.useState({
    action: false,
    id: ''
  })
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  function handleChange(variantId) {
    let variantslist = productCtx.variants;
    variantslist = productCtx.variants && productCtx.variants.map((variant,index)=>{
      if(variant.id===variantId){
        let status = variant.isActive ? variant.isActive=false : variant.isActive= true;
      }
      return variant;
    })
    let filterVariant = variantslist&& variantslist.filter((filter_data,index)=>filter_data.id===variantId)[0];
    let editVaraint = {
      id:filterVariant.id,
      isActive:filterVariant.isActive
    }
    let editVariants = productCtx.editVariants;
    let editStatus = editVariants && editVariants.some((check_variant,index)=>check_variant.id===variantId) ?editVariants= editVariants && editVariants.filter((edit_variant_filter,index)=>edit_variant_filter.id!==variantId):editVariants.push(editVaraint);
    setProductCtx({
      ...productCtx,
      variants:variantslist,
      editVariants
    })
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.variants&&props.variants.length - page * rowsPerPage);
  // function VariantEdit(id) {
  //   alert(id)
  //   setBtnEdit({ ...btnEdit, id, action: true })
  // }
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
//   const handleoptionChange = type => (event, value) => {
    
//     setProductCtx({ ...productCtx, [type]: value})

// }
// const handleInputChange = type => e => {
//   setProductCtx({ ...productCtx, [type]: e.target.value  })
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
            {props.variants&& props.variants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.generatedSku}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.metalColor}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.purity}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.skuWeight}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.skuSize}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.diamondType}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.skuSize}
                  </TableCell>
                {
                  // btnEdit.action && btnEdit.id == row.id ?
                  //   <TableCell align="center">
                  //     <Button onClick={(e) => DiamondEdit(row.id)}><SaveIcon />
                  //     </Button>
                  //   </TableCell> :
                    <TableCell align="center">
                       <Switch
                        checked={row.isActive}
                        onChange={()=>handleChange(row.id)}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    </TableCell>
                }
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 1 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={5}
                count={props.variants&&props.variants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
}