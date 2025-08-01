import { connectToDatabase } from "../_lib/db";

export async function getCabins() {
  const db = await connectToDatabase();
  try {
    const response = await db.request().query("SELECT * FROM dbo.Cabins");
    return response.recordset;
  } catch (error) {
    console.log(error);
  }
}
