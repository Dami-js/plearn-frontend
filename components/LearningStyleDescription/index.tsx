import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    text: {
      fontWeight: 700,
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
      },
    },
  })
);

type LearningStyle = "activist" | "pragmatist" | "theorist" | "reflector";

export const getDescription = (style: LearningStyle) => {
  const ls = style.toLowerCase();
  switch (ls) {
    case "activist":
      return "An activist is a person who engages in activism, the practice of taking direct action to achieve political or social goals. Activists enjoy a wide range of different activities.";

    case "pragmatist":
      return "A pragmatist is a person who deals with problems or situations by focusing on practical approaches and solutions; ones that will work in practice, as opposed to being ideal in theory.";

    case "theorist":
      return "A theorist is a person who is concerned with theory and develops an abstract idea or set of ideas about a particular subject in order to explain it.";

    case "reflector":
      return "Reflectors learns by observing and thinking about events. They like to consider all the possible angles and implications before coming to a considered opinion.";
    default:
      return "";
  }
};

const LearningStyleDescription = ({ learningStyle }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.text}>
        {getDescription(learningStyle)}
      </Typography>
    </div>
  );
};

export default LearningStyleDescription;
