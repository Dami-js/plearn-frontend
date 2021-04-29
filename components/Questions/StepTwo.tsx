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

const stepTwoQuestions: Array<{ index: number; question: string }> = [
  {
    index: 9,
    question:
      "I usually say immediately what I think in order to achieve results quickly",
  },
  {
    index: 10,
    question: "I do not comment before I’ve thought things through",
  },
  {
    index: 11,
    question: "I get bored with routines",
  },
  {
    index: 12,
    question: "I want to weigh all information before deciding",
  },
  {
    index: 13,
    question: "I try to consider things in their logical context",
  },
  {
    index: 14,
    question: "I am always a very practical person",
  },
  {
    index: 15,
    question: "I find new experiences interesting",
  },
  {
    index: 16,
    question: "I work out my thoughts before I express them",
  },
  {
    index: 17,
    question:
      "I like to take several points of view into consideration before deciding my own",
  },
];

const StepTwo = () => {
  return (
    <div>
      {stepTwoQuestions.map((item, index) => (
        <Box key={index} mb={3}>
          <QuestionItem index={item.index} questionText={item.question} />
        </Box>
      ))}
    </div>
  );
};

export default StepTwo;
