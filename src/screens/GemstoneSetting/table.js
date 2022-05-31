import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { v4 as uuid } from "uuid";
import {
  GEMSTONE_MARKUP_SETTING,
  CREATE_GEMSTONE_MARKUP,
  DELETE_MATERIAL_MARKUP,
  UPDATE_MATERIAL_MARKUP,
} from "../../graphql/query";
import { GRAPHQL_DEV_CLIENT } from "../../config";
import { validateSDL } from "graphql/validation/validate";
const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  imagecontainer: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link_style: {
    color: "#000",
  },
}));
const StyloriLandingPage = (props) => {
  const classes = useStyles2();
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [allgemstone, setallgemstone] = useState([]);
  const [creategem, setCreateGem] = useState({
    id: "",
    name: "",
    priceMin: "",
    priceMax: "",
    markupValue: "",
    markupType: "",
    error: {
      name: "",
      priceMin: "",
      priceMax: "",
      markupValue: "",
      markupType: "",
    },
  });

  useEffect(() => {
    styloribannerfetch();
  }, []);
  function styloribannerfetch() {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GEMSTONE_MARKUP_SETTING,
      }),
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((fatchvalue) => {
        setallgemstone(fatchvalue.data.allMaterialMarkups.nodes);
      })
      .catch(console.error);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeData = (event) => {
    setCreateGem({
      ...creategem,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidate = () => {
    let isValid = true;
    let error = creategem.error;

    if (creategem.name.length === 0) {
      isValid = false;
      error.name = "Name is Required";
    }
    if (creategem.priceMin.length === 0) {
      isValid = false;
      error.priceMin = "Price Min is Required";
    }
    if (creategem.priceMax.length === 0) {
      isValid = false;
      error.priceMax = "Price Max is Required";
    }
    if (creategem.markupValue.length === 0) {
      isValid = false;
      error.markupValue = "Markup Value is Required";
    }
    if (creategem.markupValue.length === 0) {
      isValid = false;
      error.markupValue = "Markup Value is Required";
    }

    setCreateGem({ ...creategem, error });
    return isValid;
  };

  const handleDelete = async (id) => {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: DELETE_MATERIAL_MARKUP,
        variables: { id: id },
      }),
    };

    await fetch(url, opts)
      .then((res) => res.json())
      .then((fatchvalue) => {
        styloribannerfetch();
      })
      .catch(console.error);
  };

  const OnEditData = (val) => {
    setCreateGem({
      id: val?.id,
      name: val?.materialName ?? "",
      priceMin: val?.priceMin ?? "",
      priceMax: val?.priceMax ?? "",
      markupValue: val?.markupValue ?? "",
      markupType: val?.markupType ?? "",
      error: {
        name: "",
        priceMin: "",
        priceMax: "",
        markupValue: "",
        markupType: "",
      },
    });
    setUpdate(true);
    setOpen(true);
  };

  const onsubmitvalue = async () => {
    if (handleValidate()) {
      let gem_data = {
        id: creategem?.id?.length === 0 ? uuid() : creategem?.id,
        materialName: creategem.name,
        priceMin: Number(creategem.priceMin),
        priceMax: Number(creategem.priceMax),
        markupValue: Number(creategem.markupValue),
        markupType: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      const url = GRAPHQL_DEV_CLIENT;
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: update ? UPDATE_MATERIAL_MARKUP : CREATE_GEMSTONE_MARKUP,
          variables: gem_data,
        }),
      };

      await fetch(url, opts)
        .then((res) => res.json())
        .then((fatchvalue) => {
          setOpen(false);

          styloribannerfetch();
        })
        .catch(console.error);
    }
  };
  console.log(creategem);
  return (
    <>
      <Paper className={classes.root}>
        <Grid
          container
          item
          xs={12}
          style={{ padding: "16px" }}
          sm={12}
          alignItems={"flex-end"}
        >
          <Grid fullwidth item xs={9} sm={9}>
            <Typography component="h6" variant="h6">
              Gemstone Markup Settings
            </Typography>
          </Grid>

          <Grid fullwidth item xs={3} sm={3} style={{ "text-align": "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Add New
            </Button>
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Gemstone Markup</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              onChange={onChangeData}
              value={creategem.name}
              name="name"
            />

            <lable style={{ color: "red" }}>{creategem?.error?.name}</lable>
            <TextField
              margin="dense"
              id="priceMin"
              label="Price Min"
              variant="outlined"
              fullWidth
              onChange={onChangeData}
              type="number"
              value={creategem.priceMin}
              name="priceMin"
            />
            <lable style={{ color: "red" }}>
              {" "}
              {creategem?.error?.priceMin}
            </lable>

            <TextField
              margin="dense"
              id="priceMax"
              label="Price Max"
              variant="outlined"
              fullWidth
              onChange={onChangeData}
              value={creategem.priceMax}
              type="number"
              name="priceMax"
            />

            <lable style={{ color: "red" }}>
              {" "}
              {creategem?.error?.priceMax}
            </lable>

            <TextField
              margin="dense"
              id="markupValue"
              label="Markup Value"
              variant="outlined"
              fullWidth
              type="number"
              onChange={onChangeData}
              value={creategem.markupValue}
              name="markupValue"
            />
            <lable style={{ color: "red" }}>
              {" "}
              {creategem?.error?.markupValue}
            </lable>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="markupValue"
              name="markupType"
              label="Markup Type"
              variant="outlined"
              value={creategem?.markupType ? Number(creategem.markupType) : 1}
              onChange={onChangeData}
              style={{ width: "100%" }}
            >
              <MenuItem value={1}>Flat</MenuItem>
              <MenuItem value={2}>Percentage</MenuItem>
            </Select>
            <lable style={{ color: "red" }}>
              {creategem?.error?.markupType}
            </lable>
          </DialogContent>
          <DialogActions>
            <Button onClick={onsubmitvalue} variant="outlined">
              Submit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            border={1}
            borderColor={"#ddd"}
            size="small"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Material Name</TableCell>
                <TableCell>Price Min</TableCell>
                <TableCell>Price Max </TableCell>
                <TableCell>Markup Value </TableCell>
                <TableCell>Markup Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allgemstone.map((val) => (
                <TableRow key={val.id}>
                  <TableCell>{val?.materialName ?? "-"}</TableCell>
                  <TableCell>{val?.priceMin ?? "-"}</TableCell>
                  <TableCell>{val?.priceMax ?? "-"}</TableCell>
                  <TableCell>{val?.markupValue ?? "-"}</TableCell>

                  <TableCell>
                    {val?.markupType === 1 ? "Flat" : "Percentage" ?? "-"}
                  </TableCell>

                  <TableCell>
                    <Button variant="outlined" onClick={() => OnEditData(val)}>
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDelete(val.id)}
                      style={{
                        color: "#fff",
                        backgroundColor: "red",
                        marginLeft: "4px",
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );
};
export default StyloriLandingPage;
