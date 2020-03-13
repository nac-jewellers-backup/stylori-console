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
    productImagesByProductId {
      nodes {
        id
        imagePosition
        imageUrl
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
    PRODUCTFILTERMASTER
  }