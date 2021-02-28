import { Box } from "@material-ui/core";

interface SpacerProps {
  size: number;
}

const Spacer = (props: SpacerProps) => {
  const { size } = props;
  return <Box paddingY={size} />;
};

export default Spacer;
