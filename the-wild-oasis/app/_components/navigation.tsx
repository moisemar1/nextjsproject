import Link from "next/link";
import classes from "./navigation.module.css";
export default function Navigation() {
  return (
    <ul className={classes.navList}>
      <li>
        <Link href="/cabins">Cabins</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/account">Guest Area</Link>
      </li>
    </ul>
  );
}
