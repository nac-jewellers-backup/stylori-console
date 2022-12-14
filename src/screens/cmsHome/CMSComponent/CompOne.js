import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TableComp from "../../../components/table/tableComp";

const useStyles = makeStyles(() => ({
    root: {},
    contantview: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}));

const header = [
    "S.No",
    "Category Heading",
    "Category List",
    "Action"

];
const tableData = [
    { type: "INCREMENT", name: "" },
    { type: "TEXT", name: "categoryHeading" },
    { type: "ARRAYTEXT", name: "categoryList" },
    { type: "ACTION", name: "" },
];
export const CompOne = withRouter((props) => {
    return (
        <>
            <TableComp
                name={"Career Card Component"}
                noAddNew={true}
                header={header}
                tableData={tableData}
                data={[
                    {
                        "categoryHeading": "Earrings",
                        "categoryList": [
                            {
                                "name": "Earrings",
                                "url": "/home"
                            },
                            {
                                "name": "Hoops Earrings",
                                "url": "/siteMap"
                            },
                            {
                                "name": "Sui Dhaga Earrings",
                                "url": ""
                            },
                            {
                                "name": "Chandbali Earrings",
                                "url": ""
                            },
                            {
                                "name": "Pearl Earrings",
                                "url": ""
                            },
                            {
                                "name": "Platinum Earrings",
                                "url": ""
                            },
                            {
                                "name": "Solitaire Earrings",
                                "url": ""
                            },
                            {
                                "name": "Earcuff Earrings",
                                "url": ""
                            },
                            {
                                "name": "Studs",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Gold Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Diamond Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings For Men",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings For Girls",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings Designs For Daily Use",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings For Girls",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings For Men",
                                "url": ""
                            }
                        ]
                    },
                    {
                        "categoryHeading": "Rings",
                        "categoryList": [
                            {
                                "name": "Rings",
                                "url": ""
                            },
                            {
                                "name": "Couple Rings",
                                "url": ""
                            },
                            {
                                "name": "Mens Rings",
                                "url": ""
                            },
                            {
                                "name": "Platinum Rings",
                                "url": ""
                            },
                            {
                                "name": "Ring Finger",
                                "url": ""
                            },
                            {
                                "name": "Solitaire Rings",
                                "url": ""
                            },
                            {
                                "name": "Wedding Rings",
                                "url": ""
                            },
                            {
                                "name": "Cocktail Rings",
                                "url": ""
                            },
                            {
                                "name": "Ruby Ring",
                                "url": ""
                            },
                            {
                                "name": "Pearl Ring",
                                "url": ""
                            },
                            {
                                "name": "Navaratna Ring",
                                "url": ""
                            },
                            {
                                "name": "Fancy Ring",
                                "url": ""
                            },
                            {
                                "name": "Sapphire Rings",
                                "url": ""
                            },
                            {
                                "name": "Adjustable Rings",
                                "url": ""
                            },
                            {
                                "name": "Halo Ring",
                                "url": ""
                            },
                            {
                                "name": "Midi Rings",
                                "url": ""
                            },
                            {
                                "name": "Diamond Rings",
                                "url": ""
                            },
                            {
                                "name": "Mens Diamond Rings",
                                "url": ""
                            }
                        ]
                    },
                    {
                        "categoryHeading": "Mangalsutra",
                        "categoryList": [
                            {
                                "name": "Earrings",
                                "url": ""
                            },
                            {
                                "name": "Hoops Earrings",
                                "url": ""
                            },
                            {
                                "name": "Sui Dhaga Earrings",
                                "url": ""
                            },
                            {
                                "name": "Chandbali Earrings",
                                "url": ""
                            },
                            {
                                "name": "Pearl Earrings",
                                "url": ""
                            },
                            {
                                "name": "Platinum Earrings",
                                "url": ""
                            },
                            {
                                "name": "Solitaire Earrings",
                                "url": ""
                            },
                            {
                                "name": "Earcuff Earrings",
                                "url": ""
                            },
                            {
                                "name": "Studs",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Gold Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Diamond Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings For Men",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings For Girls",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings Designs For Daily Use",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings For Girls",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings For Men",
                                "url": ""
                            }
                        ]
                    },
                    {
                        "categoryHeading": "Other Jewellery",
                        "categoryList": [
                            {
                                "name": "Rings",
                                "url": ""
                            },
                            {
                                "name": "Couple Rings",
                                "url": ""
                            },
                            {
                                "name": "Mens Rings",
                                "url": ""
                            },
                            {
                                "name": "Platinum Rings",
                                "url": ""
                            },
                            {
                                "name": "Ring Finger",
                                "url": ""
                            },
                            {
                                "name": "Solitaire Rings",
                                "url": ""
                            },
                            {
                                "name": "Wedding Rings",
                                "url": ""
                            },
                            {
                                "name": "Cocktail Rings",
                                "url": ""
                            },
                            {
                                "name": "Ruby Ring",
                                "url": ""
                            },
                            {
                                "name": "Pearl Ring",
                                "url": ""
                            },
                            {
                                "name": "Navaratna Ring",
                                "url": ""
                            },
                            {
                                "name": "Fancy Ring",
                                "url": ""
                            },
                            {
                                "name": "Sapphire Rings",
                                "url": ""
                            },
                            {
                                "name": "Adjustable Rings",
                                "url": ""
                            },
                            {
                                "name": "Halo Ring",
                                "url": ""
                            },
                            {
                                "name": "Midi Rings",
                                "url": ""
                            },
                            {
                                "name": "Diamond Rings",
                                "url": ""
                            },
                            {
                                "name": "Mens Diamond Rings",
                                "url": ""
                            }
                        ]
                    },
                    {
                        "categoryHeading": "Mangalsutra",
                        "categoryList": [
                            {
                                "name": "Earrings",
                                "url": ""
                            },
                            {
                                "name": "Hoops Earrings",
                                "url": ""
                            },
                            {
                                "name": "Sui Dhaga Earrings",
                                "url": ""
                            },
                            {
                                "name": "Chandbali Earrings",
                                "url": ""
                            },
                            {
                                "name": "Pearl Earrings",
                                "url": ""
                            },
                            {
                                "name": "Platinum Earrings",
                                "url": ""
                            },
                            {
                                "name": "Solitaire Earrings",
                                "url": ""
                            },
                            {
                                "name": "Earcuff Earrings",
                                "url": ""
                            },
                            {
                                "name": "Studs",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Gold Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Diamond Stud Earrings",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings For Men",
                                "url": ""
                            },
                            {
                                "name": "Stud Earrings For Girls",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings Designs For Daily Use",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings For Girls",
                                "url": ""
                            },
                            {
                                "name": "Gold Earrings For Men",
                                "url": ""
                            }
                        ]
                    }
                ]}
            />
        </>
    );
});

export default CompOne;