import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
    }
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        age: null,
        helperText: false
    });

    React.useEffect(() => {
        console.info('EVENT', values.age, Boolean((values.age != null && values.age !=="")));
    },[values.age])

    function handleChange(event) {
        setValues({ [event.target.name]: event.target.value, helperText: !Boolean((event.target.value != null && event.target.value !== "")) })
    }

    return (
        <form className={classes.root} autoComplete="off">
            <FormControl fullWidth required className={classes.formControl}>
                <InputLabel htmlFor="age-required">Age</InputLabel>
                <Select
                    value={values.age}
                    onChange={handleChange}
                    name="age"
                    inputProps={{ id: "age-required", "aria-required": true }}
                    MenuProps={{ "aria-required": true }}
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {props.selectData.map(data => (
                        <MenuItem value={data}>{data}</MenuItem>
                    ))}
                </Select>
                {values.helperText && <FormHelperText><b style={{ color: 'red' }}>Required</b></FormHelperText>}
            </FormControl>
        </form>
    );
}
SimpleSelect.propTypes = {
    handleChange:PropTypes.func,
    selectData:PropTypes.object.isRequired
}