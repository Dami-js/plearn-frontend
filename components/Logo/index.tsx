import { Typography } from "@material-ui/core";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Typography variant="h4">Logo</Typography>
      </Link>
    </div>
  );
};

export default Logo;
