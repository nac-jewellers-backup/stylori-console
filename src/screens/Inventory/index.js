import React from "react";
import {
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useApolloClient, useQuery } from "react-apollo";
import {
  CREATE_INVENTORY,
  DELETE_INVENTORY,
  UPDATE_INVENTORY,
} from "../../graphql/mutation";
import { INVENTORYLIST } from "../../graphql/query";
import InventoryModal from "./InventoryModal";
import { AlertContext } from "../../context";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { v4 as uuid } from "uuid";

export const Inventory = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { loading, data, error, refetch } = useQuery(INVENTORYLIST, {
    variables: { first: rowsPerPage, offset: page },
  });
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState();
  const [item, setItem] = React.useState({
    generatedSku: "",
    numberOfItems: "",
    warehouse: { id: "", name: "" },
  });

  const editItem = (event, newValue) => {
    var name, value;
    if (newValue) {
      console.log(newValue);
      name = "warehouse";
      value = newValue;
    } else {
      name = event.target.name;
      value = event.target.value;
    }
    setItem({ ...item, [name]: value });
  };

  const client = useApolloClient();

  const snack = React.useContext(AlertContext);

  const onClose = () => {
    setOpen(false);
    setType(null);
  };

  const handleSave = () => {
    if (type == "Edit") {
      var id = item.id;
      client
        .mutate({
          mutation: UPDATE_INVENTORY,
          variables: {
            id,
            item: {
              generatedSku: item.generatedSku,
              numberOfItems: parseInt(item.numberOfItems),
              warehouseId: item.warehouse.id,
            },
          },
        })
        .then((res) => {
          if (res) {
            onClose();
            snack.setSnack({
              open: true,
              msg: "Successfully Updated!",
            });
            refetch();
          }
        })
        .catch((err) => {
          console.log(err);
          onClose();
          snack.setSnack({
            open: true,
            severity: "error",
            msg: "Some error occured!",
          });
        });
    }
    if (type == "Add") {
      client
        .mutate({
          mutation: CREATE_INVENTORY,
          variables: {
            item: {
              id: uuid(),
              generatedSku: item.generatedSku,
              numberOfItems: parseInt(item.numberOfItems),
              warehouseId: item.warehouse.id,
            },
          },
        })
        .then((res) => {
          if (res) {
            onClose();
            snack.setSnack({
              open: true,
              msg: "Successfully Added!",
            });
            refetch();
          }
        })
        .catch((err) => {
          console.log(err);
          onClose();
          snack.setSnack({
            open: true,
            severity: "error",
            msg: "Some error occured!",
          });
        });
    }
    if (type == "Delete") {
      var id = item.id;
      client
        .mutate({
          mutation: DELETE_INVENTORY,
          variables: {
            id,
          },
        })
        .then((res) => {
          if (res) {
            onClose();
            snack.setSnack({
              open: true,
              msg: "Successfully Deleted!",
            });
            refetch();
          }
        })
        .catch((err) => {
          console.log(err);
          onClose();
          snack.setSnack({
            open: true,
            severity: "error",
            msg: "Some error occured!",
          });
        });
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid
        container
        item
        xs={12}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Typography variant="h4">Inventory</Typography>
        <IconButton>
          <Tooltip title="Upload Inventorys">
            <CloudUploadIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          onClick={() => {
            setOpen(true);
            setType("Add");
            setItem({
              generatedSku: "",
              numberOfItems: "",
              warehouse: { id: "", name: "" },
            });
          }}
        >
          <Tooltip title="Add Inventory">
            <AddCircleIcon />
          </Tooltip>
        </IconButton>
      </Grid>
      <Grid container item xs={12} sm={12} spacing={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align={"center"}>Tag No</TableCell>
                <TableCell align={"center"}>Quantity</TableCell>
                <TableCell align={"center"}>Warehouse</TableCell>
                <TableCell align={"center"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} align={"center"} padding="none">
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={4} align={"center"}>
                    <Typography>
                      Some Error occured please try again!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {data && data?.allInventories?.nodes.length == 0 && (
                <TableRow>
                  <TableCell colSpan={4} align={"center"}>
                    <Typography>No items in inventory!</Typography>
                  </TableCell>
                </TableRow>
              )}
              {data &&
                data?.allInventories?.nodes.length > 0 &&
                data?.allInventories?.nodes.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align={"center"} padding="none">
                      {item.generatedSku}
                    </TableCell>
                    <TableCell align={"center"} padding="none">
                      {item.numberOfItems}
                    </TableCell>
                    <TableCell align={"center"} padding="none">
                      {item.warehouse.name}
                    </TableCell>
                    <TableCell align={"center"} padding="none">
                      <IconButton
                        onClick={() => {
                          setType("Edit");
                          setOpen(true);
                          setItem(item);
                        }}
                      >
                        <Tooltip title="Edit">
                          <EditIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setType("Delete");
                          setOpen(true);
                          setItem(item);
                        }}
                      >
                        <Tooltip title="Delete">
                          <DeleteForeverIcon />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={4}
                  align={"right"}
                  rowsPerPageOptions={[10, 25, 100]}
                  count={data?.allInventories?.totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
      <InventoryModal
        open={open}
        type={type}
        item={item}
        editItem={editItem}
        handleSave={handleSave}
        onClose={onClose}
      />
    </Grid>
  );
};
