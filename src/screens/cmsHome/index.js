import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { CmsCard } from "../../components/cmsCard";

const useStyles = makeStyles(() => ({
    root: {},
    contantview: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}));
export const CmsHome = withRouter((props) => {
    return (
        <Grid container spacing={3}>
            <Grid container item xs={12} sm={12} spacing={2}>
                <CmsCard to={"compenentOne"} text={'Component 1'} />
            </Grid>
        </Grid>
    );
});

export default CmsHome;
