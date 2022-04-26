import React, { useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../../components/Page";
import { Results, AboutVoucher } from "./components";
import { productCategory } from "../../services/mapper";
import { NetworkContext } from "../../context/NetworkContext";
import FullLoader from "../../components/Loader";
const rows = [
  { id: "Diamond", label: "Diamond" },
  { id: "Gemstone", label: "Gemstone" },
  { id: "Metal & Making Charge", label: "Gold" },
  { id: "Markup & Discount price update", label: "updateskuprice" },
];
const useStyles = makeStyles((theme) => ({
  root: {},
  aboutvoucher: {
    marginTop: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}));

export default function PriceupdateContent(props) {
  const classes = useStyles();

  const [masters, setMasters] = useState([]);
  const { sendNetworkRequest } = React.useContext(NetworkContext);
  const [, setSizes] = useState([]);
  const [products, setProducts] = useState([]);
  const [, setCategories] = useState([]);
  const [, setVendors] = useState([]);
  const [startrun, setStartrun] = useState(false);
  const [open, setOpen] = useState(false);

  async function updateprices(component) {
    setOpen(true);
    var bodydata = {};
    bodydata = {
      pricingcomponent: component.label,
      req_product_id: products,
    };
    setStartrun(true);
    let response = await sendNetworkRequest(
      "/price_run_new",
      {},
      bodydata,
      false
    );
    setOpen(false);
  }
  async function rerun(component) {
    var bodydata = {};
    bodydata = {
      component: component.label,
    };
    let response = await sendNetworkRequest(
      "/getincompletepricerun",
      {},
      bodydata,
      false
    );
    let history_id = response.id;
    let update_products = response.products;
    if (response.products && response.products.length > 0) {
      setOpen(true);

      var bodydata = {};
      bodydata = {
        pricingcomponent: component.label,
        req_product_id: update_products,
        history_id: history_id,
      };
      setStartrun(true);
      let response1 = await sendNetworkRequest(
        "/price_run_new",
        {},
        bodydata,
        false
      );
      setOpen(false);
    } else {
      alert(" Doesn't have any incomplete products");
    }
  }

  async function filterapllied(
    filterdata,
    categories,
    producttypes,
    material,
    purity
  ) {
    var bodydata = {};

    bodydata = {
      vendorid: filterdata && filterdata.length > 0 ? filterdata : "",
      product_category: categories && categories.length > 0 ? categories : "",
      product_type: producttypes && producttypes.length > 0 ? producttypes : "",
      material_list: material && material.length > 0 ? material : "",
      purity_list: purity && purity.length > 0 ? purity : "",
    };

    let response = await sendNetworkRequest(
      "/getdistinctproduct",
      {},
      bodydata,
      false
    );
    setProducts(response.products);
    setCategories(response.category);
    setVendors(response.vendorlist);
  }
  async function downloadlog() {
    window.location.href = "https://api-staging.stylori.com/getlogfile";
  }
  async function getsizes() {
    let response = await sendNetworkRequest("/getsizes", {}, {}, false);
    if (response.status < 400) {
      setSizes(response.sizes);
    } else {
      alert("succes21s");
    }
  }
  useEffect(() => {
    let mounted = true;

    setMasters(productCategory.mapper(props.data));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Page className={classes.root} title="Orders Management List">
        <FullLoader title={"Run Diamond Price"} isopen={open}></FullLoader>
        <AboutVoucher
          isdisabled={startrun}
          className={classes.aboutvoucher}
          apply={filterapllied}
          productids={products.length > 0 ? products : []}
          categorylist={masters.category}
          producttypelist={masters.product_type}
          vendorlist={masters.vendorcode}
          material={masters.material}
          masterData={masters}
          puritylist={masters.metalpurity}
          categories={["Fixed Amount", "percentage", "Free Shipping"]}
        />
        <Results
          products={products}
          pricingrows={rows}
          downloadlog={downloadlog}
          update={updateprices}
          resumeupdate={rerun}
        />
        <div
          style={{
            padding: "12px 0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/price-logs">
            <Button color="primary" variant="contained">
              Price History Logs
            </Button>
          </Link>
        </div>
      </Page>
    </MuiPickersUtilsProvider>
  );
}
