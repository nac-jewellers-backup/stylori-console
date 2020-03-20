import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { VoucherContext } from '../../context';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import uuid from 'uuid/v1';
import Page from '../../components/Page'
import { Header, Results,AboutVoucher ,VoucherComponent} from './components';
import { Button, Grid,Typography } from '@material-ui/core';
import { NetworkContext } from '../../context/NetworkContext';

const useStyles = makeStyles(theme => ({
  root: {
  //  padding: theme.spacing(3)
  },
  aboutvoucher: {
    marginTop: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  productcontent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    marginTop: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
  
export default function Salediscountcontent() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [skus, setSkus] = useState([]);

  const [attributeobj, setAttributeobj] = useState({});
  const {sendNetworkRequest} = React.useContext(NetworkContext)

  const { voucherCtx, setVoucherCtx ,materialMaster} = React.useContext(VoucherContext);
  async function creatediscount()
  {
    console.log(">>>>>><<<<<<<<<<>>>>><<<<<")

    let bodydata = {
      discountvalue: parseFloat(attributeobj.discountvalue),
      discounttype : attributeobj.discounttype,
      componenets : attributeobj.componenets,
      skus : skus
    }
    console.log(JSON.stringify(attributeobj ))
    let response = await sendNetworkRequest('/creatediscount', {}, bodydata, false)

}
const handleDelete = chipToDelete => () => {
 // setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
};

async function filterapllied()
  {
    var  bodydata = {}
  
    let product_ids = []
    console.log("MMMMMMM")
    console.log(JSON.stringify(attributeobj))
    let response = await sendNetworkRequest('/getaliasproduct', {}, attributeobj, false)
    //alert(JSON.stringify(response.skus))
     setProducts(response.products)
   setSkus(response.skus)
    
  }
  function attributeadded(type, value)
  {
    setAttributeobj({
      ...attributeobj,
      [type]:value
    })
    filterapllied()
    

  }
  useEffect(() => {
    let mounted = true;
    const fetchOrders = () => {

      
    };
    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <Page
    className={classes.root}
    title="Orders Management List"
  >
    <VoucherComponent onAdded={attributeadded} className={classes.aboutvoucher} />

    <AboutVoucher className={classes.aboutvoucher} onAdded={attributeadded} categories={['Fixed Amount','percentage']} />
    
    <Paper className={classes.productcontent}>
    <Typography variant="h5" component="h2">
        {products.length} Products and {skus.length} skus
      </Typography>

      {products.map(data => {
        let icon;

        // if (data.label === 'React') {
        //   icon = <TagFacesIcon />;
        // }

        return (
          <Chip
            key={data}
            icon={icon}
            label={data}
             onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
    {/* <ProductsListing className={classes.aboutvoucher}  products={[]} /> */}

    <Grid container xs={12} spacing={2} style={{textAlign:"center"}} >
    <Grid item xs={12} style={{marginTop:16, textAlign:"center"}} >

      <Button onClick={() => creatediscount()} color="primary" variant="contained">Submit</Button>
    </Grid>
    </Grid>
  </Page>
  </MuiPickersUtilsProvider>
  );
}