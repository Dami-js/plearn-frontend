import { createStyles, makeStyles, Theme, Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { User } from "pages/api/auth/[...nextauth]";
import * as _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: (props: ProfilePictureProps) => theme.spacing(props.size ?? 10),
      height: (props: ProfilePictureProps) => theme.spacing(props.size ?? 10),
    },
  })
);

interface ProfilePictureProps {
  size?: number;
  user?: User;
}

const ProfilePicture = (props: ProfilePictureProps) => {
  const classes = useStyles(props);
  const { user } = props;

  const initails = `${_.upperCase(user?.firstname[0])}${_.upperCase(
    user?.lastname[0]
  )}`;
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>{initails}</Avatar>
    </div>
  );
};

export default ProfilePicture;
