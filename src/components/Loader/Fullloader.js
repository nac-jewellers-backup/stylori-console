import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
function FullLoader(props) {
    const classes = useStyles();

    return (
        <div style={{ position :"absolute",backgroundColor : "#ddd",zIndex : "999", height: '100vh', width: '100%', display: "flex",left : '0' ,top : '0', overflow: "hidden" }}>
            { <h1 style={{margin: "auto"}}>Loading.......</h1> }
            {/* <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{height: "40px"}}></i> */}
            {/* <div className={classes.root}>
                    <LinearProgress />
                    </div> */}


            <i class="fa fa-cog fa-spin fa-3x fa-fw" style={{height: "auto", fontSize: "66px", margin: "auto", color: "#00695C"}} aria-hidden="true"></i>
        </div>
    )
}
export default FullLoader;