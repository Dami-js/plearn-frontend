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

const stepFourQuestions: Array<{ index: number; question: string }> = [
  {
    index: 27,
    question: "I avoid making hasty conclusions",
  },
  {
    index: 28,
    question: "I am interested in putting ideas into practice",
  },
  {
    index: 29,
    question: "I organize my thoughts well",
  },
  {
    index: 30,
    question: "I seek theoretical principles behind things and events",
  },
  {
    index: 31,
    question: "I am usually an innovative person in social situations",
  },
  {
    index: 32,
    question: "I enjoy talking more than listening",
  },
  {
    index: 33,
    question: "Scientifically proved theories interest me",
  },
  {
    index: 34,
    question: "I find it difficult to be spontaneous",
  },
  {
    index: 35,
    question: "I am open to using any efficient method to reach results",
  },
];

const StepFour = () => {
  return (
    <div>
      {stepFourQuestions.map((item, index) => (
        <Box key={index} mb={3}>
          <QuestionItem index={item.index} questionText={item.question} />
        </Box>
      ))}
    </div>
  );
};

export default StepFour;
