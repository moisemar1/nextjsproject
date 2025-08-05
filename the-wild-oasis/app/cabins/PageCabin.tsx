"use client";
import classes from "../_styles/cabing-page.module.css";
import { getCabins } from "../_lib/getCabins";
import { UsergroupAddOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";

import { Select } from "antd";
import { stringify } from "querystring";

export const metadata = {
  title: "Cabins | The Wild Oasis",
};

type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

export default function PageCabin() {
  ///const data = await getCabins() old;
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedCabin, setSelectedCabin] = useState<Cabin>();
  const [numGuests, setNumGuests] = useState(1);
  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs] | null>(
    null
  );

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const response = await fetch("http://localhost:8000/cabins");
        if (!response.ok) {
          throw new Error("Failed to fetch cabins");
        }
        const data = await response.json();
        setCabins(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCabins();
  }, []);

  const handleBooking = async () => {
    try {
      ///Dummy call for testing
      const [startDate, endDate] = selectedDates;
      const body = new URLSearchParams();
      body.append("startDate", startDate.toISOString());
      body.append("endDate", endDate.toISOString());
      body.append("cabinId", selectedCabin.id.toString());
      body.append("guestId", "99999999"); ///Just for testing, it is automatically overwritten in the backend
      body.append("hasBreakfast", "true");
      body.append("observation", "Inserted from PageCabin.tsx");
      body.append("isPaid", "false");
      body.append("numGuests", numGuests.toString());

      const response = await fetch("http://localhost:8000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: body.toString(),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Reservation created");
      }
    } catch (error) {
      alert("There was a problem creating the reservation");
    }
  };

  if (loading) return <div>Loading...</div>;
  //console.log(cabins);
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
        {cabins?.map((cabin) => (
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
                <div
                  className={classes.button}
                  onClick={() => {
                    setPopup(true);
                    setSelectedCabin(cabin);
                  }}
                >
                  Book Now <ArrowRightOutlined />
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      {popup && (
        <div className={classes.PopupOverlay} onClick={() => setPopup(false)}>
          <div
            className={classes.popup}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1>Cabin {selectedCabin.name}</h1>
            <h2>Select Booking Dates</h2>
            <DatePicker.RangePicker
              open={open}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setSelectedDates(dates);
                  setOpen(false);
                }
              }}
            />
            <p>Numer of guests</p>
            <Select
              options={Array.from(
                { length: selectedCabin?.maxCapacity || 0 },
                (_, i) => ({
                  value: i + 1,
                  label: (i + 1).toString(),
                })
              )}
              onChange={(value) => setNumGuests(value)}
            />
            <button className={classes.confirm} onClick={() => handleBooking()}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}
