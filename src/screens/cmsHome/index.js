import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { homePageData } from "./CMSComponent/homePageData";
import BannerCMS from "./CMSComponent/bannerCMS";
import CollectionCardCMS from "./CMSComponent/collectionCardCMS";
import HomePageIconsCMS from "./CMSComponent/homePageIcons";
import CollectionJewelleryCardCMS from "./CMSComponent/collectionJewelleryCardCMS";
import TestimonialCollectionCardCMS from "./CMSComponent/testimonialCardCMS";
import StoriesCardCMS from "./CMSComponent/storiesCardCMS";

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

      case "CollectionCardData": {
        return <CollectionCardCMS data={val} />;
      }

      case "HomePageIconsList": {
        return <HomePageIconsCMS data={val} />;
      }

      case "CollectionJewelleryData": {
        return <CollectionJewelleryCardCMS data={val} />;
      }

      case "TestimonialCard": {
        return <TestimonialCollectionCardCMS data={val} />;
      }

      case "StoriesCard": {
        return <StoriesCardCMS data={val} />;
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
