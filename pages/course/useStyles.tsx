import { createStyles, makeStyles, Theme } from "@material-ui/core";

const white = "#ffffff";

const useCourseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
      [theme.breakpoints.between("sm", "md")]: {
        paddingTop: theme.spacing(8),
      },
      [theme.breakpoints.up("lg")]: {
        paddingTop: theme.spacing(8),
      },
    },
    topHeaderSection: {
      backgroundColor: theme.palette.primary.main,
      paddingBlock: theme.spacing(3),
    },
    breadcrumbItem: {
      color: white,
      fontSize: theme.spacing(2.3),
    },
    courseTitle: {
      fontSize: theme.spacing(3.2),
      [theme.breakpoints.up("sm")]: {
        fontSize: theme.spacing(3.5),
      },
      fontWeight: "bold",
      lineHeight: 2,
    },
    courseDesc: {
      fontSize: theme.spacing(2.2),
    },
    fontBold: {
      fontWeight: "bold",
    },
    wylCont: {},
    sectionTitle: {
      fontSize: theme.spacing(2.8),
      fontWeight: "bold",
      lineHeight: 2,
    },
    sectionContent: {
      color: theme.palette.grey[700],
    },
    matCont: {
      padding: 18,
      textAlign: "center",
      "& p": {
        fontSize: theme.spacing(1.7),
        color: theme.palette.grey[700],
        marginBottom: 7,
      },
    },
    requirementCont: {},
    descriptionCont: {},
  })
);

export default useCourseStyles;
