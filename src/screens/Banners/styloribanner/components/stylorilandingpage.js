import React, { useContext, useEffect, useState } from "react";
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
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import {
  ALLSTYLORILANDINGBANNERS,
  CREATESTYLORILANDINGBANNER,
  DELETESTYLORILANDINGBANNER,
} from "../../../../graphql/query";
import { GRAPHQL_DEV_CLIENT, APP_URL } from "../../../../config";
import { UploadImage } from "../../../../utils/imageUpload";
import { AlertContext } from "../../../../context";

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
  const [alllandingbanner, setalllandingbanner] = useState([]);
  const [createlandingbanner, setCreatelandingbanner] = useState({
    position: "",
    link: "",
    mobile: "",
    web: "",
  });
  const [disable,setDisable] = useState(false)
  const alert = useContext(AlertContext)

  useEffect(() => {
    async function styloribannerfetch() {
      const url = GRAPHQL_DEV_CLIENT;
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: ALLSTYLORILANDINGBANNERS,
        }),
      };

      await fetch(url, opts)
        .then((res) => res.json())
        .then((fatchvalue) => {
          let data = fatchvalue.data.allStyloriBanners.nodes;
          data.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));

          setalllandingbanner(data);
        })
        .catch(console.error);
    }
    styloribannerfetch();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setDisable(false)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeData = (event) => {
    setCreatelandingbanner({
      ...createlandingbanner,
      [event.target.name]: event.target.value,
    });
  };
  const handleDelete = async (id) => {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: DELETESTYLORILANDINGBANNER,
        variables: { id: id },
      }),
    };

    await fetch(url, opts)
      .then((res) => res.json())
      .then((fatchvalue) => {
        window.location.reload();
      })
      .catch(console.error);
  };

  const onsubmitvalue = async () => {
    let create_banner_data = {
      position: Number(createlandingbanner.position),
      url: createlandingbanner.link,
      mobile: createlandingbanner.mobile,
      web: createlandingbanner.web,
      now: new Date().toISOString(),
    };

    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: CREATESTYLORILANDINGBANNER,
        variables: create_banner_data,
      }),
    };

    await fetch(url, opts)
      .then((res) => res.json())
      .then((fatchvalue) => {
        setOpen(false);

        window.location.reload();
      })
      .catch(console.error);
  };

  const handleChange = (file, name)=>{
    UploadImage(
      file
      )
      .then((res)=>{
        alert.setSnack({
          open: true,
          severity: "success",
          msg: "Image Uploaded Successfully",
        });
        setDisable(true)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

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
              Stylori - Home Page - Banners
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
          <DialogTitle id="form-dialog-title">
            Stylori Landing Page :{" "}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="position"
              label="Position"
              variant="outlined"
              fullWidth
              onChange={onChangeData}
              value={createlandingbanner.position}
              name="position"
            />
            <TextField
              margin="dense"
              id="link"
              label="Banner's Redirect Link (Routes Only)"
              variant="outlined"
              fullWidth
              onChange={onChangeData}
              value={createlandingbanner.link}
              name="link"
            />
            <Grid container justifyContent="space-around">
              <Grid item>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="button-file"
                  multiple
                  type="file"
                  onChange={(e)=>handleChange(e.target.files[0], "mobile")}
                />
                <label htmlFor="button-file">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    disabled={disable}
                  >
                    Mobile Image URL
                  </Button>
                </label>
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: "none" }}
                  id="button-file"
                  multiple
                  type="file"
                  onChange={(e)=>handleChange(e.target.files[0], "web")}
                />
                <label htmlFor="button-file">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    disabled={disable}
                  >
                    Desktop Image URL
                  </Button>
                </label>
              </Grid>
            </Grid>

            {/* <TextField
              margin="dense"
              id="mobile"
              label="Mobile ImagecURL"
              variant="outlined"
              fullWidth
              onChange={onChangeData}
              value={createlandingbanner.mobile}
              name="mobile"
            />
            <TextField
              margin="dense"
              id="web"
              label="Desktop Image URL"
              variant="outlined"
              fullWidth
              onChange={onChangeData}
              value={createlandingbanner.web}
              name="web"
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={onsubmitvalue}>Submit</Button>
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
                <TableCell>Position</TableCell>
                <TableCell>Link to Check</TableCell>
                <TableCell>Mobile Image </TableCell>
                <TableCell>Desktop Image </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alllandingbanner.map((val, index) => (
                <TableRow key={val.id}>
                  <TableCell>{val.position}</TableCell>
                  <TableCell>
                    <Link
                      href={`${APP_URL}`}
                      target="_blank"
                      className={classes.link_style}
                    >
                      {APP_URL}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={val.mobile}
                      target="_blank"
                      className={classes.link_style}
                    >
                      <img
                        src={val.mobile}
                        style={{ width: "150px", height: "auto" }}
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={val.web}
                      target="_blank"
                      className={classes.link_style}
                    >
                      <img
                        src={val.web}
                        style={{ width: "150px", height: "auto" }}
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(val.id)}
                      style={{ color: "#fff", backgroundColor: "red" }}
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
