import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import styles from "./Login.module.css";
import { useAppDispatch, useAppSelector } from "state/store";
import { loginTC } from "state/auth-reduser/auth-reducer";
import { Navigate } from "react-router-dom";
import { selectIsLogin } from "state/selectors/auth.selectors";
import { validate } from "utils/loginFormValidate-utils";
import { LoginInfo } from "components/Login/LoginInfo/LoginInfo";


export const Login: FC = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectIsLogin);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate,
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe));
        }
    });

    if (isLogin) {
        return <Navigate to={"/"} />;
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <LoginInfo />
                        </FormLabel>
                        <FormGroup>
                            <div className={styles.formField}>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    error={!!formik.errors.email && formik.touched.email}
                                    {...formik.getFieldProps("email")}
                                />

                                {formik.touched.email && formik.errors.email && (
                                    <div className={styles.formError}>{formik.errors.email}</div>
                                )}
                            </div>
                            <div className={styles.formField}>
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    error={!!formik.errors.password && formik.touched.password}
                                    {...formik.getFieldProps("password")}
                                />

                                {formik.touched.password && formik.errors.password && (
                                    <div className={styles.formError}>{formik.errors.password}</div>
                                )}
                            </div>
                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps("rememberMe")}
                                    />
                                }
                            />
                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
