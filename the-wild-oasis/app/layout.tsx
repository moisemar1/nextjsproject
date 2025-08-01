import Logo from "./_components/Logo";
import Navigation from "./_components/navigation";
import type { ReactNode } from "react";
import classes from "./_styles/layout.module.css";
import ".//_styles/global.css";
export const metadata = { title: "The wild oasis" };

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

//console.log(josefin);

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${josefin.className} ${classes.background}`}>
        <div className={classes["header-container"]}>
          <header className={classes.header}>
            <Logo />
            <Navigation />
          </header>
        </div>
        <div className={classes["main-container"]}>
          <div className={classes["main-content"]}>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
