import { createStyles, makeStyles, Theme, Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

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
}

const ProfilePicture = (props: ProfilePictureProps) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>DS</Avatar>
    </div>
  );
};

export default ProfilePicture;
