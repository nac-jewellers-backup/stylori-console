import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { homePageData } from "./CMSComponent/homePageData";
import BannerCMS from "./CMSComponent/bannerCMS";

const useStyles = makeStyles(() => ({
  root: {},
  contantview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export const CmsHome = withRouter((props) => {
  const [state, setState] = useState(homePageData);

  const getTheTable = (val) => {
    switch (val?.component) {
      case "HomePageBanner": {
        return <BannerCMS data={val} />;
      }
    }
  };

  return (
    <div>
      {state.map((val, i) => {
        return getTheTable(val);
      })}
    </div>
  );
});

export default CmsHome;
