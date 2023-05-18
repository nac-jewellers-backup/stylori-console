import gql from "graphql-tag";

const PRODUCTCATEGORY = gql`
  query {
    allMasterProductCategories {
      nodes {
        alias
        name
        id
      }
    }
    allMasterProductTypes {
      nodes {
        alias
        id
        name
        shortCode
      }
    }
    allMasterMaterials {
      nodes {
        alias
        id
        name
      }
    }
    allMasterGenders {
      nodes {
        alias
        id
        name
      }
    }
    allMasterDiamondTypes {
      nodes {
        diamondClarity
        diamondColor
        id
      }
    }
    allMasterMetalsColor: allAttributes(condition: { masterId: 7 }) {
      nodes {
        alias
        id
        name
        shortCode
      }
    }
    allMasterDiamondsSettings {
      nodes {
        alias
        id
        name
      }
    }
    allMasterDiamondsShapes {
      nodes {
        name
        id
        alias
      }
    }
    allMasterThemes: allAttributes(condition: { masterId: 4 }) {
      nodes {
        alias
        id
        name
      }
    }

    allMasterStyles: allAttributes(condition: { masterId: 3 }) {
      nodes {
        alias
        id
        name
      }
    }
    allMasterOccasions: allAttributes(condition: { masterId: 9 }) {
      nodes {
        alias
        id
        name
      }
    }
    allMasterCollections: allAttributes(condition: { masterId: 6 }) {
      nodes {
        id
        alias
        name
      }
    }
    allMasterStonesColors {
      nodes {
        alias
        id
        name
      }
    }
    allMasterStones {
      nodes {
        alias
        id
        name
      }
    }
    allMasterMetalsColors {
      nodes {
        alias
        id
        name
        shortCode
      }
    }
    allMasterMetalsPurities {
      nodes {
        alias
        id
        name
        shortCode
      }
    }
    allMasterDiamondsColors {
      nodes {
        alias
        id
        name
        shortCode
      }
    }
    allMasterDiamondClarities {
      nodes {
        alias
        id
        name
      }
    }
    allMasterVendors {
      nodes {
        id
        name
        shortCode
        vendorDelivaryDays
      }
    }
    allProductLists(orderBy: PRODUCT_SERIES_DESC, first: 1) {
      nodes {
        productSeries
        id
      }
    }
    allMasterGemstonesTypes {
      nodes {
        alias
        colorCode
        id
        name
        shortCode
      }
    }
    allMasterGemstonesShapes {
      nodes {
        alias
        id
        name
      }
    }
    allMasterEarringBackings {
      nodes {
        name
        createdAt
        alias
        id
        nodeId
        updatedAt
      }
    }
    allMasterGemstonesSettings {
      nodes {
        alias
        id
        name
      }
    }
  }
`;
const PRODUCTFILTERMASTER = gql`
  query {
    allMasterProductCategories {
      nodes {
        updatedAt
        shortCode
        name
        id
        createdAt
        alias
      }
    }
    allMasterProductTypes {
      nodes {
        updatedAt
        shortCode
        name
        id
        createdAt
        alias
        displayOrder
      }
    }
  }
`;

const ALLPRODUCTLIST = gql`
  query {
    allProductLists(first: 500) {
      nodes {
        id
        nodeId
        productName
        productCategory
        productType
        productId
        createdAt
        isactive
        transSkuListsByProductId(condition: { isdefault: true }) {
          nodes {
            skuUrl
            discount
          }
        }
      }
      totalCount
    }
  }
`;
const PRODUCTLIST = (category) => gql`
  query ($Veiw: Int!, $Offset: Int!) {
    allProductLists(first: $Veiw, offset: $Offset) {
      nodes {
        id
        nodeId
        productName
        productCategory
        productType
        productId
        createdAt
        isactive
        transSkuListsByProductId(condition: { isdefault: true }) {
          nodes {
            skuUrl
            discount
          }
        }
      }
      totalCount
    }
  }
`;
const VENDORLISTS = gql`
  query {
    allMasterVendors(orderBy: CREATED_AT_DESC) {
      nodes {
        vendorDelivaryDays
        updatedAt
        state
        shortCode
        partnerCategory
        name
        organization
        gstNo
        currency
        createdAt
        city
        address
      }
      totalCount
    }
  }
`;

const TaxList_1 = gql`
  query {
    allMasterTaxSettings {
      nodes {
        hsnNumber
        taxName
        taxValue
        updatedAt
        id
      }
      totalCount
    }
  }
`; /*********** configuration query */

const TaxList = `
query  {
  allMasterTaxSettings(orderBy: UPDATED_AT_DESC) {
    nodes {
      hsnNumber
      taxName
      taxValue
      igst
      cgst
      sgst
      productAttributes
      displayAttributes
      updatedAt
      id
    }
    totalCount
  }
}
`;
const TaxSettingList = `
query  {
  allTaxsettings(orderBy: UPDATED_AT_DESC) {
    nodes {
      name
      value
      hsnCode
      id
    }
  }
}
`;

const MASTERMATERIAL = `
query  {
  allMasterMaterials(orderBy: UPDATED_AT_DESC) {
    nodes {
      id
      name
      alias
      isFilter
      isActive
      filterOrder
    }
  }
}
`;
const MASTERMATERIALCOLORS = `
query  {
  allMasterMetalsColors(orderBy: UPDATED_AT_DESC) {
    nodes {
      name
      alias
      shortCode
      id
      isFilter
      isActive
      filterOrder
    }
  }
}
`;

const MASTERPRODUCTPURITIES = `
query  {
  allMasterMetalsPurities(orderBy: UPDATED_AT_DESC) {
    nodes {
      name
      alias
      id
      isFilter
      isActive
      filterOrder
    }
  }
}
`;
const DESIGNMASTER = `
query  {
allMasterDesigns(orderBy: UPDATED_AT_DESC) {
  nodes {
    name
    alias
    isFilter
    isActive
    filterOrder
    id
  }
}
}`;
const COLLECTIONMASTER = `
query  {
  allMasterCollections(orderBy: UPDATED_AT_DESC) {
    nodes {
      name
      alias
      id
      isFilter
      isActive
      filterOrder
    }
  }
}
`;

const OCCASSIONSMASTER = `
query  {
  allMasterOccasions {
    nodes {
      alias
      id
      name
      updatedAt
      isFilter
      isActive
      filterOrder
    }
  }
}
`;
const STYLEMASTER = `
query  {
allMasterStyles {
  nodes {
    alias
    createdAt
    name
    id
    updatedAt
    isFilter
    isActive
    filterOrder
  }
}
}`;
const THEMEMASTER = `
query  {
  allMasterThemes {
    nodes {
      createdAt
      alias
      id
      name
      updatedAt
      isFilter
      isActive
      filterOrder
    }
  }
}`;
const DIAMONDMASTER = `
query {
  allMasterDiamondTypes(orderBy: UPDATED_AT_DESC) {
    nodes {
      shortCode
      diamondClarity
      diamondColor
      id
      isFilter
      isActive
      filterOrder
    }
  }
}

`;

const PAYMENTSTATUSMASTER = `
{
  allOrderStatusMasters {
    nodes {
      createdAt
      id
      isActive
      name
      updatedAt
    }
  }
  allPaymentStatusMasters(condition: {isActive: true}) {
    nodes {
      name
      createdAt
      id
      isActive
      updatedAt
    }
  }
}

`;
const DIAMONDSETTINGS = `
query  {
allMasterDiamondsSettings(orderBy: UPDATED_AT_DESC) {
  nodes {
    name
    id
    isFilter
    isActive
    filterOrder
  }
}
}
`;
const DIAMONDSHAPES = `
query  {
  allMasterDiamondsShapes(orderBy: UPDATED_AT_DESC) {
    nodes {
      name
      id
      isFilter
      isActive
      filterOrder
    }
  }
}
`;
const MASTERPRODUCTTYPES = `
query  {
allMasterProductTypes(orderBy: UPDATED_AT_DESC) {
  nodes {
    certificate
    name
    id
    alias
    isActive
    isFilter
    shortCode
    displayOrder
  }
}
}`;
const MASTERCATEGORIES = `
query{
  allMasterProductCategories(orderBy: FILTER_ORDER_DESC) {
    nodes {
      alias
      id
      name
      shortCode
      isFilter
      isActive
      filterOrder
    }
  }
}
`;

const GEMSTONE_MARKUP_SETTING = `

query{
  allMaterialMarkups(orderBy: UPDATED_AT_DESC) {
    nodes {
      createdAt
      id
      markupType
      markupValue
      materialName
      nodeId
      priceMax
      priceMin
      updatedAt
    }
  }
}


`;

const MASTERPAGES = `
query  {
  allUniquepages(orderBy: UPDATED_AT_DESC) {
    nodes {
      pagename
      displayname
      id
    }
  }
}`;
const GOLDPRICESETUPMASTER = `
query  {
  allMasterVendors {
    nodes {
      name
      id
      shortCode
    }
  },
  allMasterMetalsPurities {
    nodes {
      name
      shortCode
    }
  }
  allMasterMaterials(filter: {or: [{shortCode: {equalTo: "G"}},{shortCode: {equalTo: "S"}},{shortCode: {equalTo: "P"}}]}) {
    nodes {
      name
      shortCode
    }
  }
}`;
const EARRINGBACKING = `
query  {
  allMasterEarringBackings(orderBy: UPDATED_AT_DESC) {
    nodes {
      id
      name
      alias
      updatedAt
      createdAt
      isFilter
      isActive
      filterOrder
    }
  }
}`;

const MASTERSTONES = `
query  {
  allMasterStones(orderBy: UPDATED_AT_DESC) {
    nodes {
      alias
      id
      name
      isFilter
      isActive
      filterOrder
    }
  }
}`;

const MASTERCOUNTRIES = `
query  {
  allMasterCountries(condition: {isActive: true}) {
    nodes {
      name
      id
      iso
    }
  }
}`;
const SHIPPINGCHARGES = `query{
  allShippingCharges {
    nodes {
      id
      name
      isActive
      isCart
      chargeType
      rangeFrom
      rangeTo
      shipmentCharge
      productAttributes
      displayAttributes
      shippingZoneByZoneId {
        name
        id
        isActive
      }
    }
  }
}`;
const ACTIVESHIPPINGZONES = `
query  {
  allShippingZones(condition: {isActive: true}) {
    nodes {
      name
      id
      isActive
    }
  }
}`;
const SHIPPINGZONES = `
query  {
  allShippingZones {
    nodes {
      name
      id
      isActive
      shippingZoneCountriesByZoneId {
        nodes {
          countryId
          createdAt
          id
          masterCountryByCountryId {
            name
            nicename
            id
          }
        }
      }
      shippingChargesByZoneId {
        nodes {
          name
        }
      }
    }
  }
}`;
const MASTERSTONECOLORS = `
query  {
  allMasterStonesColors(orderBy: UPDATED_AT_DESC) {
    nodes {
      alias
      name
      id
      isFilter
      isActive
      filterOrder
    }
  }
}`;
const MASTERWEIGHTS = `
query  {
  allMasterWeights(orderBy: UPDATED_AT_DESC) {
    nodes {
      alias
      createdAt
      name
      id
      updatedAt
      isFilter
      isActive
      filterOrder
    }
  }
}`;

const MASTERSTONESHAPES = `
query  {
  allMasterStonesShapes(orderBy: UPDATED_AT_DESC) {
    nodes {
      id
      name
      createdAt
      alias
      updatedAt
      isFilter
      isActive
      filterOrder
    }
  }
}`;

const MASTERATTRIBUTES = `
query  {
allAttributeMasters {
  nodes {
    name
    isFilter
    id
    isSearch
    isActive
    filterPosition
    isTopMenu
    createdAt
    shortCode
    updatedAt
  }
}
}`;

const MASTERGEMSETTINGS = `
query  {
  allMasterGemstonesSettings(orderBy: UPDATED_AT_DESC) {
    nodes {
      name
      id
      isFilter
      isActive
      filterOrder
    }
  }
}`;

const MASTERGEMSHAPES = `
query  {
  allMasterGemstonesShapes(orderBy: UPDATED_AT_DESC) {
    nodes {
      id
      name
      alias
      isFilter
      isActive
      filterOrder
    }
  }
}`;
const MASTERGEMTYPES = `
query  {
  allMasterGemstonesTypes(orderBy: UPDATED_AT_DESC) {
    nodes {
      id
      name
      colorCode
      isFilter
      isActive
      filterOrder
    }
  }
}`;
const MASTERGENDER = `
query  {
  allMasterGenders(orderBy: UPDATED_AT_DESC) {
    nodes {
      name
      alias
      id
      isFilter
      isActive
      filterOrder
    }
  }
}`;
const SEOPRIORITIES = `
query  {
  allSeoUrlPriorities(orderBy: UPDATED_AT_DESC) {
    nodes {
      priority
      seoText
      seoUrl
      imageUrl
        mobileImageUrl
      id
      attributeName
      attributeValue
    }
  }
}`;
/**************** */

// const PRODUCTLIST  = (category) =>  gql`
// query  {
//   allProductLists ${category ? `(${category ? 'filter: {productCategory: {equalTo: "Jewellery"}}' : ''})` : ""} {
//     nodes {
//       id
//       nodeId
//       productName,
//       productCategory,
//       productType
//       productId,
//       createdAt
//       isactive,
//       transSkuListsByProductId(condition: {isdefault: true}) {
//         nodes {
//           skuUrl
//           discount
//         }
//       }
//     }
//     totalCount
//   }
// }
// `;

const GOLDPRICELIST = gql`
  query MyQuery($vendorCode: String!) {
    allGoldPriceSettings(condition: { vendorCode: $vendorCode }) {
      nodes {
        purity
        vendorCode
        updatedAt
        sellingPriceType
        sellingPrice
        material
        id
        createdAt
        costPrice
      }
      totalCount
    }
  }
`;

const DIAMONDMARKUP = gql`
  query MyQuery($vendorCode: String!) {
    allPricingMarkups(
      condition: { material: $vendorCode }
      orderBy: UPDATED_AT_DESC
    ) {
      nodes {
        updatedAt
        sellingPriceMin
        sellingPriceMax
        material
        category
        productType
        purities
        markupValue
        markupType
        id
        createdAt
      }
      totalCount
    }
  }
`;
const ALLMARKUPPRICE = gql`
  query MyQuery {
    allPricingMarkups(orderBy: UPDATED_AT_DESC) {
      nodes {
        updatedAt
        sellingPriceMin
        sellingPriceMax
        material
        category
        productType
        purities
        markupValue
        markupType
        id
        createdAt
        __typename
      }
      totalCount
      __typename
    }
  }
`;
const DIAMONDPRICELIST = gql`
  query MyQuery($vendorCode: String!) {
    allDiamondPriceSettings(condition: { vendorCode: $vendorCode }) {
      nodes {
        costPrice
        createdAt
        diamondClarity
        diamondColour
        id
        sellingPrice
        sellingPriceType
        updatedAt
        vendorCode
      }
      totalCount
    }
  }
`;

const GEMPRICELIST = gql`
  query MyQuery($vendorCode: String!, $ratetype: Int!) {
    allGemstonePriceSettings(
      condition: { vendorCode: $vendorCode, rateType: $ratetype }
    ) {
      nodes {
        createdAt
        id
        sellingPriceType
        updatedAt
        vendorCode
        gemstoneType
        price
        priceType
        rateType
        weightEnd
        weightStart
        __typename
      }
      totalCount
      __typename
    }
  }
`;
// const CATGORYLIST = gql`
// query {
//   allMasterMaterials {
//     nodes {
//       name
//       shortCode
//     }
// }`;

const CATGORYLIST = gql`
  query {
    allMasterProductCategories {
      nodes {
        alias
        name
        shortCode
        id
      }
      totalCount
    }
  }
`;
const PRODUCTTYPEMASTER = gql`
  query {
    allMasterProductTypes {
      nodes {
        name
        id
        alias
        shortCode
      }
      totalCount
    }
  }
`;

const MATERIALMASTER = gql`
  query {
    allMasterMaterials {
      nodes {
        alias
        name
        shortCode
      }
      totalCount
    }
  }
`;

const MASTERCOLORS = gql`
  query {
    allMasterMetalsColors {
      nodes {
        name
        alias
        shortCode
      }
      totalCount
    }
  }
`;

const SALEDISCOUNTS = gql`
  query {
    allSaleDiscounts {
      nodes {
        id
        discountName
        discountType
        discountValue
        components
        attributes
        isActive
        productAttributes
        productAttributesText
      }

      totalCount
    }
  }
`;

const VOUCHERDISCOUNTS = gql`
  query {
    allVouchers {
      nodes {
        id
        name
        code
        uses
        maxUses
        isActive
        voucherCodes
        description
      }

      totalCount
    }
  }
`;

const MASTERPURITIES = gql`
  query {
    allMasterMetalsPurities {
      nodes {
        name
        alias
        shortCode
      }
      totalCount
    }
  }
`;
const VENDORLIST = `
query {
  allMasterVendors {
    nodes {
      vendorDelivaryDays
      updatedAt
      state
      shortCode
      partnerCategory
      name
      organization
      gstNo
      currency
      createdAt
      city
      address
    }
  }
}`;

const METALMASTER = `
query {
  allMasterMaterials {
    nodes {
      name
      shortCode
    }
  },
  allMasterMetalsPurities {
    nodes {
      name
      shortCode
    }
  }
}`;

const MASTERCATEGORY = `
query {
  
    allMasterProductCategories {
      nodes {
        name
        shortCode
      }
    }
    allMasterProductTypes {
      nodes {
        name
        shortCode
      }
    }
    allMasterMaterials {
      nodes {
        name
        id
        shortCode
      }
    }
    allMasterMetalsPurities {
      nodes {
        name
        shortCode
      }
    }
  
  
}`;

const GEMSTONEMASTER = `
query {
  allMasterGemstonesTypes {
    nodes {
      name
      shortCode
      colorCode
    }
  }  
}`;

const MAKINGCHARGEPRICELIST = gql`
  query MyQuery($vendorCode: String!, $ratetype: Int!) {
    allMakingChargeSettings(
      condition: { vendorCode: $vendorCode, rateType: $ratetype }
    ) {
      nodes {
        weightStart
        weightEnd
        vendorCode
        updatedAt
        sellingPriceType
        rateType
        purity
        priceType
        price
        material
        id
        createdAt
      }
      totalCount
    }
  }
`;

const PRODUCTLISTSTATUSEDIT = gql`
  mutation MyMutation($productId: String!, $isActive: Boolean!) {
    __typename
    updateProductListByProductId(
      input: {
        productId: $productId
        productListPatch: { isactive: $isActive }
      }
    ) {
      clientMutationId
      productList {
        isactive
      }
    }
  }
`;

const CREATETAXSETUP = gql`
  mutation MyMutation(
    $id: UUID!
    $updatedAt: Date!
    $createdAt: Date!
    $taxValue: Double!
    $taxName: String!
    $hsnNumber: String!
  ) {
    __typename
    createMasterTaxSetting(
      input: {
        masterTaxSetting: {
          id: $id
          updatedAt: $updatedAt
          createdAt: $createdAt
          taxValue: $taxValue
          taxName: $taxName
          hsnNumber: $hsnNumber
        }
      }
    ) {
      clientMutationId
    }
  }
`;

const VOUCHERSTATUSEDIT = gql`
  mutation MyMutation($voucherId: UUID!, $isActive: Boolean!) {
    __typename
    updateVoucherById(
      input: { id: $voucherId, voucherPatch: { isActive: $isActive } }
    ) {
      clientMutationId
      voucher {
        isActive
      }
    }
  }
`;

const DISCOUNTSTATUSEDIT = gql`
  mutation MyMutation($discountId: UUID!, $isActive: Boolean!) {
    __typename
    updateSaleDiscountById(
      input: { id: $discountId, saleDiscountPatch: { isActive: $isActive } }
    ) {
      clientMutationId
      saleDiscount {
        isActive
      }
    }
  }
`;

const DELETEMARKUPPRICE = gql`
  mutation MyMutation($elementId: UUID!) {
    __typename
    deletePricingMarkupById(input: { id: $elementId }) {
      clientMutationId
    }
  }
`;

const DELETEGOLDPRICE = gql`
  mutation MyMutation($elementId: UUID!) {
    __typename
    deleteGoldPriceSettingById(input: { id: $elementId }) {
      clientMutationId
    }
  }
`;
const DELETESALEDISCOUNT = gql`
  mutation MyMutation($elementId: UUID!) {
    __typename
    deleteSaleDiscountById(input: { id: $elementId }) {
      clientMutationId
    }
  }
`;

const DELETEVOUCHERDISCOUNT = gql`
  mutation MyMutation($elementId: UUID!) {
    __typename
    deleteVoucherById(input: { id: $elementId }) {
      clientMutationId
    }
  }
`;

const DELETEMAKINGCHARGE = gql`
  mutation MyMutation($elementId: UUID!) {
    __typename
    deleteMakingChargeSettingById(input: { id: $elementId }) {
      clientMutationId
    }
  }
`;

const DELETEGEMCHARGE = gql`
  mutation MyMutation($elementId: UUID!) {
    __typename
    deleteGemstonePriceSettingById(input: { id: $elementId }) {
      clientMutationId
    }
  }
`;
const DELETEDIAMONDCHARGE = gql`
  mutation MyMutation($elementId: UUID!) {
    __typename
    deleteDiamondPriceSettingById(input: { id: $elementId }) {
      clientMutationId
    }
  }
`;

const PRODUCTDIAMONDTYPES = `
query{
  allMasterDiamondTypes {
    nodes {
      diamondClarity
      diamondColor
      id
    }
  }
}
`;
const PRODUCTEDIT = `
query MyQuery($productId: String!) {
  productListByProductId(productId: $productId) {
    productMetalcoloursByProductId {
      nodes {
        productColor
        id
      }
    }
    height
    width
    productId
    productName
    productType
    prodDescription
    vendorCode
    productVendorCode
    sellingQty
    maxBookingQty
    gender
    earringBacking
    isactive
    productMaterialsByProductSku {
      nodes {
        materialName
      }
    }
    productDiamondsByProductSku {
      nodes {
        diamondClarity
        diamondColour
        diamondSettings
        diamondShape
        diamondType
        id
        stoneCount
        stoneWeight
      }
    }
    productGemstonesByProductSku {
      nodes {
        gemstoneSetting
        gemstoneShape
        gemstoneSize
        gemstoneType
        gemstonsSize
        id
        stoneCount
        stoneWeight
      }
    }
    productImagesByProductId(orderBy: IMAGE_POSITION_ASC) {
      nodes {
        id
        imagePosition
        productId
        imageUrl
        ishover
        isdefault
        productColor
      }
    }
    productPuritiesByProductId {
      nodes {
        purity
        id
      }
    }
    productThemesByProductId(condition: { isActive: true }) {
      nodes {
        themeName
        id
      }
    }
    productStonecolorsByProductId {
      nodes {
        id
        stonecolor
      }
    }
    productStylesByProductId(condition: { isActive: true }) {
      nodes {
        styleName
        id
      }
    }
    productCollectionsByProductId {
      nodes {
        collectionName
        id
      }
    }
    productOccassionsByProductId(condition: { isActive: true }) {
      nodes {
        occassionName
        id
      }
    }
    productStonecountsByProductId {
      nodes {
        id
        stonecount
      }
    }
    transSkuListsByProductId {
      nodes {
        skuSize
        diamondType
        metalColor
        purity
        productId
        skuWeight
        generatedSku
        costPrice
        costPriceTax
        discountPrice
        discountPriceTax
        markupPrice
        marginOnSalePercentage
        markupPriceTax
        marginOnSalePercentage
        sellingPrice
        discountDesc
        sellingPriceTax
        isReadyToShip
        discount
        isActive
        availableStockQty
        isdefault
        vendorDeliveryTime
        id
        isActive
        
        transSkuDescriptionsBySkuId {
          nodes {
            skuDescription
            certificate
            ringsizeImage
          }
        }
        minOrderQty
        maxOrderQty
        isOrderable
        orderShippingDays
      }
    }
    productCategory
    sizeVarient
    masterVendorByVendorCode {
      name
    }
  }
}


`;

const ALLMASTERRINGSIZE = `
  query {
    allMasterRingsSizes {
      nodes {
        gender
        productType
        name
        size
        sizeValue
      }
    }
  }
`;

const ALLSTYLORILANDINGBANNERS = `
query MyQuery {
  allStyloriBanners {
    nodes {
      id
      mobile
      position
      url
      web
    }
  }
}
`;
const ALLSTYLORISILVERLANDINGBANNERS = `
query MyQuery {
  allStyloriSilverBanners(condition: {urlParam: "landing"}) {
    nodes {
      id
      mobile
      position
      url
      web
      urlParam
    }
  }
}


`;

const CREATESTYLORILANDINGBANNER = `
mutation MyMutation(
  $now: Datetime!
  $url: String
  $web: String
  $mobile: String
  $position: Int
) {
  createStyloriBanner(
    input: {
      styloriBanner: {
        createdAt: $now
        updatedAt: $now
        mobile: $mobile
        position: $position
        url: $url
        web: $web
      }
    }
  ) {
    clientMutationId
    styloriBanner {
      id
      mobile
      position
      updatedAt
      url
      web
      createdAt
    }
  }
}
`;
const DELETESTYLORILANDINGBANNER = `
mutation MyMutation($id : Int!) {
  deleteStyloriBannerById(input: {id: $id}) {
    styloriBanner {
      id
      mobile
      position
      url
      web
      
    }
  }
}`;

const ALLSTYLORISILVERLISTINGBOTTOMBANNERS = `
query MyQuery {
  allStyloriSilverBanners(condition: {urlParam: "bottom"}) {
    nodes {
      id
      mobile
      position
      url
      web
      urlParam
    }
  }
}
`;
const CREATESILVERLISTINGBOTTOMBANNER = `
mutation MyMutation(
  $now: Datetime!
  $url: String
  $web: String
  $mobile: String
   $position: String
) {
  createStyloriSilverBanner(
    input: {
      styloriSilverBanner: {
        createdAt: $now
        updatedAt: $now
        mobile: $mobile
        url: $url
        web: $web
        urlParam: "bottom"
        position: $position
      }
    }
  ) {
    clientMutationId
    styloriSilverBanner {
      id
      mobile
      updatedAt
      url
      web
      createdAt
      urlParam
    }
  }
}

`;
const DELETESILVERLISTINGBOTTOMBANNER = `
mutation MyMutation($id: Int!) {
  deleteStyloriSilverBannerById(input: { id: $id }) {
    styloriSilverBanner {
      id
      mobile
      position
      url
      web
    }
  }
}`;

const CREATESILVERLANDINGBANNER = `
mutation MyMutation(
  $now: Datetime!
  $url: String
  $web: String
  $mobile: String
  $position: String
) {
  createStyloriSilverBanner(
    input: {
      styloriSilverBanner: {
        createdAt: $now
        updatedAt: $now
        mobile: $mobile
        position: $position
        url: $url
        web: $web
        urlParam :"landing"
      }
    }
  ) {
    clientMutationId
    styloriSilverBanner {
      id
      mobile
      position
      updatedAt
      url
      web
      createdAt
    }
  }
}`;
const DELETESILVERLANDINGBANNER = `
mutation MyMutation($id : Int!) {
  deleteStyloriSilverBannerById(input: {id: $id}) {
    styloriSilverBanner {
      id
      nodeId
      mobile
      position
      updatedAt
      url
      web
      createdAt
    }
  }
}
`;
const ALLSTYLORISILVERLISTINGPAGE = `
query MyQuery {
  allStyloriSilverBanners
  (condition: {urlParam: "listingPage"}) 
  {
    nodes {
      id
      mobile
      position
      url
      web
      urlParam 
    }
  }
}

`;

const ALLSPECIFICLISTINGPAGE = `
query MyQuery {
  allStyloriSilverBanners
  (condition: {url: "specificListingPage"}) 
  {
    nodes {
      id
      mobile
      position
      web
      urlParam
    }
  }
}
`;

const CREATESPECIFICLISTINGPAGE = `
mutation MyMutation(
  $now: Datetime!
  $web: String
  $mobile: String
  $urlParam :String
) {
  createStyloriSilverBanner(
    input: {
      styloriSilverBanner: {
        createdAt: $now
        updatedAt: $now
        mobile: $mobile
       
        url: "specificListingPage"
        web: $web
        urlParam : $urlParam
      }
    }
  ) {
    clientMutationId
    styloriSilverBanner {
      id
      mobile
      position
      updatedAt
      url
      web
      createdAt
    }
  }
}
`;

const CREATESILVERLISTINGPAGE = `
mutation MyMutation(
  $now: Datetime!
  $url: String
  $web: String
  $mobile: String
  $position: String
) {
  createStyloriSilverBanner(
    input: {
      styloriSilverBanner: {
        createdAt: $now
        updatedAt: $now
        mobile: $mobile
        position: $position
        url: $url
        web: $web
        urlParam : "listingPage"
      }
    }
  ) {
    clientMutationId
    styloriSilverBanner {
      id
      mobile
      position
      updatedAt
      url
      web
      createdAt
    }
  }
}
`;
const PRODUCTDESCRIPTIONEDIT = `
mutation MyMutation($productId: String!, $prod_desc: String!) {
  updateProductListByProductId(
    input: {
      productListPatch: { prodDescription: $prod_desc }
      productId: $productId
    }
  ) {
    productList {
      prodDescription
      id
      productId
    }
  }
}

`;

const ALLSTYLORISILVERROUTINGPAGE = `
query MyQuery {
  allStyloriSilverBanners(condition: {url: "#"}) {
    nodes {
      id
      mobile
      position
      url
      web
      urlParam
    }
  }
}`;
const CREATESTYLORISILVERROUTINGPAGE = `
mutation MyMutation(
  $now: Datetime!
  $web: String
  $mobile: String
  $position: String
  $urlParam: String
) {
  createStyloriSilverBanner(
    input: {
      styloriSilverBanner: {
        createdAt: $now
        updatedAt: $now
        mobile: $mobile
        position: $position
        url: "S"
        web: $web
        urlParam: $urlParam
      }
    }
  ) {
    clientMutationId
    styloriSilverBanner {
      id
      mobile
      position
      updatedAt
      url
      web
      createdAt
      urlParam
    }
  }
}
`;

const HOLIDAYLIST = gql`
  query ($first: Int, $offset: Int, $filter: HolidayManagerFilter) {
    allHolidayManagers(
      first: $first
      offset: $offset
      filter: $filter
      orderBy: DATE_ASC
    ) {
      nodes {
        id
        holiday
        date
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;

const WAREHOUSELIST = gql`
  query {
    allWarehouses(orderBy: ID_ASC) {
      nodes {
        id
        name
        shippingInDays
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

const INVENTORYLIST = gql`
  query ($first: Int, $offset: Int, $filter: InventoryFilter) {
    allInventories(first: $first, offset: $offset, filter: $filter) {
      nodes {
        id
        generatedSku
        numberOfItems
        createdAt
        updatedAt
        warehouse: warehouseByWarehouseId {
          id
          name
        }
      }
      totalCount
    }
  }
`;

const VALIDATEGENERATEDSKU = gql`
  query ($generatedSku: String!) {
    allTransSkuLists(condition: { generatedSku: $generatedSku }) {
      nodes {
        id
      }
    }
  }
`;

const STOCKSTATUS = gql`
  query {
    allWarehouses {
      nodes {
        name
        isActive
        inventoriesByWarehouseId {
          aggregates {
            sum {
              numberOfItems
            }
          }
        }
      }
    }
  }
`;

const ABANDONEDCART = gql`
  query (
    $first: Int
    $offset: Int
    $orderBy: [ShoppingCartsOrderBy!]
    $condition: ShoppingCartCondition
    $filter: ShoppingCartFilter
  ) {
    allShoppingCarts(
      first: $first
      offset: $offset
      orderBy: $orderBy
      condition: $condition
      filter: $filter
    ) {
      nodes {
        id
        isActive
        netAmount
        status
        taxAmount
        userprofileId
        user: userProfileByUserprofileId {
          id
          firstName
          lastName
          username
          email
          mobile
        }
        cart_items: shoppingCartItemsByShoppingCartId {
          nodes {
            productSku
            qty
            transSkuListByProductSku {
              generatedSku
              skuId
              productListByProductId {
                productName
              }
            }
          }
        }
        grossAmount
        discountedPrice
        discount
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;

const CARTBYID = gql`
  query ($id: UUID!) {
    cart: shoppingCartById(id: $id) {
      id
      isActive
      netAmount
      status
      taxAmount
      userprofileId
      grossAmount
      discountedPrice
      discount
      createdAt
      updatedAt
      address: cartAddressesByCartId {
        nodes {
          id
          addressline1
          addressline2
          city
          contactNumber
          country
          countryCode
          createdAt
          firstname
          lastname
          pincode
          salutation
          state
          updatedAt
          addressType
        }
      }
      user: userProfileByUserprofileId {
        id
        firstName
        lastName
        username
        email
        mobile
        isemailverified
        ismobileverified
      }
      cart_items: shoppingCartItemsByShoppingCartId {
        nodes {
          productSku
          qty
          transSkuListByProductSku {
            markupPrice
            markupPriceTax
            discountPrice
            discountPriceTax
            generatedSku
            skuId
            productListByProductId {
              productName
              productImagesByProductId(
                condition: { isdefault: true, imagePosition: 1 }
              ) {
                nodes {
                  productId
                  imageUrl
                }
              }
            }
          }
        }
      }
      follow_ups: communicationLogsByCartId {
        nodes {
          type
          messageType
          senderResponseId
          createdAt
        }
      }
    }
  }
`;

const IMAGEDELETE = `
mutation MyMutation($productimageid: UUID!) {
  deleteProductImageById(input: { id: $productimageid }) {
    productListByProductId {
      productId
    }
  }
}

`;

const GETALLERRORLOGS = gql`
  query MyQuery {
    allUiErrorLogs {
      nodes {
        id
        page
        error
        message
        createdAt
      }
      totalCount
    }
  }
`;

const GETORDERCOMMUNICATIONLOGS = gql`
  query paymentResponseAndCommunicationLogs($id: UUID!) {
    order: orderById(id: $id) {
      payment_details: paymentDetailsByOrderId(orderBy: CREATED_AT_DESC) {
        nodes {
          id
          paymentResponse
        }
      }
      communication_logs: communicationLogsByOrderId(orderBy: UPDATED_AT_DESC) {
        nodes {
          createdAt
          id
          messageType
          orderId
          senderResponseId
          type
        }
      }
    }
  }
`;

const PRICE_RUN_LOGS = gql`
  query ($first: Int, $offset: Int) {
    allPriceRunningHistories(
      first: $first
      offset: $offset
      orderBy: UPDATED_AT_DESC
    ) {
      nodes {
        id
        completedProductCount
        pricingComponent
        logs: pricingLogsByPriceRunningHistoryId {
          nodes {
            requestedProducts
            successfullyExecutedProducts
            failedProducts
          }
        }
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;

const CREATE_GEMSTONE_MARKUP = `

mutation MyMutation($markupType: Int, $markupValue: Float, $materialName: String, $priceMax: Float, $priceMin: Float, $updatedAt: Datetime!, $createdAt: Datetime!, $id: UUID!) {
  createMaterialMarkup(
    input: {materialMarkup: {createdAt: $createdAt, updatedAt: $updatedAt, markupType: $markupType, markupValue: $markupValue, materialName: $materialName, priceMax: $priceMax, priceMin: $priceMin, id: $id}}
  ) {
    materialMarkup {
      markupType
      id
      markupValue
      materialName
      priceMax
      priceMin
    }
  }
}

`;
const DELETE_MATERIAL_MARKUP = `
mutation MyMutation($id: UUID!) {
  deleteMaterialMarkupById(input: {id: $id}) {
    materialMarkup {
      markupType
      markupValue
      materialName
      nodeId
      priceMax
    }
  }
}`;

const UPDATE_MATERIAL_MARKUP = `
mutation MyMutation(
  $id: UUID!
  $createdAt: Datetime
  $markupType: Int
  $markupValue: Float
  $materialName: String
  $priceMax: Float
  $priceMin: Float
  $updatedAt: Datetime

) {
  updateMaterialMarkupById(
    input: {
      materialMarkupPatch: {
        createdAt: $createdAt
        markupType: $markupType
        markupValue: $markupValue
        materialName: $materialName
        priceMax: $priceMax
        priceMin: $priceMin
        updatedAt: $updatedAt
      }
      id: $id
    }
  ) {
    materialMarkup {
      createdAt
      id
      markupType
      markupValue
      materialName
      nodeId
      priceMax
      priceMin
      updatedAt
    }
  }
}

`;

export const dynamicFilterAttributes = gql`
  query {
    master: allAttributeMasters(
      orderBy: NAME_ASC
      filter: { name: { notIn: ["Weights", "Category", "Product Type"] } }
    ) {
      nodes {
        id
        name
        attributes: attributesByMasterId(condition: { isActive: true }) {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const attributesByMasterID = gql`
  query ($masterId: Int!, $search: String) {
    attributes: allAttributes(
      condition: { masterId: $masterId }
      filter: { name: { includesInsensitive: $search } }
    ) {
      nodes {
        id
        name
        filterPosition
        isActive
        isSearch
        isFilter
        shortCode
        alias
        aliasId
        last_updated_at: updatedAt
      }
    }
  }
`;

const ALLPAGESCMS = `query MyQuery {
  allCdns {
    nodes {
      id
      isActive
      data
      page
    }
  }
}`;
const CMSBYPAGES = `
    query ($page: String!){
        cdnByPage(page: $page) {
          data
          id
          page
        }
      }
    `;

const CMS_UPDATE = `
  mutation updateStore( $stringifyState: JSON!,$page: String!) {
    updateCdnByPage(input: { cdnPatch: { data: $stringifyState }, page: $page }) {
      cdn {
        createdAt
        data
        id
        isActive
        nodeId
        page
        updatedAt
      }
    }
  }
`;

const UPDATE_STATUS_CMS = `
mutation updateStatus($isActive: Boolean!, $page: String!){
  updateCdnByPage(input: {cdnPatch: {isActive: $isActive}, page: $page}){
    cdn {
      createdAt
      data
      id
      isActive
      nodeId
      page
      updatedAt
    }
  }
}`;

const UPDATE_COMBO_BY_MAIN_PRODUCT = `
  mutation updateCombo($offeredProducts: [String], $discountType: String!, $discountValue: Int!,$mainProduct: String!){
    updateProductComboOfferByMainProduct(
      input: {mainProduct: $mainProduct, productComboOfferPatch: {offeredProducts: $offeredProducts,discountValue:$discountValue,discountType:$discountType}}
    ) {
      productComboOffer {
        mainProduct
        discountValue
        discountType
        offeredProducts
      }
    }
  }
`;

const CREATE_CMS = `
mutation createNew($cloneData: JSON!, $page: String!){
  createCdn(input: {cdn: {data: $cloneData, page: $page}}) {
    cdn {
      data
      page
    }
  }
}`;

const UPDATE_URL = `
mutation updateStatus($changePage: String!, $page: String!){
  updateCdnByPage(input: {cdnPatch: {page: $changePage}, page: $page}){
    cdn {
      data
      isActive
      page
    }
  }
}`;

const LIST_COMBO_PRODUCTS = gql`
  query ($after: Cursor, $first: Int) {
    allProductComboOffers(after: $after, first: $first) {
      nodes {
        id
        mainProduct
        offeredProducts
        discountType
        discountValue
        productListByMainProduct {
          id
          productName
          productImagesByProductId(condition: { imagePosition: 1 }) {
            nodes {
              imageUrl
            }
          }
          transSkuListsByProductId(condition: { isdefault: true }) {
            nodes {
              markupPrice
            }
          }
        }
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const FETCH_COMBO_OFFERED_PRODUCTS = gql`
  query ($offeredProducts: [String!]) {
    allProductLists(filter: { productId: { in: $offeredProducts } }) {
      nodes {
        productId
        productName
        productImagesByProductId(condition: { imagePosition: 1 }) {
          nodes {
            imageUrl
          }
        }
        transSkuListsByProductId(condition: { isdefault: true }) {
          nodes {
            sellingPrice
            markupPrice
          }
        }
      }
    }
  }
`;

export {
  PRODUCTCATEGORY,
  PRODUCTLIST,
  PRODUCTEDIT,
  PRODUCTLISTSTATUSEDIT,
  PRODUCTDIAMONDTYPES,
  GOLDPRICELIST,
  DIAMONDPRICELIST,
  GEMPRICELIST,
  MAKINGCHARGEPRICELIST,
  VENDORLIST,
  ALLPRODUCTLIST,
  DIAMONDMARKUP,
  PRODUCTFILTERMASTER,
  METALMASTER,
  GEMSTONEMASTER,
  MASTERCATEGORY,
  DELETEMARKUPPRICE,
  DELETEMAKINGCHARGE,
  DELETEGEMCHARGE,
  DELETEGOLDPRICE,
  DELETESALEDISCOUNT,
  CATGORYLIST,
  DELETEDIAMONDCHARGE,
  VENDORLISTS,
  TaxList,
  PRODUCTTYPEMASTER,
  MATERIALMASTER,
  MASTERCOLORS,
  MASTERPURITIES,
  SALEDISCOUNTS,
  VOUCHERDISCOUNTS,
  DELETEVOUCHERDISCOUNT,
  VOUCHERSTATUSEDIT,
  DISCOUNTSTATUSEDIT,
  MASTERMATERIAL,
  MASTERMATERIALCOLORS,
  MASTERPRODUCTPURITIES,
  COLLECTIONMASTER,
  DESIGNMASTER,
  DIAMONDMASTER,
  DIAMONDSETTINGS,
  DIAMONDSHAPES,
  MASTERPRODUCTTYPES,
  MASTERGEMSETTINGS,
  MASTERGEMSHAPES,
  MASTERGEMTYPES,
  MASTERGENDER,
  SEOPRIORITIES,
  CREATETAXSETUP,
  TaxSettingList,
  MASTERCATEGORIES,
  EARRINGBACKING,
  MASTERATTRIBUTES,
  MASTERSTONESHAPES,
  MASTERSTONECOLORS,
  MASTERSTONES,
  MASTERWEIGHTS,
  THEMEMASTER,
  STYLEMASTER,
  OCCASSIONSMASTER,
  PAYMENTSTATUSMASTER,
  SHIPPINGZONES,
  MASTERCOUNTRIES,
  SHIPPINGCHARGES,
  ACTIVESHIPPINGZONES,
  MASTERPAGES,
  GOLDPRICESETUPMASTER,
  ALLMASTERRINGSIZE,
  ALLSTYLORILANDINGBANNERS,
  CREATESTYLORILANDINGBANNER,
  DELETESTYLORILANDINGBANNER,
  ALLSTYLORISILVERLANDINGBANNERS,
  CREATESILVERLANDINGBANNER,
  DELETESILVERLANDINGBANNER,
  PRODUCTDESCRIPTIONEDIT,
  ALLMARKUPPRICE,
  ALLSTYLORISILVERLISTINGPAGE,
  CREATESILVERLISTINGPAGE,
  ALLSTYLORISILVERROUTINGPAGE,
  CREATESTYLORISILVERROUTINGPAGE,
  HOLIDAYLIST,
  WAREHOUSELIST,
  INVENTORYLIST,
  VALIDATEGENERATEDSKU,
  STOCKSTATUS,
  ABANDONEDCART,
  CARTBYID,
  ALLSPECIFICLISTINGPAGE,
  CREATESPECIFICLISTINGPAGE,
  ALLSTYLORISILVERLISTINGBOTTOMBANNERS,
  CREATESILVERLISTINGBOTTOMBANNER,
  DELETESILVERLISTINGBOTTOMBANNER,
  IMAGEDELETE,
  GETALLERRORLOGS,
  GETORDERCOMMUNICATIONLOGS,
  PRICE_RUN_LOGS,
  GEMSTONE_MARKUP_SETTING,
  CREATE_GEMSTONE_MARKUP,
  DELETE_MATERIAL_MARKUP,
  UPDATE_MATERIAL_MARKUP,
  ALLPAGESCMS,
  CMSBYPAGES,
  CMS_UPDATE,
  UPDATE_STATUS_CMS,
  CREATE_CMS,
  UPDATE_URL,
  LIST_COMBO_PRODUCTS,
  FETCH_COMBO_OFFERED_PRODUCTS,
  UPDATE_COMBO_BY_MAIN_PRODUCT
};
