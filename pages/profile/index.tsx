import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ProfilePicture from "components/ProfilePicture";
import { NextPageContext } from "next";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme: Theme) =>
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
    titleBar: {
      backgroundColor: theme.palette.primary.main,
      paddingBlock: theme.spacing(2),
      marginBottom: theme.spacing(4),
      [theme.breakpoints.up("lg")]: {
        marginBottom: theme.spacing(10),
      },
    },
    titleBarText: {
      color: grey[50],
      fontSize: theme.spacing(2.6),
      fontWeight: 700,
    },
    detailTitle: {
      fontWeight: 700,
      fontSize: theme.spacing(2.5),
    },
    detailText: {
      fontSize: theme.spacing(2),
    },
    profilePictureCont: {
      marginBottom: theme.spacing(3),
      width: "30%",
    },
    detailsCont: {
      textAlign: "center",
      width: "65%",
    },
    detailsSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("lg")]: {
        flexDirection: "row",
        alignItems: "unset",
        width: "60%",
        marginInline: "auto",
      },
    },
  })
);

const Profile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box className={classes.titleBar}>
        <Container>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.titleBarText}>My profile</Typography>
            <Button variant="contained" color="default">
              <CreateIcon fontSize="small" />{" "}
              <Box component="span" ml={1}>
                Edit
              </Box>
            </Button>
          </Box>
        </Container>
      </Box>
      <Container>
        <div className={classes.detailsSection}>
          <div className={classes.profilePictureCont}>
            <ProfilePicture size={15} />
          </div>
          <div className={classes.detailsCont}>
            <Box mb={3}>
              <Typography className={classes.detailTitle}>Name</Typography>
              <Typography className={classes.detailText}>
                Damilola Seweje
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography className={classes.detailTitle}>Email</Typography>
              <Typography className={classes.detailText}>
                sewejed@gmail.com
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography className={classes.detailTitle}>
                Phone Number
              </Typography>
              <Typography className={classes.detailText}>
                o8o6 943 2293
              </Typography>
            </Box>
            <Box mb={3}>
              <Typography className={classes.detailTitle}>Title</Typography>
              <Typography className={classes.detailText}>Dr</Typography>
            </Box>
            <Box mb={3}>
              <Typography className={classes.detailTitle}>
                Courses created
              </Typography>
              <Typography className={classes.detailText}>
                placeat facere possimus placeat facere possimus
              </Typography>
              <Typography className={classes.detailText}>
                placeat facere possimus placeat facere possimus
              </Typography>
              <Typography className={classes.detailText}>
                placeat facere possimus placeat facere possimus
              </Typography>
              <Typography className={classes.detailText}>
                placeat facere possimus placeat facere possimus
              </Typography>
              <Typography className={classes.detailText}>
                placeat facere possimus placeat facere possimus
              </Typography>
              <Typography className={classes.detailText}>
                placeat facere possimus placeat facere possimus
              </Typography>
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
};

Profile.getInitialProps = async (context: NextPageContext) => {
  const props = { header: true, footer: true };
  return { ...props };
};

export default Profile;
