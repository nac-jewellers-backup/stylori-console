import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

export const CmsCard = withRouter((props) => {
    return (
        <Grid item xs={6} sm={4} lg={3}>
            <Link
                underline="none"
                component={RouterLink}
                to={props?.to}
            >
                <Card fullwidth className="card2">
                    <CardContent>
                        <Typography
                            style={{ textAlign: "center", marginTop: 8 }}
                            component="h6"
                            variant="h5">
                            {props?.text}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
})