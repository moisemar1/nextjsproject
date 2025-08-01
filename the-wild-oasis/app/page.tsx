import Link from "next/link";
import classes from "./_styles/home-page.module.css";
import Image from "next/image";
import bg from "@/public/bg.png";
export const metadata = {
  title: "Home | The Wild Oasis",
};

export default function Home() {
  return (
    <>
      <div>
        <Image src={bg} className={classes.image} alt="placeholder" fill />
      </div>
      <main className={classes.container}>
        <h1 className={classes["text-center"]}>Welcome to paradise</h1>
        <Link href="/cabins" className={classes["button"]}>
          Explore luxury cabins
        </Link>
      </main>
    </>
  );
}
