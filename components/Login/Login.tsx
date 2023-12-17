import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

interface FormValues extends FieldValues {
  email: string;
  password: string;
}

const Login = (props?: any) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const [message, setMessage] = useState<string>("You are not logged in.");
  const [secret, setSecret] = useState<string>("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      //   const user = await signIn(data.email, data.password);
      //   if (user) {
      //     router.push("/dashboard");
      //   } else {
      //     console.error("Invalid credentials");
      //   }
      const token = resData.token;
      if (token) {
        const decoded = jwt.decode(token) as { [key: string]: string };
        console.log("decoded : ", decoded);
        setMessage(
          `Welcome ${decoded.email} and you are ${
            decoded.admin ? " an admin" : " not an admin"
          }!`
        );

        localStorage.setItem("token", token);
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  const fetchData = async () => {
    const storedToken = localStorage.getItem("token");
    // const tokenValue: string = Cookies.get("token") || "";
    // console.log("tokenValue : ", tokenValue);
    const response = await fetch("api/protected-sample-api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: storedToken as string,
      },
    });
    const data = await response.json();
    console.log("data ", data);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    const response = await fetch("/api/logout");
    if (response?.status == 200) {
      const res = await response.json();
      // Redirect to the login page
      window.location.href = "/login";
    }
  };

  return (
    <div>
      <Typography variant="h4">Sign In</Typography>
      <h1>{message} </h1>
      <h1>Secret : {secret} </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        message
        <TextField
          label="Email"
          type="email"
          {...register("email", { required: "Email is required." })}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email && errors.email.message && "Enter Email"}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={
            errors.password && errors.password.message && "Password is required"
          }
        />
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </form>

      <Button variant="contained" onClick={fetchData}>
        {"Fetch Sample Data"}
      </Button>

      <div>
        <p>Are you sure you want to log out?</p>
        <Button variant="contained" onClick={handleLogout}>
          {"Logout"}
        </Button>
      </div>
    </div>
  );
};

// export const getServerSideProps = async (context: any) => {{
//   const cookies = parseCookies(context);
//   console.log("cookies : ", cookies);
//   return {
//     props: {
//       cookies,
//     },
//   };
// };

export default Login;
