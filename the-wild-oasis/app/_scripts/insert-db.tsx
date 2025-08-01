import { connectToDatabase } from "../_lib/db";
import { cabins, bookings, guests } from "../_lib/data";

async function insertData() {
  const db = await connectToDatabase();
  try {
    for (const cabin of cabins) {
      await db
        .request()
        .input("name", cabin.name)
        .input("maxCapacity", cabin.maxCapacity)
        .input("regularPrice", cabin.regularPrice)
        .input("discount", cabin.discount)
        .input("image", cabin.image)
        .input("description", cabin.description)
        .query(
          `INSERT INTO dbo.Cabins (name, maxCapacity, regularPrice, discount, image, description) VALUES (@name, @maxCapacity, @regularPrice, @discount, @image, @description)`
        );
    }
    console.log("Cabins inserted successfully");
  } catch (error) {
    console.log(error);
  }
  try {
    for (const book of bookings) {
      await db
        .request()
        .input("created_at", book.created_at)
        .input("startDate", book.startDate)
        .input("endDate", book.endDate)
        .input("cabinId", book.cabinId)
        .input("guestId", book.guestId)
        .input("hasBreakfast", book.hasBreakfast)
        .input("observations", book.observations)
        .input("isPaid", book.isPaid)
        .input("numGuests", book.numGuests)
        .query(
          `INSERT INTO dbo.Bookings (created_at, startDate, endDate, cabinId, guestId, hasBreakfast, observations, isPaid, numGuests) VALUES (@created_at, @startDate, @endDate, @cabinId, @guestId, @hasBreakfast, @observations, @isPaid, @numGuests)`
        );
    }
    console.log("Bookings inserted successfully");
  } catch (error) {
    console.log(error);
  }
  try {
    for (const guest of guests) {
      await db
        .request()
        .input("fullName", guest.fullName)
        .input("email", guest.email)
        .input("nationality", guest.nationality)
        .input("nationalID", guest.nationalID)
        .input("countryFlag", guest.countryFlag)
        .query(
          `INSERT INTO dbo.Guests (fullName, email, nationality, nationalID, countryFlag) VALUES (@fullName, @email, @nationality, @nationalID, @countryFlag)`
        );
    }
    console.log("Guests inserted successfully");
  } catch (error) {
    console.log(error);
  }
  db.close();
}

insertData();
