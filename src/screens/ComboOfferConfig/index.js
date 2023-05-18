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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import React, { useState } from "react";
import { useQuery } from "react-apollo";
import {
  FETCH_COMBO_OFFERED_PRODUCTS,
  LIST_COMBO_PRODUCTS,
  UPDATE_COMBO_BY_MAIN_PRODUCT,
} from "../../graphql/query";
import { API_URL, BASE_IMAGE_URL } from "../../config";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import socketIOClient from "socket.io-client";
import { AlertContext } from "../../context";
import axios from "axios";
import CircularProgressWithLabel from "../../components/CircularProgress";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  comboCard: {
    padding: "10px",
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
  alignCardTypo: {
    paddingTop: "6px",
  },
  details: {
    color: "#3f51b5",
    fontWeight: 600,
  },
  alignItems:{
    display:'flex',
    alignItems:"center",
  }
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
  const classes = useStyles();
  let { offeredProducts } = props;
  if(offeredProducts.length < 2){
    offeredProducts = JSON.parse(offeredProducts);
  }
  const { loading, data, error, refetch, networkStatus } = useQuery(
    FETCH_COMBO_OFFERED_PRODUCTS,
    { variables: { offeredProducts } }
  );
  console.log("AllProductdata", data);
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography style={{fontWeight:600}}>Main Product</Typography>
        <InduvidualProductCard {...props} />
        <Typography className={classes.alignCardTypo}>
          Product Id :{" "}
          <span className={classes.details}>{props?.mainProduct}</span>
        </Typography>
      </Grid>
      <Grid>{"+"}</Grid>
      {!loading &&
        data &&
        data.allProductLists.nodes.map((product, index) => (
          <>
            <Grid key={product.id} item>
              <Typography>Combo Product{index + 1}</Typography>
              <InduvidualProductCard {...product} />
              <Typography className={classes.alignCardTypo}>
                Product Id :{" "}
                <span className={classes.details}>{product?.productId}</span>
              </Typography>
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
  const initialState = {
    combo1:"",
    combo2:"",
    discountType:"",
    discountValue:"",
    mainProduct:""
  }

  const classes = useStyles();
  const snack = React.useContext(AlertContext);
  const [openForm, setOpenForm] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [editState,setEditState] = useState(initialState);
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

  const handleComboForm = (product) => {
    const offeredProduct = (product?.offeredProducts)
    if(offeredProduct?.length < 2){
      offeredProduct = JSON.parse(product?.offeredProducts)
    }
    setEditState({
      ...editState,
      combo1:offeredProduct?.[0],
      combo2:offeredProduct?.[1],
      discountType:product?.discountType,
      discountValue:product?.discountValue,
      mainProduct:product?.mainProduct
    });
    setOpenForm(true)
  }

  const handleChange = (name,value) => {
    setEditState({
      ...editState,[name]:value
    })
  }

  const handleClose = () => {
    setEditState(initialState)
    setOpenForm(false)
  }

  const validate = () => {
    const validationField = ["combo1","combo2","discountType","discountValue","mainProduct"];
    let error = [];
    debugger;
    validationField.forEach((val) => {
      debugger;
      if(editState[val] !== null && editState[val] !== ""){
        error.push(true)
      }else{
        error.push(false)
      }
    })
    if(error.includes(false)){
      return false
    }else{
      return true
    }
  }

  const handleSubmit = () => {
    if(validate()){
      const offeredProducts = [editState?.combo1,editState?.combo2]
      fetch(`${API_URL}/graphql`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: UPDATE_COMBO_BY_MAIN_PRODUCT,
          variables: {
            offeredProducts: offeredProducts,
            discountValue: Number(editState.discountValue),
            discountType: editState.discountType,
            mainProduct: editState.mainProduct
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
        });
    }else{
      snack.setSnack({
        open: true,
        severity: "error",
        msg: `Please fill all the fields`,
      });
    }
  }

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
          <Grid key={products.id} component={Paper}>
            <div className={classes.comboCard}>
              <ComboCard {...products} />
            </div>
            <div className={classes.alignItems} style={{ padding: "0px 10px",justifyContent:"space-between" }}>
              <div>
                <Typography>
                  Discount Type :{" "}
                  <span className={classes.details}>
                    {products?.discountType}
                  </span>
                </Typography>
                <Typography>Discount Value : <span className={classes.details}>{products?.discountValue}</span></Typography>
              </div>
              <Button onClick={()=>handleComboForm(products)} variant="contained" color="primary">
                Edit
              </Button>
            </div>
          </Grid>
        ))
      }
      <Dialog
        open={openForm}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Combo Offer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.alignItems} style={{marginBottom:"18px"}}>
              <TextField
                required
                id="outlined-required"
                label="Main Product"
                size="small"
                defaultValue="Hello World"
                variant="outlined"
                disabled={true}  
                name="mainProduct"
                value={editState?.mainProduct}       
              >
              </TextField>
            </div>
            <Grid container spacing={2} style={{marginBottom:"18px"}}>
              <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Combo Product 1"
                    size="small"
                    defaultValue="Hello World"
                    variant="outlined"
                    name="combo1"
                    onChange={(e)=>handleChange("combo1",e.target.value)}
                    value={editState?.combo1}         
                  >
                  </TextField>
              </Grid>
              <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="Combo Product 2"
                    defaultValue="Hello World"
                    variant="outlined"
                    name="combo2"
                    onChange={(e)=>handleChange("combo2",e.target.value)}
                    value={editState?.combo2}         
                  >
                  </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginBottom:"18px"}}>
              <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={["FLAT","PERCENTAGE"]}
                getOptionLabel={(option) => option}
                // style={{ width: 300 }}
                value={editState?.discountType}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
                size="small"
                renderInput={(params) => <TextField size="small" {...params} label="Combo box" variant="outlined" />}
              />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    size="small"
                    label="Discount Value"
                    defaultValue="Hello World"
                    variant="outlined"
                    name="discountValue"
                    onChange={(e)=>handleChange("discountValue",e.target.value)}
                    value={editState?.discountValue}         
                  >
                  </TextField>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary" autoFocus>
            Sumbit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
