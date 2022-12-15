import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { homePageData } from "./CMSComponent/homePageData";
import BannerCMS from "./CMSComponent/bannerCMS";
import { API_URL, GRAPHQL_DEV_CLIENT, URL } from "../../config";
import {
  ALLCMS,
  allCms,
  ALLPAGESCMS,
  attributesByMasterID,
  COLLECTIONMASTER,
  GETALLERRORLOGS,
} from "../../graphql/query";
import { useApolloClient, useQuery } from "react-apollo";

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
  const [state2, setState2] = useState([]);
  console.log("state2", state2);

  useEffect(() => {

    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALLPAGESCMS,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // debugg(er;
        const dataRecieved = data.data.allCdns.nodes;
        setState2(dataRecieved);
      });
  }, []);

  // const { loading, data, error, refetch, networkStatus } = useQuery(ALLCMS);
  // console.log("loading",loading);
  // console.log("dataasdas",data);

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
