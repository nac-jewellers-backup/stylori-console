import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Component from './Component';
import { ProductProvider } from '../../context';
import { productCategory } from '../../services/mapper';
import { useQuery } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Productupload.css"

const useStyles = makeStyles(theme => ({
    progress: {
      margin: 'auto'
    },
  }));
  
export const Productupload = withRouter(props => {
    const classes = useStyles();

    const { data, loading, error } = useQuery(productCategory.query);

    if(loading) return <div className="loaderdiv"><CircularProgress className={classes.progress} />
    </div>
    if(error) return <div>error</div>
    return (
        <ProductProvider value={{ data, mapper: productCategory.mapper, mappertype:  "masterData" }} >
            <Component {...props} />
        </ProductProvider>
    )
});
export default Productupload;