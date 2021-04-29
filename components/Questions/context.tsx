import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface QuestionContextProps {
  answers: Array<string>;
  setAnswers: Dispatch<SetStateAction<string[]>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const QuestionContext = createContext<QuestionContextProps | undefined>(
  undefined
);

const QuestionProvider = ({ children }) => {
  const [answers, setAnswers] = useState<Array<string>>([
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]);
  const [step, setStep] = useState<number>(1);
  return (
    <QuestionContext.Provider value={{ answers, setAnswers, step, setStep }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestionContext must be used in QuestionProvider");
  }
  return context;
};

export default QuestionProvider;
