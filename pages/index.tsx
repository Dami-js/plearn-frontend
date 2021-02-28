import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import Feed from "components/Feed";
import Head from "next/head";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeText: {
      textTransform: "capitalize"
    }
  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Typography variant="h1" className={classes.homeText}>
          welcome
        </Typography>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
          quod optio architecto qui tenetur reiciendis! Voluptas officia vero
          quia pariatur.
        </Typography>
        <Feed />
      </Container>
    </div>
  );
}
