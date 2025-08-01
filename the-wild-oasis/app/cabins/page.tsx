import classes from "../_styles/cabing-page.module.css";
import { getCabins } from "../_lib/getCabins";
import { UsergroupAddOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Cabins | The Wild Oasis",
};

export default async function PageCabin() {
  const data = await getCabins();
  //console.log(data);
  return (
    <>
      <div>
        <h1 className={classes.h1}>Our Luxury Cabins</h1>
        <p className={classes.p}>
          Cozy yet luxurious cabins, located right in the heart of the Italian
          Dolomites. Imagine waking up to beautiful mountain views, spending
          your days exploring the dark forests around, or just relaxing in your
          private hot tub under the stars. Enjoy nature&apos;s beauty in your
          own little home away from home. The perfect spot for a peaceful, calm
          vacation. Welcome to paradise.
        </p>
      </div>
      <main className={classes.main}>
        {data?.map((cabin) => (
          <div className={classes.cabincard} key={cabin.id}>
            <Image
              src={`/images/${cabin.image}`}
              alt="lol"
              width="187"
              height="200"
            ></Image>
            <div className={classes.textWrapper}>
              <h3 className={classes.cabinName}>Cabin {cabin.name}</h3>
              <div className={classes.guests}>
                <UsergroupAddOutlined />
                <p> For up to {cabin.maxCapacity} guests</p>
              </div>
              <div className={classes.price}>
                $ {cabin.regularPrice} / night
              </div>
              <div className={classes.price}></div>
              <div className={classes["buttons-container"]}>
                <div className={classes.button}></div>
                <Link href={`/cabins/${cabin.id}`} className={classes.button}>
                  Details & reservation <ArrowRightOutlined />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
