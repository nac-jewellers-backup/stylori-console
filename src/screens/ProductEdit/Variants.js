import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import EditIcon from "@material-ui/icons/Edit";
import { Typography, Button, Input } from "@material-ui/core";
import { ProductContext } from "../../context";
import Switch from "@material-ui/core/Switch";
import { NetworkContext } from "../../context/NetworkContext";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import SaveIcon from "@material-ui/icons/Save";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  function handleFirstPageButtonClick(event) {
    onPageChange(event, 0);
  }

  function handleBackButtonClick(event) {
    onPageChange(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onPageChange(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  fixedTag: {
    padding: 0,
    "& .MuiOutlinedInput-root": {
      padding: 0,
    },
  },

  button: {
    margin: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
  },
  gempapper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: "100%",
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
  const { productCtx, setProductCtx } = React.useContext(ProductContext);

  const [btnEdit, setBtnEdit] = React.useState({
    action: false,
    id: "",
  });
  function CancelEdit(diamondData) {
    setBtnEdit({ ...btnEdit, id: "", action: false });
  }
  const { sendNetworkRequest } = React.useContext(NetworkContext);

  const handleChangeswitch = (name) => (event) => {
    setProductCtx({ ...productCtx, [name]: event.target.checked });
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.variants && props.variants.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  const handleinputChange = (type) => (e) => {
    setProductCtx({ ...productCtx, [type]: e.target.value });
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  function DiamondEdit(diamondData) {
    setProductCtx({
      ...productCtx,
      approximateMetalWeight: diamondData.skuWeight,
      editleadtime: diamondData.vendorDeliveryTime,
      discount: diamondData.discountDesc,
      editreadytoship: diamondData.isReadyToShip,
      editisdefault: diamondData.isdefault,
      editisactive: diamondData.isActive,
    });
    console.log(productCtx);
    setBtnEdit({ ...btnEdit, id: diamondData.generatedSku, action: true });
  }
  function DiamondSave(id) {
    var bodydata = {};
    if (productCtx.editleadtime) {
      let list_data = props.variants;
      let Skuchangedata = list_data.map((skulistdata, index) => {
        if (id === skulistdata.generatedSku) {
          skulistdata.vendorDeliveryTime = productCtx.editleadtime;
          skulistdata.isdefault = productCtx.editisdefault;
          skulistdata.isActive = productCtx.editisactive;
          skulistdata.isReadyToShip = productCtx.editreadytoship;

          skulistdata.discountDesc = productCtx.discount;
          skulistdata.skuWeight = productCtx.approximateMetalWeight;
          // diamondListData.stoneCount = productCtx.diamondcount;
          // diamondListData.stoneWeight = productCtx.diamondweight;
          bodydata["vendorDeliveryTime"] = productCtx.editleadtime;
          bodydata["isdefault"] = productCtx.editisdefault;
          bodydata["isActive"] = productCtx.editisactive;
          bodydata["discount"] = productCtx.discount;

          bodydata["isReadyToShip"] = productCtx.editreadytoship;
          bodydata["generatedSku"] = id;
          bodydata["approxMetalWeight"] = productCtx.approximateMetalWeight;
          console.log(JSON.stringify(bodydata));
          return skulistdata;
        }
        return skulistdata;
      });
    }

    sendNetworkRequest("/updateskuinfo", {}, bodydata);

    setBtnEdit({ ...btnEdit, id: "", action: false });
  }
  //   const handleoptionChange = type => (event, value) => {

  //     setProductCtx({ ...productCtx, [type]: value})

  // }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} border={1} borderColor={"#ddd"} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.name === "Gold Weight" && props.productcompletedata[0]?.materialName === "Silver"
                    ? "Approximate Metal Weight"
                    : column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.variants &&
              props.variants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  {props.displycolumns.indexOf("SKU") > -1 ? (
                    <TableCell component="th" scope="row">
                      {row.generatedSku}
                    </TableCell>
                  ) : null}
                  {props.displycolumns.indexOf("Metal Colour") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} scope="row">
                      {row.metalColor}
                    </TableCell>
                  ) : null}
                  {props.displycolumns.indexOf("Metal Purity") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      {row.purity}
                    </TableCell>
                  ) : null}

                  {props.displycolumns.indexOf("Gold Weight") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      {btnEdit.action &&
                      btnEdit.id == row.generatedSku &&
                      props.productcompletedata[0]?.materialName === "Silver" ? (
                        <Input
                          className={classes.helperinput}
                          variant="outlined"
                          margin="dense"
                          style={{ width: 40 }}
                          value={productCtx.approximateMetalWeight}
                          id="approximateMetalWeight"
                          error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                          name="approximateMetalWeight"
                          label="Approximate Metal Weight"
                          onChange={handleinputChange("approximateMetalWeight")}
                        />
                      ) : (
                        <Typography className={classes.heading}> {row.skuWeight}</Typography>
                      )}{" "}
                    </TableCell>
                  ) : null}

                  {props.displycolumns.indexOf("Size") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      {row.skuSize}
                    </TableCell>
                  ) : null}
                  {props.displycolumns.indexOf("Vendor lead Time") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      {btnEdit.action && btnEdit.id == row.generatedSku ? (
                        <Input
                          className={classes.helperinput}
                          variant="outlined"
                          margin="dense"
                          style={{ width: 40 }}
                          value={productCtx.editleadtime}
                          id="productname"
                          error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                          name="productname"
                          label="Vendor Lead Time"
                          onChange={handleinputChange("editleadtime")}
                        />
                      ) : (
                        <Typography className={classes.heading}>{row.vendorDeliveryTime}</Typography>
                      )}{" "}
                    </TableCell>
                  ) : null}

                  {props.displycolumns.indexOf("Quantity") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      {btnEdit.action && btnEdit.id == row.generatedSku ? (
                        <Input
                          className={classes.helperinput}
                          variant="outlined"
                          margin="dense"
                          style={{ width: 40 }}
                          value={productCtx.availableStockQty}
                          id="qty"
                          error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                          name="Qty"
                          label="Quantity"
                          onChange={handleinputChange("available_stock_qty")}
                        />
                      ) : (
                        <Typography className={classes.heading}>{row.availableStockQty}</Typography>
                      )}{" "}
                    </TableCell>
                  ) : null}

                  {props.displycolumns.indexOf("Discount") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      {btnEdit.action && btnEdit.id == row.generatedSku ? (
                        <Input
                          className={classes.helperinput}
                          variant="outlined"
                          margin="dense"
                          style={{ width: 40 }}
                          value={productCtx.discount}
                          id="productname"
                          error={productCtx && productCtx.error_message && productCtx.error_message.productname}
                          name="productname"
                          label="Discount"
                          onChange={handleinputChange("discount")}
                        />
                      ) : (
                        <Typography className={classes.heading}>{row.discountDesc}</Typography>
                      )}{" "}
                    </TableCell>
                  ) : null}
                  {props.displycolumns.indexOf("Ready To Ship") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      <Switch
                        checked={
                          btnEdit.action && btnEdit.id == row.generatedSku ? productCtx.editreadytoship : row.isReadyToShip
                        }
                        value="checkedA"
                        onChange={btnEdit.action && btnEdit.id == row.generatedSku ? handleChangeswitch("editreadytoship") : null}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </TableCell>
                  ) : null}
                  {props.displycolumns.indexOf("Default") > -1 ? (
                    <TableCell align="center" style={{ width: 40 }} component="th" scope="row">
                      <Switch
                        checked={btnEdit.action && btnEdit.id == row.generatedSku ? productCtx.editisdefault : row.isdefault}
                        value="checkedA"
                        onChange={btnEdit.action && btnEdit.id == row.generatedSku ? handleChangeswitch("editisdefault") : null}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </TableCell>
                  ) : null}
                  {props.displycolumns.indexOf("Active") > -1 ? (
                    <TableCell style={{ width: 40 }} align="center">
                      <Switch
                        checked={btnEdit.action && btnEdit.id == row.generatedSku ? productCtx.editisactive : row.isActive}
                        onChange={btnEdit.action && btnEdit.id == row.generatedSku ? handleChangeswitch("editisactive") : null}
                        value="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </TableCell>
                  ) : null}
                  {btnEdit.action && btnEdit.id == row.generatedSku ? (
                    <TableCell style={{ width: 20 }} align="center">
                      <Button onClick={(e) => DiamondSave(row.generatedSku)}>
                        <SaveIcon />
                      </Button>
                      <Button onClick={(e) => CancelEdit(row)}>
                        <CancelIcon />
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell align="center" style={{ width: 20 }}>
                      <Button onClick={(e) => DiamondEdit(row)}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {emptyRows == 0 && (
              <TableRow style={{ height: 1 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={props.variants && props.variants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
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
