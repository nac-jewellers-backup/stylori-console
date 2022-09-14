import React from "react";
import {
  TableContainer,
  Tooltip,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  makeStyles,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { NetworkContext, AlertContext } from "../../context";
import exportFromJSON from "export-from-json";
import { useQuery } from "react-apollo";
import { dynamicFilterAttributes } from "../../graphql/query";
import { Skeleton } from "@material-ui/lab";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import { API_URL } from "../../config";
import socketIOClient from "socket.io-client";
import CircularProgressWithLabel from "../../components/CircularProgress";
import SettingsIcon from "@material-ui/icons/Settings";
import { FilterAttributeSettings } from "./filter_attribute_settings";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(1),
  },
  chipCell: {
    "& > *": {
      margin: theme.spacing(0.1),
    },
  },
  input: {
    display: "none",
  },
}));

export const DynamicFilters = (props) => {
  const classes = useStyles();
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const snack = React.useContext(AlertContext);

  const [progress, setProgress] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [masterData, setMasterData] = React.useState({});

  const handleClickOpen = (item) => {
    setMasterData(item);
    setOpen(true);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  React.useEffect(() => {
    const socket = socketIOClient(API_URL);
    socket.on("filter_sync", (data) => {
      console.log(data);
      if (data.status !== "completed") {
        setProgress(data?.completed * 100);
      } else {
        setProgress(100);
        snack.setSnack({
          severity: "info",
          msg: `Process Completed`,
        });
        socket.close();
      }
    });
  }, []);

  const downloadProductFilters = () => {
    sendNetworkRequest("/fetch_filters")
      .then((response) => {
        if (response?.result) {
          exportFromJSON({
            data: response.result,
            fileName: `Product_Filters_${new Date().toLocaleDateString()}`,
            exportType: "csv",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        snack.setSnack({
          open: true,
          severity: "error",
          msg: "Something went wrong!",
        });
      });
  };

  const handleUpload = (file) => {
    var bodyFormData = new FormData();
    bodyFormData.set("file", file);
    axios
      .post(API_URL + "/bulk_upload_filters", bodyFormData)
      .then((res) => {
        if (res) {
          setProgress(1);
          snack.setSnack({
            open: true,
            msg: res?.data?.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        snack.setSnack({
          open: true,
          severity: "error",
          msg: "Some error occured!",
        });
      });
  };

  let { loading, data, error, refetch } = useQuery(dynamicFilterAttributes);
  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent="flex-start"
        alignItems="flex-start"
        className={classes.grid}
      >
        <Grid item>
          <Tooltip title="Download">
            <Button
              variant="outlined"
              onClick={() => downloadProductFilters()}
              startIcon={<GetAppIcon />}
            >
              Applied Product filters
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <input
            accept=".csv"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={(event) => {
              const files = event.target.files;
              if (files) {
                handleUpload(files[0]);
              }
            }}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Upload & Apply Product filters
            </Button>
          </label>
        </Grid>
        <Grid item>
          {progress > 0 && <CircularProgressWithLabel value={progress} />}
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {["Name", "Attribute Value", ""].map((item, index) => (
                <TableCell
                  key={index}
                  style={index == 0 ? { width: 130 } : {}}
                  align="center"
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={2}>
                  <Skeleton variant="rect" />
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              data?.master?.nodes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell style={{ width: 130 }} align="center">
                    <Typography variant="h5">{item?.name}</Typography>
                  </TableCell>
                  <TableCell className={classes.chipCell}>
                    {item?.attributes?.nodes.map((element, i) => (
                      <Chip
                        key={i}
                        size="small"
                        label={element?.name}
                        variant="outlined"
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleClickOpen(item);
                      }}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {error && (
              <TableRow>
                <TableCell colSpan={2} align={"center"}>
                  <Typography variant="body2">Some Error Occured</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <FilterAttributeSettings
        open={open}
        onClose={handleClose}
        masterData={masterData}
        refetchMasterData={refetch}
      />
    </>
  );
};
