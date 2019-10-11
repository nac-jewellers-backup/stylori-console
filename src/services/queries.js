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



export const MATERIALMASTER = gql`query {
   allMasterMaterials {
    nodes {
      alias
      id
      name
    }
  }
}`