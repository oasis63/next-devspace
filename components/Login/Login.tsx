import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
// import { signIn } from "../types";

interface FormValues extends FieldValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log("sign in data : ", data);
      //   const user = await signIn(data.email, data.password);
      //   if (user) {
      //     router.push("/dashboard");
      //   } else {
      //     console.error("Invalid credentials");
      //   }
    } catch (error) {
      console.error("Signin failed:", error);
    }
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
    </div>
  );
};

export default Login;
