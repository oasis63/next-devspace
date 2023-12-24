// pages/register.tsx
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Box,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import { User } from "@/utils/models";
// import { User, signUp } from "../types";

interface FormValues extends FieldValues {
  username: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  lookingFor: string;
}

const Register = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<User>({ mode: "onChange" });
  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (data) => {
    console.log(errors);
    try {
      console.log("register form submit data : ", data);
      const newUser: User = {
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
        gender: data.gender,
        matchingPreference: {
          gender: data.lookingFor,
        },
        // Include other fields as needed
      };
      console.log("newUser : ", newUser);
      //   await signUp(user);
      //   router.push("/signin");

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const resData = await response.json();

      console.log("resData : ", resData);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h2"> Register </Typography>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={12}
        container
        item
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Name"
            type="text"
            {...register("name", { required: "Name is required" })}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <TextField
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={
              errors.email && errors.email.message && "Email is required"
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={
              errors.password &&
              errors.password.message &&
              "Password is required"
            }
          />
        </Grid>

        <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField
            label="Age"
            type="number"
            {...register("age", { required: "Age is required", min: 18 })}
            fullWidth
            margin="normal"
            error={!!errors.age}
            helperText={errors.age && errors.age.message && "Minimum age is 18"}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField
            label="Gender"
            select
            fullWidth
            margin="normal"
            {...register("gender", { required: "Gender is required" })}
            error={!!errors.gender}
            helperText={
              errors.gender && errors.gender.message && "Gender is required"
            }
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField
            label="Looking For"
            select
            fullWidth
            margin="normal"
            {...register("lookingFor", { required: "Looking For is required" })}
            error={!!errors.lookingFor}
            helperText={
              errors.lookingFor &&
              errors.lookingFor.message &&
              "What are you looking for"
            }
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
