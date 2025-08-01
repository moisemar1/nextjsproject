import type { ReactNode } from "react";
import {
  HomeFilled,
  UserOutlined,
  CalendarFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import classes from "@/app/_styles/layout-profile.module.css";
type RootLayoutProps = {
  children: ReactNode;
};

export default function AccountLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className={classes["sidebar-navigation"]}>
        <Link className={classes.link} href="/" replace>
          <div className={classes.button}>
            <HomeFilled />
            <p>Home</p>
          </div>
        </Link>
        <Link className={classes.link} href="/account/reservations">
          <div className={classes.button}>
            <CalendarFilled />
            <p>Reservation</p>
          </div>
        </Link>
        <Link className={classes.link} href="/account/profile">
          <div className={classes.button}>
            <UserOutlined />
            <p>Guest prifle</p>
          </div>
        </Link>

        <Link className={`${classes.link} ${classes.signout}`} href="/">
          <div className={classes.button}>
            <LogoutOutlined />
            <p>Sign out</p>
          </div>
        </Link>
      </div>

      <div>{children}</div>
    </>
  );
}
