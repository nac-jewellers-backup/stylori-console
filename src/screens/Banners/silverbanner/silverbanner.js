import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Breadcrumbs } from "../../../components";
import SilverLandingPage from "./components/silverlandingpage";
import SilverListingPage from "./components/silverlistingpage";
import SilverListingRoutingPage from "./components/silverlistingroutingpage";
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
const Silverbanner = (props) => {
  const classes = useStyles2();

  return (
    <>
      <Breadcrumbs url="/banners" name="Landing Page Banner"></Breadcrumbs>
      <SilverLandingPage />
      <SilverListingPage />
      <SilverListingRoutingPage />
      {/* <SilverLandingPage /> */}
    </>
  );
};
export default Silverbanner;
