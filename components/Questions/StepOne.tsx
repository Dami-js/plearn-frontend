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

const stepOneQuestions: Array<{ index: number; question: string }> = [
  {
    index: 0,
    question: "I am eager to test new ideas in practice",
  },
  {
    index: 1,
    question: "I like to plan my work properly",
  },
  {
    index: 2,
    question: "I do not believe in impulsive decisions",
  },
  {
    index: 3,
    question: "I act spontaneously",
  },
  {
    index: 4,
    question: "I believe mainly in practical facts",
  },
  {
    index: 5,
    question: "I like the company of sociable people",
  },
  {
    index: 6,
    question:
      "I want to see the connections between theory and practice immediately",
  },
  {
    index: 7,
    question: "I rely on principles and theories",
  },
  {
    index: 8,
    question: "I prefer having lots of drafts before making the final version",
  },
];

const StepOne = () => {
  return (
    <div>
      {stepOneQuestions.map((item, index) => (
        <Box key={index} mb={3}>
          <QuestionItem index={item.index} questionText={item.question} />
        </Box>
      ))}
    </div>
  );
};

export default StepOne;
