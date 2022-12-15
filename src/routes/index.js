import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, Switch } from "react-router-dom";
import { GlobalContext } from "../context";
import { NetworkProvider } from "../context/NetworkContext";
import { ProductContext } from "../context/ProductuploadContext";
import {
  AbandonedCart,
  Addshippingattributes,
  Addtaxattributes,
  CategoryList,
  Configuration,
  Customerdetails,
  Dashboard,
  DiscountList,
  Earringbacking,
  Goldpriceupdate,
  HolidayManager,
  Inventory,
  Login,
  Manageadminusers,
  Manageusers,
  Markupprice,
  Masterattribute,
  Mastercategories,
  Mastercollections,
  Masterdesigns,
  Masterdiamonds,
  Masterdiamondsettings,
  Masterdiamondshapes,
  Mastergemsettings,
  Mastergemshapes,
  Mastergemtypes,
  Mastergenders,
  Mastermetalcolors,
  Masteroccassions,
  Masterorderstatus,
  Masterpaymentstatus,
  Masterproducttypes,
  Masterpurities,
  Masterroles,
  Masterscreens,
  Masterstonecolors,
  Masterstones,
  Masterstoneshapes,
  Masterstyles,
  Masterthemes,
  Masterweights,
  Materialmaster,
  OrderList,
  OrderManagementDetails,
  PriceLogs,
  Priceupdate,
  Productlist,
  Productupload,
  Salediscount,
  Seopriority,
  Shipmentsettings,
  Shippingattributes,
  Shippingzones,
  Taxsettings,
  Taxsetup,
  Useraddresses,
  Userconfiguration,
  Userwishlist,
  Vendorlist,
  Vendorprice,
  Voucherdiscount,
  VoucherdiscountListing,
  Warehouse,
  MasterCountry,
  DynamicFilters,
  CmsHome,
} from "../screens";
import GemstoneSetting from "../screens/GemstoneSetting/GemstoneSetting";
import ErrorLogs from "../screens/ErrorLogs/ErrorLogs";
import Banners from "../screens/Banners/banners";
import Silverbanner from "../screens/Banners/silverbanner/silverbanner";
import SilverListingbanner from "../screens/Banners/silverbanner/silverListingBanner/silverListingBanner";
import Styloribanner from "../screens/Banners/styloribanner/styloribanner";
import Editcategory from "../screens/CategoryList/components/editpage/editcategory";
import newmaterial from "../screens/CategoryList/components/newmaterial/newmaterial";
import { CreateVariant } from "../screens/ProductEdit/CreateVariant";
import { ProductAttributes } from "../screens/ProductEdit/ProductAttributes";
import { ImageUpload } from "../screens/ImageUpload";
import PriceUpload from "../screens/uploadprice/index.js";
import PrivateRoute from "./PrivateRoute";
import route from "./route";
import BannerCMS from "../screens/cmsHome/CMSComponent/bannerCMS";

const MainApp = () => {
  const { globalCtx } = React.useContext(GlobalContext);
  const { productCtx } = React.useContext(ProductContext);
  const client = new ApolloClient({ uri: globalCtx.gqlClient });

  return (
    <ApolloProvider client={client}>
      {/* <ProductProvider > */}
      <NetworkProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Login} />
          <Route path={route.login} component={Login} />
          <PrivateRoute path={route.dashboard} component={Dashboard} />
          <PrivateRoute path={route.productupload} component={Productupload} />
          <PrivateRoute path={route.configuration} component={Configuration} />
          <PrivateRoute path={route.vendor} component={Vendorlist} />
          <PrivateRoute path={route.productlist} component={Productlist} />
          <PrivateRoute path={route.materiallist} component={CategoryList} />
          <PrivateRoute path={route.editCategory} component={Editcategory} />
          <PrivateRoute path={route.materiallistpage} component={newmaterial} />
          <PrivateRoute path={route.pricelogs} component={PriceLogs} />
          <PrivateRoute path={route.imageUpload} component={ImageUpload} />
          <PrivateRoute
            path={route.producttypes}
            component={Masterproducttypes}
          />
          <PrivateRoute
            path={route.voucherdiscount}
            component={Voucherdiscount}
          />
          <PrivateRoute path={route.priceupdate} component={Priceupdate} />
          <PrivateRoute path={route.orderlist} component={OrderList} />
          <PrivateRoute path={route.userorders} component={OrderList} />
          <PrivateRoute path={route.address} component={Useraddresses} />

          <PrivateRoute path={route.vendorPrice} component={Vendorprice} />
          <PrivateRoute path={route.markupPrice} component={Markupprice} />
          <PrivateRoute path={route.salediscount} component={Salediscount} />
          <PrivateRoute path={route.taxsetup} component={Taxsetup} />
          <PrivateRoute path={route.taxsettings} component={Taxsettings} />
          <PrivateRoute path={route.category} component={Mastercategories} />
          <PrivateRoute
            path={route.masterattributes}
            component={Masterattribute}
          />
          <PrivateRoute path={route.dynamicFilter} component={DynamicFilters} />
          <PrivateRoute path={route.masterstones} component={Masterstones} />
          <PrivateRoute
            path={route.masterstonecolors}
            component={Masterstonecolors}
          />
          <PrivateRoute
            path={route.masterstoneshapes}
            component={Masterstoneshapes}
          />
          <PrivateRoute path={route.weights} component={Masterweights} />
          <PrivateRoute
            path={route.masteroccassions}
            component={Masteroccassions}
          />
          <PrivateRoute path={route.masterroles} component={Masterroles} />
          <PrivateRoute path={route.masterpages} component={Masterscreens} />
          <PrivateRoute
            path={route.manageadminusers}
            component={Manageadminusers}
          />
          <PrivateRoute
            path={route.goldpriceupdate}
            component={Goldpriceupdate}
          />
          <PrivateRoute path={route.manageusers} component={Manageusers} />
          <PrivateRoute
            path={route.customerdetails}
            component={Customerdetails}
          />
          <PrivateRoute path={route.userwishlist} component={Userwishlist} />
          <PrivateRoute
            path={route.orderdetails}
            component={OrderManagementDetails}
          />

          <PrivateRoute
            path={route.userconfiguration}
            component={Userconfiguration}
          />

          <PrivateRoute path={route.masterstyles} component={Masterstyles} />
          <PrivateRoute path={route.masterthemes} component={Masterthemes} />

          <PrivateRoute
            path={route.mastermaterial}
            component={Materialmaster}
          />
          <PrivateRoute
            path={route.mastercolors}
            component={Mastermetalcolors}
          />
          <PrivateRoute
            path={route.masterpurities}
            component={Masterpurities}
          />
          <PrivateRoute
            path={route.salediscountlist}
            component={DiscountList}
          />
          <PrivateRoute
            path={route.voucherdiscountlist}
            component={VoucherdiscountListing}
          />
          <PrivateRoute path={route.editvoucher} component={Voucherdiscount} />
          <PrivateRoute
            path={route.mastercollections}
            component={Mastercollections}
          />
          <PrivateRoute path={route.masterdesigns} component={Masterdesigns} />
          <PrivateRoute
            path={route.masterdiamonds}
            component={Masterdiamonds}
          />
          <PrivateRoute
            path={route.diamondsettings}
            component={Masterdiamondsettings}
          />
          <PrivateRoute
            path={route.diamondshapes}
            component={Masterdiamondshapes}
          />
          <PrivateRoute
            path={route.earringbacking}
            component={Earringbacking}
          />
          <PrivateRoute
            path={route.gemsettings}
            component={Mastergemsettings}
          />
          <PrivateRoute path={route.countriesFx} component={MasterCountry} />
          <PrivateRoute path={route.gemshapes} component={Mastergemshapes} />
          <PrivateRoute
            path={route.masterpaymentstatus}
            component={Masterpaymentstatus}
          />
          <PrivateRoute
            path={route.masterorderstatus}
            component={Masterorderstatus}
          />
          <PrivateRoute path={route.shippingzones} component={Shippingzones} />
          <PrivateRoute
            path={route.shippingattributes}
            component={Shippingattributes}
          />
          <PrivateRoute
            path={route.addshippingattributes}
            component={Addshippingattributes}
          />
          <PrivateRoute
            path={route.addtaxattributes}
            component={Addtaxattributes}
          />

          <PrivateRoute path={route.gender} component={Mastergenders} />
          <PrivateRoute path={route.seo} component={Seopriority} />

          <PrivateRoute path={route.gemtypes} component={Mastergemtypes} />

          <PrivateRoute
            exact
            path={route.editdiscount}
            component={Salediscount}
          />

          <PrivateRoute
            exact
            path={`${route.productAttributes}/:id`}
            component={ProductAttributes}
          />
          <PrivateRoute
            exact
            path={`${route.createVariant}`}
            component={CreateVariant}
          />
          <PrivateRoute
            path={route.shipmentsettings}
            component={Shipmentsettings}
          />
          <PrivateRoute path={route.banners} component={Banners} />
          <PrivateRoute path={route.styloribanner} component={Styloribanner} />
          <PrivateRoute path={route.silverbanner} component={Silverbanner} />
          <PrivateRoute
            path={route.silverlistingbanner}
            component={SilverListingbanner}
          />
          <PrivateRoute
            path={route.holiday_manager}
            component={HolidayManager}
          />
          <PrivateRoute path={route.error_logs} component={ErrorLogs} />
          <PrivateRoute path={route.warehouse} component={Warehouse} />
          <PrivateRoute path={route.inventory} component={Inventory} />
          <PrivateRoute path={route.abandoned_cart} component={AbandonedCart} />
          <PrivateRoute path={route.price_upload} component={PriceUpload} />
          <PrivateRoute path={route.CmsHome} component={CmsHome} />
          <PrivateRoute path={route.BannerCMS} component={BannerCMS} />

          <PrivateRoute
            path={route.GemstoneSetting}
            component={GemstoneSetting}
          />
        </Switch>
      </NetworkProvider>
      {/* </ProductProvider> */}
    </ApolloProvider>
  );
};

export default MainApp;
