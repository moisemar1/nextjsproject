import Image from "next/image";
import Image1 from "@/public/about-1.jpg";
import Image2 from "@/public/about-2.jpg";
import classes from "../_styles/about-page.module.css";
import Link from "next/link";
/**export const metadata = {
  title: {
    template: "About | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
};
*/

export const metadata = {
  title: "About | The Wild Oasis",
};

export default function PageCabin() {
  return (
    <>
      <div className={classes["main-content"]}>
        <div className={classes.text}>
          <h1>Welcome to The Wild Oasis</h1>
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our 8 luxury cabins provide a cozy base, but the real freedom and
            peace you&apos;ll find in the surrounding mountains. Wander through
            lush forests, breathe in the fresh air, and watch the stars twinkle
            above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
        <div className={classes.image}>
          <Image src={Image1} alt="About1" width="450" height="450" />
        </div>
      </div>
      <div className={classes["main-content"]}>
        <Image src={Image2} alt="Image2" width="450" height="450" />
        <div className={classes.text}>
          <h1>Managed by our family since 1962</h1>
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>
          <Link className={classes.link} href="/cabins">
            Explore our luxury cabins
          </Link>
        </div>
      </div>
    </>
  );
}
