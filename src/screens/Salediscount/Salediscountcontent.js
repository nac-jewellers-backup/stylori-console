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
import { Button, Grid } from '@material-ui/core';
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
  const [attributeobj, setAttributeobj] = useState({});
  const {sendNetworkRequest} = React.useContext(NetworkContext)

  const { voucherCtx, setVoucherCtx ,materialMaster} = React.useContext(VoucherContext);
  function creatediscount()
  {
    console.log(">>>>>><<<<<<<<<<>>>>><<<<<")
    console.log(JSON.stringify(attributeobj ))
}
const handleDelete = chipToDelete => () => {
 // setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
};

async function filterapllied()
  {
    var  bodydata = {}
  
    let product_ids = []
    
    let response = await sendNetworkRequest('/getaliasproduct', {}, attributeobj, false)
    response.products.forEach(element => {
      product_ids.push(element.product_id)
    });
     setProducts(product_ids)
    
  }
  function attributeadded(type, value)
  {
    //alert(JSON.stringify(value))
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