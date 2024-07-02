import { NavigateFunction } from "react-router-dom";
import { User } from "../../../../types";


export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch("/users");
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
  email,
  password,
  login,
  navigate,
}: {
  email: string;
  password: string;
  login: (data: User) => void;
  navigate: NavigateFunction;
}) => {
  if (email !== "" && password !== "") {
    try {
      const response = await fetch(
        "http://localhost:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const res = await response.json();

      if (res[0]) {
        if (res[0]) {
          const user: User = res[0];
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
