import { PRODUCTCATEGORY } from "../graphql/query";
import { MATERIALMASTER } from "../services/queries";
import apidata from '../screens/Productupload/data.json';

export const productCategory = {
    query: PRODUCTCATEGORY,
    mapper: (response) => {
        const category = response.allMasterProductCategories.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const product_type = response.allMasterProductTypes.nodes.map(_ => ({
            ..._,
            value: _.shortCode,
            label: _.name,
            title: _.name
        }))
        const material = response.allMasterMaterials.nodes.map(_ => ({
            ..._,
            value: _.id,
            label:_.name
        }))
        const gender = response.allMasterGenders.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const vendorcode  = response.allMasterVendors.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        
        const diamondsettings = response.allMasterDiamondsSettings.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const diamondshapes = response.allMasterDiamondsShapes.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const themes = response.allMasterThemes.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const styles = response.allMasterStyles.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        
        const occasions = response.allMasterOccasions.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const collections = response.allMasterCollections.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const gemstonecolor = response.allMasterStonesColors.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const stones = response.allMasterStones.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const metalcolour = response.allMasterMetalsColors.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const metalpurity = response.allMasterMetalsPurities.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const diamondcolors = response.allMasterDiamondsColors.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))

        const diamondclarities = response.allMasterDiamondClarities.nodes.map(_ => ({
            ..._,
            value: _.id,
            label: _.name
        }))
        const productseries = response.allProductLists.nodes.map(_ => ({
            ..._,
            value: _.productSeries,
        }))
        const gemstontypes = response.allMasterGemstonesTypes.nodes.map(_ => ({
            ..._,
            value: _.shortCode,
            label:_.name
        }))
        
        const gemstonshapes = response.allMasterGemstonesShapes.nodes.map(_ => ({
            ..._,
            value: _.alias,
            label:_.name
        }))
        const gemstonesettings = response.allMasterGemstonesSettings.nodes.map(_ => ({
            ..._,
            value: _.alias,
            label:_.name
        }))
        const earringbacking = response.allMasterEarringBackings.nodes.map(_ => ({
            ..._,
            value: _.alias,
            label:_.name
        }))

        const diamondtypes = response.allMasterDiamondTypes.nodes.map(_ => ({
            ..._,
            value: _.diamondColor+_.diamondClarity,
            label:_.diamondColor+_.diamondClarity
        }))

        
        
        const metals = apidata.metals
        
        return { category,
             product_type, 
             material, 
             gender,
             vendorcode, 
             metalcolour, 
             metals, 
             diamondsettings,
             diamondshapes,
            themes,
            styles,
            occasions,
            collections,
            gemstonecolor,
            stones,
            metalpurity,
            diamondcolors,
            diamondtypes,
            diamondclarities,
            productseries,
            gemstontypes,
            gemstonshapes,
            gemstonesettings,
            earringbacking
        }
    }
}


export const materialMaster = {
    query: MATERIALMASTER,
    mapper: (response) => {
        const materials = response.allMasterMaterials.nodes.map(_ => ({
            ..._
                }))
        const vendors = response.allMasterVendors.nodes.map(_ => ({
                    ..._
        }))

        const product_categories = response.allMasterProductCategories.nodes.map(_ => ({
            ..._
        }))
        const product_types = response.allMasterProductTypes.nodes.map(_ => ({
            ..._
        }))
        
        return {
            vendors,
            product_categories,
            product_types,
            materials
        }
    }


}