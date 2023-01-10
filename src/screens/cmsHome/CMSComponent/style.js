import { makeStyles } from "@material-ui/core/styles";

export const consolePagesStyles = makeStyles((theme) => ({
  dialogPaperMid: {
    width: "300px",
  },
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerName: {
    fontSize: "18px",
    fontWeight: "600",
    padding: "10px 0",
  },
  addBtn: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    marginLeft: "13px",
  },
  containerDiv: {
    background: "#dfd8d8",
    padding: "10px",
    borderRadius: "6px",
    margin: "10px 0",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carouselParentImg: {
    background: "#dfd8d8",
    padding: "10px",
    borderRadius: "6px",
  },
  addContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  collectionName: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "20px",
    margin: "10px",
  },
  carouselImageName: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "17px",
    margin: "10px",
  },
  carouselImage: {
    width: "40%",
    display: "flex",
    margin: "10px auto",
  },
  carouselPrice: {
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  carouselUrl: {
    color: "blue",
    fontSize: "15px",
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  carouselItems: {
    background: "#d4d4e7",
    borderRadius: "6px",
    margin: "12px 0",
  },
  carouselItemsTwo: {
    background: "#b8d2df",
    borderRadius: "6px",
    margin: "12px 0",
  },
  editCarouselImage: {
    margin: "7px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  careerColor: {
    color: "#ED1165",
    fontSize: "20px",
    fontWeight: "600",
    margin: "10px 0",
  },
  careerdescr: {
    color: "#666",
    fontSize: "14px",
    lineHeight: "22px",
    margin: "10px 0",
  },
  positionHead: {
    color: "#ED1165",
    fontSize: "20px",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    margin: "10px 0",
  },
  role: {
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    margin: "10px 0",
  },
  jobHead: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#394578",
    margin: "10px 0",
  },
  keyRoleDiv: {
    background: "#b8d2df",
    borderRadius: "6px",
    margin: "5px 0",
    padding: "12px 12px",
  },
  requirementsDiv: {
    background: "#ccc",
    borderRadius: "6px",
    margin: "5px 0",
    padding: "12px 12px",
  },
  addpoints: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBottom: {
    marginTop: "15px",
    "& p": {
      fontSize: "12px",
      fontWeight: 500,
    },
  },
}));
