"use client";
import { useEffect, useState } from "react";

type user = {
  id: number;
  isActive: boolean;
  email: string;
  userType: string;
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<user>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        throw new Error("error fetching user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  if (loading === true) {
    return <h1>Loading...</h1>;
  }
  return <h1>Welcome, {userData.email}</h1>;
}
