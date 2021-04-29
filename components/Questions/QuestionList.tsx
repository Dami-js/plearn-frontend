import { Box, Button, Typography } from "@material-ui/core";
import QuestionProvider, { useQuestionContext } from "./context";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const QuestionList = () => {
  const { answers, step, setStep } = useQuestionContext();
  return (
    <>
      <Box textAlign="center" fontWeight="bold" py={4}>
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
            onClick={() => setStep(step - 1)}
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
              onClick={() => setStep(step + 1)}
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
            onClick={() => console.log(answers)}
          >
            Submit
          </Button>
        )}
      </Box>
    </>
  );
};

export default QuestionList;
