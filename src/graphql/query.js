import gql from 'graphql-tag';

const PRODUCTCATEGORY = gql`query {
    allMasterProductCategories{
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
  },
  allMasterGenders {
    nodes {
      alias
      id
      name
    }
  },
  allMasterDiamondTypes {
    nodes {
      diamondClarity
      diamondColor
      id
    }
  }
  allMasterMetalsColors {
    nodes {
      alias
      id
      name
      shortCode
    }
  },
  allMasterDiamondsSettings {
    nodes {
      alias
      id
      name
    }
  },
  allMasterDiamondsShapes {
    nodes {
      name
      id
      alias
    }
  },
  allMasterThemes {
    nodes {
      alias
      id
      name
    }
  },

  allMasterStyles {
    nodes {
      alias
      id
      name
    }
  },
  allMasterOccasions {
    nodes {
      alias
      id
      name
    }
  },
  allMasterCollections {
    nodes {
      id
      alias
      name
    }
  },
  allMasterStonesColors {
    nodes {
      alias
      id
      name
    }
  },
  allMasterStones {
    nodes {
      alias
      id
      name
    }
  },
  allMasterMetalsColors {
    nodes {
      alias
      id
      name
      shortCode
    }
  },
  allMasterMetalsPurities {
    nodes {
      alias
      id
      name
      shortCode
    }
  },
  allMasterDiamondsColors {
    nodes {
      alias
      id
      name
      shortCode
    }
  },
  allMasterDiamondClarities {
    nodes {
      alias
      id
      name
    }
  },
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
  },
  allMasterGemstonesTypes {
    nodes {
      alias
      colorCode
      id
      name
      shortCode
    }
  },
  allMasterGemstonesShapes {
    nodes {
      alias
      id
      name
    }
  },
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
  }`
const PRODUCTFILTERMASTER = gql`
query  {
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
query  {
  allProductLists(first: 500)  {
    nodes {
      id
      nodeId
      productName
      productCategory
      productType
      productId
      createdAt
      isactive
      transSkuListsByProductId(condition: {isdefault: true}) {
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
query($Veiw: Int!, $Offset: Int!) {
  allProductLists(first: $Veiw, offset: $Offset) {
    nodes {
      id
      nodeId
      productName,
      productCategory,
      productType
      productId,
      createdAt
      isactive,
      transSkuListsByProductId(condition: {isdefault: true}) {
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
query  {
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

const TaxList = gql`
query  {
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
`;




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
    allGoldPriceSettings(condition: {vendorCode: $vendorCode}) {
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
}`;

const DIAMONDMARKUP = gql`
query MyQuery($vendorCode: String!) {
  allPricingMarkups(condition: {material: $vendorCode}) {
    nodes {
      updatedAt
      sellingPriceMin
      sellingPriceMax
      material
      category
      productType
      markupValue
      markupType
      id
      createdAt
    }
    totalCount
  }
}`;

const DIAMONDPRICELIST = gql`
query MyQuery($vendorCode: String!) {
  allDiamondPriceSettings(condition: {vendorCode: $vendorCode}) {
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
}`;
// const CATGORYLIST = gql`
// query {
//   allMasterMaterials {
//     nodes {
//       name
//       shortCode
//     }
// }`;


const CATGORYLIST =gql`
query  {
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
const PRODUCTTYPEMASTER =gql`
query  {
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

const MATERIALMASTER =gql`
query  {
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


const MASTERCOLORS =gql`
query  {
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


const SALEDISCOUNTS =gql`
query  {
  allSaleDiscounts {
    nodes {
      id
      discountName
      discountType
      discountValue
      components
      attributes
      productAttributes
      productAttributesText
    }

    totalCount
  }
}
`;


const VOUCHERDISCOUNTS =gql`
query  {
  allVouchers {
    nodes {
      id
      name
      code
      description
      
    }

    totalCount
  }
}
`;




const MASTERPURITIES =gql`
query  {
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
const VENDORLIST =`
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

const METALMASTER =`
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


const MASTERCATEGORY =`
query {
  allMasterProductCategories {
    nodes {
      name
      shortCode
    }
  },
  allMasterProductTypes {
    nodes {
      name
      shortCode
    }
  }
}`;


const GEMSTONEMASTER =`
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
query MyQuery($vendorCode: String!,$ratetype: Int!) {
  allMakingChargeSettings(condition: {vendorCode: $vendorCode,rateType: $ratetype}) {
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
}`;
const GEMPRICELIST = gql`
query MyQuery($vendorCode: String!) {
  allGemstonePriceSettings(condition: {vendorCode: $vendorCode}) {
    nodes {
      price
      rateType
      priceType
      sellingPriceType
      vendorCode
      weightEnd
      weightStart
      updatedAt
      id
      createdAt
      gemstoneType
    }
    totalCount
  }
}`;
const PRODUCTLISTSTATUSEDIT = gql`
mutation MyMutation($productId:String!,$isActive:Boolean!) {
  __typename
  updateProductListByProductId(input: {productId: $productId, productListPatch: {isactive: $isActive}}) {
    clientMutationId
    productList {
      isactive
    }
  }
}
`;

const DELETEMARKUPPRICE = gql`
mutation MyMutation($elementId:UUID!) {
  __typename
  deletePricingMarkupById(input: {id: $elementId}) {
    clientMutationId
  }
}
`;

const DELETEGOLDPRICE = gql`
mutation MyMutation($elementId:UUID!) {
  __typename
  deleteGoldPriceSettingById(input: {id: $elementId}) {
    clientMutationId
  }
}
`;
const DELETESALEDISCOUNT = gql`
mutation MyMutation($elementId:UUID!) {
  __typename
  deleteSaleDiscountById(input: {id: $elementId}) {
    clientMutationId
  }
}
`;

const DELETEVOUCHERDISCOUNT = gql`
mutation MyMutation($elementId:UUID!) {
  __typename
  deleteVoucherById(input: {id: $elementId}) {
    clientMutationId
  }
}
`;

const DELETEMAKINGCHARGE = gql`
mutation MyMutation($elementId:UUID!) {
  __typename
  deleteMakingChargeSettingById(input: {id: $elementId}) {
    clientMutationId
  }
}
`;

const DELETEGEMCHARGE = gql`
mutation MyMutation($elementId:UUID!) {
  __typename
  deleteGemstonePriceSettingById(input: {id: $elementId}) {
    clientMutationId
  }
}
`;
const DELETEDIAMONDCHARGE = gql`
mutation MyMutation($elementId:UUID!) {
  __typename
  deleteDiamondPriceSettingById(input: {id: $elementId}) {
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
    productName
    productType
    vendorCode
    gender
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
    productThemesByProductId(condition: {isActive: true}) {
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
    productStylesByProductId(condition: {isActive: true}) {
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
    productOccassionsByProductId(condition: {isActive: true}) {
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
        generatedSku,
        costPrice
        costPriceTax
        discountPrice
        discountPriceTax
        markupPrice
        markupPriceTax
        sellingPrice
        sellingPriceTax
        isReadyToShip
        discount
        isActive
        isdefault,
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
      }
    }
    productCategory
    sizeVarient
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
    DELETEVOUCHERDISCOUNT
  }