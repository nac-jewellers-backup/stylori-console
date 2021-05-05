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
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useApolloClient, useQuery } from "react-apollo";
import {
  CREATE_HOLIDAY,
  DELETE_HOLIDAY,
  UPDATE_HOLIDAY,
} from "../../graphql/mutation";
import { HOLIDAYLIST } from "../../graphql/query";
import HolidayModal from "./HolidayModal";
import { AlertContext } from "../../context";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import moment from "moment";

export const HolidayManager = (props) => {
  const { loading, data, error, refetch } = useQuery(HOLIDAYLIST);
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState();
  const [item, setItem] = React.useState({ holiday: "", date: null });

  const editItem = (event, type) => {
    var name, value;
    if (type == "date") {
      name = type;
      value = event;
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
    setItem({ holiday: "", date: null });
  };

  const handleSave = () => {
    if (type == "Edit") {
      var id = item.id;
      delete item.id;
      delete item.createdAt;
      delete item.updatedAt;
      delete item.__typename;
      client
        .mutate({
          mutation: UPDATE_HOLIDAY,
          variables: {
            id,
            item,
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
          mutation: CREATE_HOLIDAY,
          variables: {
            item,
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
          mutation: DELETE_HOLIDAY,
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
        <Typography variant="h4">Holiday Manager</Typography>
        <IconButton>
          <Tooltip title="Upload Holidays">
            <CloudUploadIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          onClick={() => {
            setOpen(true);
            setType("Add");
          }}
        >
          <Tooltip title="Add Holiday">
            <AddCircleIcon />
          </Tooltip>
        </IconButton>
      </Grid>
      <Grid container item xs={12} sm={12} spacing={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align={"center"}>Holiday</TableCell>
                <TableCell align={"center"}>Date</TableCell>
                <TableCell align={"center"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={3} align={"center"} padding="none">
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={3} align={"center"}>
                    <Typography>
                      Some Error occured please try again!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {data && data?.allHolidayManagers?.nodes.length == 0 && (
                <TableRow>
                  <TableCell colSpan={3} align={"center"}>
                    <Typography>No Holidays found!</Typography>
                  </TableCell>
                </TableRow>
              )}
              {data &&
                data?.allHolidayManagers?.nodes.length > 0 &&
                data?.allHolidayManagers?.nodes.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align={"center"} padding="none">
                      {item.holiday}
                    </TableCell>
                    <TableCell align={"center"} padding="none">
                      {moment(item.date, "YYYY-MM-DD").format("MMM DD,YYYY")}
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
          </Table>
        </TableContainer>
      </Grid>
      <HolidayModal
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
