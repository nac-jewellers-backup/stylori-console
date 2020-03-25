import { gql } from 'apollo-boost';

export const PRODUCTCATEGORY = gql`query {
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
  }
  }`

export const ORDERS = gql`query {
  allOrders {
    nodes {
      paymentMode
      paymentStatus
      updatedAt
      createdAt
      id
      shoppingCartByCartId {
        shoppingCartItemsByShoppingCartId {
          nodes {
            transSkuListByProductSku {
              generatedSku
              productListByProductId {
                productCategory
                productType
                productCollectionsByProductId {
                  nodes {
                    collectionName
                  }
                }
              }
            }
          }
        }
        giftwrapsByCartId {
          nodes {
            message
            giftFrom
            giftTo
          }
        }
        
        cartAddressesByCartId {
          nodes {
            firstname
            contactNumber
            addressline1
            addressline2
            city
            pincode
            state
          }
        }
        userProfileByUserprofileId {
          firstName
          mobile
          email
        }
      }
      paymentDetailsByOrderId {
        nodes {
          paymentResponse
        }
      }
    }
  }

}`

export const MATERIALMASTER = gql`query {
  allMasterVendors {
    nodes {
      name
      id
    }
  },
  allMasterPricingComponents(condition: {isActive: true}) {
    nodes {
      name
      id
    }
  }
  allMasterProductCategories {
    nodes {
      name
      id
    }
  },
  allMasterProductTypes {
    nodes {
      name
      id
    }
  },
  allMasterMetalsPurities {
    nodes {
      name
      id
    }
  },
   allMasterMaterials {
    nodes {
      alias
      id
      name
    }
  }
}`

export const VOUCHERMASTER = gql`query {
  allMasterVendors {
    nodes {
      name
      id
      
      
    }
  },
  allMasterPricingComponents(condition: {isActive: true}) {
    nodes {
      name
      id
    }
  }
  allMasterProductCategories {
    nodes {
      name
      id
      alias
    }
  },
  allMasterProductTypes {
    nodes {
      name
      id
      alias
    }
  },
  allMasterMetalsPurities {
    nodes {
      name
      id
      alias
    }
  },
   allMasterMaterials {
    nodes {
      alias
      id
      name
    }
  },
  allMasterCollections {
    nodes {
      name
      id
      alias
    }
  }
  allMasterMetalsPurities{
    nodes {
      name
      id
    }
  }

  allMasterMetalsPurities{
    nodes {
      name
      id
    }
  }

  allMasterStyles {
    nodes {
      name
      id
      alias
    }
  }

  allMasterThemes {
    nodes {
      name
      id
      alias
    }
  }
  allMasterDiamondTypes {
    nodes {
      shortCode
      diamondColor
      diamondClarity
      id
    }
  }
  allMasterOccasions {
    nodes {
      name
      alias
      id
    }
  }
}`