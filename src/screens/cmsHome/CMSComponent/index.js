import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../../config";
import { AlertContext } from "../../../context";
import { CMSBYPAGES, CMS_UPDATE } from "../../../graphql/query";
import BannerCMS from "./bannerCMS";

function CmsComponent(props) {
  const [state, setState] = useState([]);
  const location = useLocation();
  const snack = React.useContext(AlertContext);

  console.log("dataRecieved", state);

  useEffect(() => {
    fetchCall();
  }, []);

  // Initial fetch call by the page
  const fetchCall = () => {
    const pageName = location.state.name;
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CMSBYPAGES,
        variables: { page: pageName },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const dataRecieved = JSON.parse(data.data.cdnByPage.data);
        setState(dataRecieved);
      });
  };


  // on submitting each component (for Add, Edit and Delete) same Update call
  const handleSubmit = async (data, component, propsKey) => {
    const replaceIndex = state.findIndex((val) => val.component === component);
    const newState = state;
    newState.splice(replaceIndex, 1, data);
    const stringifyState = JSON.stringify(newState);
    fetch(`${API_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CMS_UPDATE,
        variables: {
          stringifyState: stringifyState,
          page: location.state.name,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        snack.setSnack({
          open: true,
          msg: "Successfully Updated!",
        });
        const newStateSet = JSON.parse(JSON.stringify(newState));
        setState(newStateSet);
        fetchCall();
      });
  };

  // Rendering the Tables based on the type of the component 
  const getTheTable = (val) => {
    switch (val?.component) {
      case "HomePageBanner": {
        return <BannerCMS data={val} handleSubmit={handleSubmit} />;
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
}

export default CmsComponent;
