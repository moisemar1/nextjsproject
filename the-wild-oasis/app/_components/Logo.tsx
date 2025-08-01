import Link from "next/link";
import Image from "next/image";
import classes from "./logo.module.css";
function Logo() {
  return (
    <Link href="/" className={classes.logo}>
      <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" />
      <span className={classes["logo-text"]}>The Wild Oasis</span>
    </Link>
  );
}

export default Logo;
