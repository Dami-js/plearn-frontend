import { Box, Button, Typography } from "@material-ui/core";
import { SignalCellularConnectedNoInternet4BarSharp } from "@material-ui/icons";
import { useEffect } from "react";
import QuestionProvider, { useQuestionContext } from "./context";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

type NavKey = "next" | "prev";

const QuestionList = () => {
  const { answers, step, setStep } = useQuestionContext();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleNavigation = (key?: NavKey) => {
    switch (key) {
      case "next":
        handleNext();
        break;
      case "prev":
        handlePrev();
        break;

      default:
        console.log(answers);
        break;
    }
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [step]);

  return (
    <>
      <Box textAlign="center" fontWeight="bold" py={4} id="#top">
        <Typography variant="h4">{step}/4</Typography>
      </Box>
      {step == 1 && <StepOne />}
      {step == 2 && <StepTwo />}
      {step == 3 && <StepThree />}
      {step == 4 && <StepFour />}
      <Box fontWeight="bold" py={4}>
        <Typography variant="h6">{step}/4</Typography>
      </Box>
      <Box py={4}>
        {step <= 4 && step > 1 && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleNavigation("prev")}
            style={{ marginRight: 10 }}
          >
            Prev
          </Button>
        )}
        {step >= 1 && step < 4 && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleNavigation("next")}
            >
              Next
            </Button>
          </>
        )}
        {step == 4 && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleNavigation()}
          >
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};

export default QuestionList;
