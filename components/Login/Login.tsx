import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useDatingStore } from "@/store";
import Logout from "../Logout/Logout";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { customFetch } from "@/utils/customFetch";
import {
  encryptData,
  highEncryptData,
  setLocalStorageKeyData,
} from "@/utils/authUtils";
import {
  ENC_USER_DATA_KEY,
  IS_LOGGEDIN_KEY,
  TOKEN_KEY,
  USER_DATA_KEY,
} from "@/utils/constants";

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

  const { isLoggedIn, setIsLoggedIn, setLoggedInUser, setAlertProps } =
    useDatingStore();

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (isLoggedIn) {
    router.push("/");
  }

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.push("/");
  //   }
  // }, []);

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

      if (response?.status === 200 && resData?.token) {
        const token = resData.token;
        const resUserData = resData.user;
        // const decoded = jwt.decode(token) as { [key: string]: string };

        setLoggedInUser(resUserData);

        setLocalStorageKeyData(TOKEN_KEY, token);
        setLocalStorageKeyData(IS_LOGGEDIN_KEY, "true");
        // setLocalStorageKeyData(USER_DATA_KEY, JSON.stringify(resUserData));

        const encryptedUserData = encryptData(resUserData);
        // const encryptedUserData = await highEncryptData(resUserData);
        setLocalStorageKeyData(ENC_USER_DATA_KEY, encryptedUserData);

        setIsLoggedIn(true);

        setAlertProps({
          message: "LoggedIn Successfully!",
          severity: "success",
        });

        router.push("/");
      } else {
        setAlertProps({
          message: resData?.error || "Error",
          severity: "error",
        });
      }
    } catch (error) {
      setAlertProps({
        message: "Signin failed",
        severity: "error",
      });
    }
  };

  const fetchData = async () => {
    const fetchProps = {
      url: "api/protected-sample-api",
    };
    const data = await customFetch(fetchProps);
    console.log("data ", data);
  };

  return (
    <div>
      <Typography variant="h4">Sign In</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  sx={{ color: showPassword ? "green" : "gray" }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        <Logout />
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
