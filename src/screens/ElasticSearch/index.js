import React from "react";
import { Grid, Card, CardHeader, IconButton, Tooltip } from "@material-ui/core";
import { Breadcrumbs } from "./../../components";
import { AlertContext, NetworkContext } from "../../context";
import SyncSharpIcon from "@material-ui/icons/SyncSharp";
import CircularProgressWithLabel from "../../components/CircularProgress";
import socketIOClient from "socket.io-client";
import { API_URL } from "../../config";

const searchIndexs = {
  product_search: {
    Name: "Products",
    type: "products",
    listener: "product_search_sync",
  },
  sku_search: {
    Name: "Skus",
    type: "sku",
    listener: "sku_search_sync",
  },
  seo_search: {
    Name: "Seos",
    type: "seo",
    listener: "seo_search_sync",
  },
};
const autoId = `component-${Math.random().toString(36).substring(2, 8)}`;
export const ElasticSearch = (props) => {
  const [indexCount, setIndexCount] = React.useState({});
  let { sendNetworkRequest } = React.useContext(NetworkContext);
  const [progress, setProgress] = React.useState({});
  const snack = React.useContext(AlertContext);
  const initiateSync = (index) => {
    sendNetworkRequest("/sync_elastic_search", null, {
      ...searchIndexs[index],
    })
      .then((_) => {
        snack.setSnack({
          open: true,
          severity: "info",
          msg: `Sync Initiated!`,
        });
        let socket = socketIOClient(API_URL);
        socket.on(searchIndexs[index].listener, (data) => {
          let tempProgress = { ...progress, [index]: data.status };
          setProgress(tempProgress);
          if (data.status.completed == 1) {
            snack.setSnack({
              open: true,
              severity: "success",
              msg: `Sync Completed!`,
            });
            setProgress({});
            socket.close();
            getEsStatus();
          }
        });
      })
      .catch(console.error);
  };

  const getEsStatus = () => {
    sendNetworkRequest("/es_status", null, {})
      .then((response) => {
        setIndexCount(response);
      })
      .catch(console.error);
  };

  React.useEffect(getEsStatus, []);
  return (
    <Grid container spacing={4}>
      <Grid container item xs={12}>
        <Breadcrumbs />
      </Grid>
      {Object.keys(searchIndexs).map((item) => (
        <Grid container item xs={3} md={3} id={autoId}>
          <Card raised="true" style={{ height: "100%", width: "100%" }}>
            <CardHeader
              title={searchIndexs[item].Name}
              subheader={indexCount[item]}
              action={
                !progress[item] ? (
                  <Tooltip
                    title={
                      Object.keys(progress).length > 0
                        ? `Sync in Progress!`
                        : `Click to sync!`
                    }
                  >
                    <IconButton
                      aria-label="settings"
                      disabled={Object.keys(progress).length > 0}
                      onClick={() => {
                        initiateSync(item);
                      }}
                    >
                      <SyncSharpIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <CircularProgressWithLabel
                    value={progress[item].completed * 100}
                  />
                )
              }
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
