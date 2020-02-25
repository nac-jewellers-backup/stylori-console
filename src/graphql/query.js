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
const PRODUCTLIST = gql`
query MyQuery($Veiw: Int!, $Offset: Int!) {
  allProductLists(first: $Veiw, offset: $Offset) {
    nodes {
      id
      nodeId
      productName
      productType
      productId
      isactive
    }
    totalCount
  }
}
`;
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
query MyQuery {
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
    productThemesByProductId {
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
    productStylesByProductId {
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
    productOccassionsByProductId {
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
        skuWeight
        generatedSku
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
    PRODUCTDIAMONDTYPES
  }