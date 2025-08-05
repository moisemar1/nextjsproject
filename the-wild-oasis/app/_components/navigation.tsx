import Link from "next/link";
import classes from "./navigation.module.css";
import { auth } from "../_lib/auth";
export default async function Navigation() {
  //const session = await auth();
  //console.log(session);
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
