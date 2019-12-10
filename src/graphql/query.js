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

  export {
    PRODUCTCATEGORY
  }