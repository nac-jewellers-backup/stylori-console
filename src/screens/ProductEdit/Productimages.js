import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { makeid } from "../../utils/commonmethod";
import { BASE_IMAGE_URL } from "../../config";
import { IMAGEDELETE } from "../../graphql/query";
import { Paper, Card, CardHeader, CardContent, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import DeleteIcon from "@material-ui/icons/Delete";
import { Typography, Button } from "@material-ui/core";

import { NetworkContext } from "../../context/NetworkContext";
import "./upload.css";
import { GRAPHQL_DEV_CLIENT } from "../../config";
const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 100,
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  fixedTag: {
    padding: 0,
    "& .MuiOutlinedInput-root": {
      padding: 0,
    },
  },
  root: {
    marginTop: theme.spacing(2),
  },
  table: {
    width: "100%",
    // marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
  },
  gempapper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: "100%",
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  styleFile: {
    paddingTop: "10px",
  },
  card: {
    minHeight: "150px",
    textAlign: "left",
    boxShadow:
      "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
  },
  formContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 30,
  },
}));

export default function Productimages(props) {
  const classes = useStyles2();
  let image_count = 0;
  let product_id = "";
  const [success, setSuccess] = React.useState(false);
  const [title, setTitle] = React.useState(props.color);
  const [productimages, setProductimages] = React.useState(props.prodimages);
  // const [totalimages, setTotalimages] = React.useState(1);
  const { sendNetworkRequest } = React.useContext(NetworkContext);

  productimages.forEach((imgobj) => {
    if (props.color === imgobj.productColor) {
      image_count = image_count + 1;
      if (imgobj.productId) {
        product_id = imgobj.productId;
      }
      // setTotalimages(image_count)
    }
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  async function uploadimagetoserver(fileobj, filetype, imagename, prodid, imagecontent, isedit, position) {
    console.log(fileobj, filetype, imagename, prodid, imagecontent, isedit);
    let responsedata = await sendNetworkRequest(
      "/uploadimage",
      {},
      { image: filetype, filename: imagename, product_id: prodid },
      false
    );
    var returnData = responsedata.data.returnData;
    var signedRequest = returnData.signedRequest;
    var url = returnData.url;
    var filepathname = returnData.filepath;
    filepathname = filepathname.replace("base_images", "product/" + prodid);
    var options = {
      headers: {
        "Content-Type": filetype,
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (isedit) {
      imagecontent["imageUrl"] = filepathname.replace("jpeg", "jpg");
    } else {
      const imageobj = {
        name: product_id + "_" + (image_count + 1) + props.color.charAt(0),
        imagePosition: image_count + 1,
        productColor: props.color,
        productId: product_id,
        imageUrl: filepathname.replace("jpeg", "jpg"),
        url:
          "https://s3.ap-south-1.amazonaws.com/styloribaseimages/" +
          filepathname,
      };
      imagecontent = imageobj;
    }
    if (!isedit) {
      var productimgs = [];
      productimages.forEach((img) => {
        productimgs.push(img);
      });
      productimgs.push(imagecontent);
    }

    await axios.put(signedRequest, fileobj, options);

    let responsecontent = await sendNetworkRequest("/updateproductimage", {}, { imageobj: imagecontent, isedit: isedit }, false);

    responsecontent.statuscode === 200 && setSuccess(true);
    setTimeout(function () {
      responsecontent.statuscode === 200 && window.location.reload();
    }, 2500);

    image_count = image_count + 1;
    if (!isedit) {
      // setProductimages(productimgs);
    }
  }
  const deleteImage = async (imageData) => {
    const url = GRAPHQL_DEV_CLIENT;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: IMAGEDELETE,
        variables: { productimageid: imageData.id },
      }),
    };

    await fetch(url, opts)
      .then((res) => res.json())
      .then((fatchvalue) => {
        fatchvalue.statuscode = 200 && window.location.reload();
      })
      .catch(console.error);
  };

  const handlenewAssetChange = (e) => {
    const files = e.target.files;
    Object.keys(files).map((file, index) => {
      // const size = files[index].size;
      var imagecount = 1;
      if (productimages) {
        imagecount = image_count + 1;
      }
      let imagename = product_id + "-" + imagecount + props.color.charAt(0);
      const fileParts = files[index].type.split("/");
      const fileType = fileParts[1];

      uploadimagetoserver(
        files[index],
        fileType,
        imagename,
        product_id,
        {},
        false
      );
    });
  };
  const handleAssetChange = (e, imageposition, category, endPoint) => {
    const files = e.target.files;
    Object.keys(files).map((file, index) => {
      const size = files[index].size;
      alert(imageposition);
      let productimageobj = {};
      productimages.forEach((content) => {
        if (
          content.productColor === props.color &&
          imageposition === content.imagePosition
        ) {
          productimageobj = content;
        }
      });
      var prodid = productimageobj.productId;
      var prodcolor = productimageobj.productColor;
      var imagecount = 1;
      let randomnum = makeid(1, "", 1);
      if (productimages) {
        //  imagecount = image_count + 1;
      }
      let imagename =
        prodid + "-" + imageposition + randomnum + prodcolor.charAt(0);
      const fileParts = files[index].type.split("/");
      const fileType = fileParts[1];
      //alert(imagename)
      uploadimagetoserver(
        files[index],
        fileType,
        imagename,
        prodid,
        productimageobj,
        true
      );
      // alert(imagename)
    });
  };

  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={
            props.color && props.isdefault
              ? props.color + " (Default Colour)"
              : props.color
          }
        />
        <CardContent>
          <Grid container spacing={2} className={classes.styleFile}>
            {productimages.map((url, index) => (
              <>
                {props.color === url.productColor ? (
                  <div style={{ position: "relative" }}>
                    <i
                      className="fa fa-window-edit"
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 11,
                        color: "red",
                        zIndex: "12",
                      }}
                    />

                    <Grid
                      item
                      style={{
                        width: "150px",
                        wordBreak: "break-all",
                        height: "150px",
                        padding: "8px",
                        margin: "0",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      className="container"
                    >
                      <input
                        type="file"
                        className="custom-file-input"
                        multiple
                        onChange={(e) =>
                          handleAssetChange(e, url.imagePosition, "", "")
                        }
                      ></input>

                      <img
                        src={BASE_IMAGE_URL + url.imageUrl.replace(url.productId, url.productId + "/1000X1000")}
                        alt="image"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "4px",
                        }}
                      />
                    </Grid>
                    <Button variant="outlined" style={{ margin: "auto", display: "flex" }} onClick={() => deleteImage(url)}>
                      <DeleteIcon style={{ color: "grey" }} />
                    </Button>
                    <br />
                    <Typography style={{ textAlign: "center" }} variant="h5">
                      {" "}
                      {index + 1}{" "}
                    </Typography>

                    <Typography style={{ textAlign: "center" }} variant="h6">
                      {" "}
                      {url.ishover ? "hover" : ""}{" "}
                    </Typography>
                  </div>
                ) : null}
              </>
            ))}
            <Grid
              item
              style={{
                width: "150px",
                wordBreak: "break-all",
                height: "150px",
                padding: "8px",
                margin: "0",
                cursor: "pointer",
                textAlign: "center",
                position: "relative",
              }}
              className="container"
            >
              {
                <label className="custom-file-upload" style={{ display: "flex" }}>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    style={{
                      color: "rgba(60,64,67,.15)",
                      fontSize: "45px",
                      margin: "auto",
                    }}
                  ></i>
                  <input
                    type="file"
                    className="custom-file-input"
                    multiple
                    onChange={(e) => handlenewAssetChange(e)}
                  ></input>
                </label>
              }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose}>Image Upload Successfully.. Redirecting to Product Edit Page</Alert>
      </Snackbar>
    </Paper>
  );
}
