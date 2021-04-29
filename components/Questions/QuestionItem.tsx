import { ChangeEvent, Fragment, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { useQuestionContext } from "./context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formLabel: {
      fontSize: theme.spacing(2.3),
      marginBottom: theme.spacing(2),
      color: theme.palette.grey[900],
    },
    formControlLabel: {
      color: theme.palette.grey[600],
    },
  })
);

interface QuestionItemProps {
  index: number;
  questionText: string;
}

const QuestionItem = (props: QuestionItemProps) => {
  const classes = useStyles();
  const { answers, setAnswers } = useQuestionContext();

  const handleSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const ans = [...answers];
    ans[props.index] = e.target.value;
    setAnswers(ans);
  };

  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.formLabel}>
          {props.index + 1}. {props.questionText}
        </FormLabel>
        <RadioGroup
          aria-label="q"
          name="q1"
          value={answers[props.index]}
          onChange={(e) => handleSetAnswer(e)}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Strongly disagree"
            className={classes.formControlLabel}
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            className={classes.formControlLabel}
            label="Disagree"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            className={classes.formControlLabel}
            label="Neutral"
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            className={classes.formControlLabel}
            label="Agree"
          />
          <FormControlLabel
            value="5"
            control={<Radio />}
            label="Strongly Agree"
            className={classes.formControlLabel}
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default QuestionItem;
