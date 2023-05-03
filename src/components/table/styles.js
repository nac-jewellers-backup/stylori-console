import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    dialogPaper: {
        minWidth: "1200px",
    },
    dialogPaperMid: {
        minWidth: "800px",
    },
    dialogHeader: {
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    imagecontainer: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: "auto",
        backgroundColor: "#fff",
        marginBottom: "60px"
    },
    link: {
        display: "flex",
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    link_style: {
        color: "#000",
    },
}));
