import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Tooltip
} from "@material-ui/core";
import React from "react";
import { useQuery } from "react-apollo";
import {
  FETCH_COMBO_OFFERED_PRODUCTS,
  LIST_COMBO_PRODUCTS,
} from "../../graphql/query";
import { API_URL, BASE_IMAGE_URL } from "../../config";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import socketIOClient from "socket.io-client";
import { AlertContext } from "../../context";
import axios from "axios";
import CircularProgressWithLabel from "../../components/CircularProgress";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  comboCard: {
    "& > *": {
      padding: theme.spacing(2),
    },
  },
  searchInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
    },
  },
  input: {
    display: "none",
  },
  image: {
    height: 230,
    width: 165,
  },
  productName: {
    fontSize: "1em",
  },
}));

const InduvidualProductCard = (props) => {
  const classes = useStyles();
  let source = props?.productListByMainProduct ?? props;
  let productId = props?.mainProduct ?? source?.productId;
  return (
    <Card className={classes.image}>
      <CardMedia
        component="img"
        alt={productId}
        image={`${BASE_IMAGE_URL}${source?.productImagesByProductId?.nodes?.[0]?.imageUrl
          ?.replace(productId, `${productId}/100X100`)
          ?.replace("jpg", "webp")}`}
      />
      <CardContent>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          component="p"
          className={classes.productName}
        >
          {source?.productName}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ComboCard = (props) => {
  let { offeredProducts } = props;
  const { loading, data, error, refetch, networkStatus } = useQuery(
    FETCH_COMBO_OFFERED_PRODUCTS,
    { variables: { offeredProducts } }
  );
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <InduvidualProductCard {...props} />
      </Grid>
      <Grid>{"+"}</Grid>
      {!loading &&
        data &&
        data.allProductLists.nodes.map((product, index) => (
          <>
            <Grid key={product.id} item>
              <InduvidualProductCard {...product} />
            </Grid>
            {index + 1 < data.allProductLists.nodes.length && (
              <Grid>{"+"}</Grid>
            )}
          </>
        ))}
    </Grid>
  );
};

export const ComboOfferConfig = (props) => {
  const classes = useStyles();
  const snack = React.useContext(AlertContext);

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const socket = socketIOClient(API_URL);
    socket.on("combo_sync", (data) => {
      if (data.status !== "completed") {
        setProgress(data?.completed * 100);
      } else {
        setProgress(100);
        snack.setSnack({
          severity: "info",
          msg: `Process Completed`,
        });
        socket.close();
      }
    });
  }, []);
  const { loading, data, error, refetch, networkStatus } =
    useQuery(LIST_COMBO_PRODUCTS);
  const handleUpload = (file) => {
    var bodyFormData = new FormData();
    bodyFormData.set("file", file);
    axios
      .post(API_URL + "/bulk_upload_combo", bodyFormData)
      .then((res) => {
        if (res) {
          setProgress(1);
          snack.setSnack({
            open: true,
            msg: res?.data?.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        snack.setSnack({
          open: true,
          severity: "error",
          msg: "Some error occured!",
        });
      });
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={8}>
        <TextField
          className={classes.searchInput}
          fullWidth
          variant="outlined"
          placeholder="Search by Product ID or Product Name"
          label="Search"
        />
      </Grid>
      <Grid>
        <IconButton
          style={{ color: "#000" }}
          onClick={() => {
            var a = document.createElement("a");
            a.href = `${process.env.PUBLIC_URL}/sample/sample_combo.csv`;
            a.setAttribute("download", "sample_combo.csv");
            a.click();
          }}
        >
          <Tooltip title="Download sample file">
            <GetAppIcon />
          </Tooltip>
        </IconButton>
      </Grid>
      {progress == 0 && (
        <Grid item xs={2}>
          <input
            accept=".csv"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={(event) => {
              const files = event.target.files;
              if (files) {
                handleUpload(files[0]);
              }
            }}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Upload Combo Offers
            </Button>
          </label>
        </Grid>
      )}
      {progress > 0 && (
        <Grid item xs={2}>
          <CircularProgressWithLabel value={progress} />
        </Grid>
      )}
      {!loading &&
        data &&
        data.allProductComboOffers.nodes.map((products) => (
          <Grid
            key={products.id}
            component={Paper}
            className={classes.comboCard}
          >
            <ComboCard {...products} />
          </Grid>
        ))}
    </Grid>
  );
};
