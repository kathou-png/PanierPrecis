import { NavigateFunction } from "react-router-dom";
import { User, UserLogin } from "../../types/user";

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Propagate the error to the caller if needed
  }
}
export const submitLogin = async ({
  mail,
  password,
  login,
  navigate,
}: {
  mail: string;
  password: string;
  login: (data: User) => void;
  navigate: NavigateFunction;
}) => {
  if (mail !== "" && password !== "") {
    try {
      const response = await fetch(
        `http://localhost:3000/login?email=${encodeURIComponent(
          mail
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();

      if (res.data) {
        console.log(res);
        if (res.data) {
          const user: User = res.data;
          await login(user);
          navigate("/invoice");
        }
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("please provide a valid input");
  }
};
