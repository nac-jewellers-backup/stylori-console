import React from "react";
import { Grid, Card, CardContent, Typography,Button } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Card: {
    height:"300px",
    display:"flex",justifyContent:"center",alignItems:"center"
  },
});

export const ImageUpload = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} sm={12} spacing={2}>
        <Typography component="h5" variant="h5">
          Image upload
        </Typography>
      </Grid>

      <Grid item xs={6} sm={4} lg={6}>
        <Card fullwidth className={classes.Card}>
          <CardContent>
            <Button variant="outlined" startIcon={<CloudUploadIcon />}>
              Upload Image
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} lg={6}>
        <Card fullwidth className={classes.Card}>
          <CardContent>
            <Typography
              style={{ textAlign: "center", marginTop: 8 }}
              component="h6"
              variant="h5"
            >
              Stylori Silver
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
