import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useState } from "react";
import { useQuestionContext } from "./context";
import QuestionItem from "./QuestionItem";

const stepThreeQuestions: Array<{ index: number; question: string }> = [
  {
    index: 18,
    question: "Straight actions are more typical for me than careful ones",
  },
  {
    index: 19,
    question: "I produce innovative ideas",
  },
  {
    index: 20,
    question: "I get straight to the point in the meetings",
  },
  {
    index: 21,
    question: "I do not act without proper planning",
  },
  {
    index: 22,
    question: "I like to work before concluding",
  },
  {
    index: 23,
    question: "I always prefer a systematic way of working",
  },
  {
    index: 24,
    question: "I work analytically when solving problems",
  },
  {
    index: 25,
    question: "I do not hide my feelings",
  },
  {
    index: 26,
    question: "I work effectively to see the practical results",
  },
];

const StepThree = () => {
  return (
    <div>
      {stepThreeQuestions.map((item, index) => (
        <Box key={index} mb={3}>
          <QuestionItem index={item.index} questionText={item.question} />
        </Box>
      ))}
    </div>
  );
};

export default StepThree;
