import React from 'react';
import { Grid, Typography, TextField, FormGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import './style.css'


const IOSSwitch = withStyles(theme => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});





export default function Editcategory(props) {

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
    });


    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };




    return (
        <div>
            <Grid>
                <Typography variant="h2" style={{ marginTop: "25px", marginBottom: "50px", fontWeight: "400", fontSize: "22px" }}>Edit Category Items</Typography>
            </Grid>
            <Grid container style={{ width: "80%", margin: "auto" }} >
                <Grid container lg={12} md={12} spaceing={2} justify="center" id="margin" style={{ marginBottom: "75px" }}>
                    <Grid lg={4} md={4} sm={6} xs={12}>
                        <TextField id="outlined-basic" label="Name" margin="dense" variant="outlined" color="primary" />
                    </Grid>
                    <Grid lg={4} md={4} sm={6} xs={12}>
                        <TextField id="outlined-basic" label="URL" margin="dense" variant="outlined" color="primary" />
                    </Grid>
                    <Grid lg={4} md={4} sm={12} xs={12}>
                        <   TextField id="outlined-basic" label="SEO Text" margin="dense" variant="outlined" color="primary" />
                    </Grid>
                </Grid>
                <Grid container className="switch" lg={12} md={12} justify="center">
                    <Grid style={{margin:"10px auto"}} lg={4} md={4} sm={6} xs={12}>
                        <Typography className="filter-head" variant="h4"  style={{ fontWeight: "400", fontSize: "19px" }}>For Filters</Typography>
                        <div className="z">
                            <h4 style={{display:'inline-block',marginRight:"10px"}}>N</h4>
                            <FormControlLabel
                                
                                control={
                                    <IOSSwitch
                                        checked={state.checkedA}
                                        onChange={ handleChange('checkedA')}
                                        value="checkedA"
                                        
                                    />
                                }
                                label="Y"
                            />
                         </div>  

                        
                    </Grid>
                    <Grid  style={{margin:"7px auto"}} lg={4} md={4} sm={6} xs={12}>
                        <Typography className="filter-head" variant="h4"  style={{ fontWeight: "400", fontSize: "19px" }}>For Search</Typography>
                        <div className="z">
                        <h4 style={{display:'inline-block',marginRight:"10px"}}>N</h4>
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={state.checkedB}
                                        onChange={ handleChange('checkedB')}
                                        value="checkedB"
                                    />
                                }
                                label="Y"
                            />
                        </div>
                    </Grid>
                    <Grid style={{margin:"10px auto"}} lg={4} md={4} sm={12} xs={12}>
                        <Typography variant="h4" className="filter-head"  style={{ fontWeight: "400", fontSize: "19px" }}>For Price</Typography>
                        <div className="z">
                        <h4 style={{display:'inline-block',marginRight:"10px"}}>N</h4>
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={state.checkedC}
                                        onChange={ handleChange('checkedC')}
                                        value="checkedC"
                                    />
                                }
                                label="Y"
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid style={{ display: "flex", justifyContent: "flex-end", width: "80%", margin: "auto", marginTop: "50px" }}>
                        <Button className="product" variant="contained" size="medium" color="primary" backgroundColor="secondary" style={{ margin: "auto 10px" }}>
                            Cancel
                            </Button>
                        <Button className="product" variant="contained" size="medium" color="primary" backgroundColor="secondary" style={{ margin: "auto 10px" }}>
                            Save
                            </Button>
                    </Grid>
                    <Grid>

                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}