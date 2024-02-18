import React, { FC } from "react";
import styles from "./Header.module.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "state/store";
import { Button } from "../Button/Button";
import { logoutTC } from "state/auth-reduser/auth-reducer";

export const Header: FC = () => {
    const isLoading = useAppSelector((state) => state.app.status);
    const isLogin = useAppSelector((state) => state.auth.isLogin);
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(logoutTC());
    };

    return (
        <Box sx={{ width: "100%" }}>
            <div className={styles.header}>
                <span className={styles.logo}>To do lists</span>
                {isLogin && (
                    <Button
                        title={"Logout"}
                        onClickHandler={onLogout}
                        disabled={isLoading === "loading"}
                        classes={styles.logoutBtn}
                    />
                )}
            </div>
            {isLoading === "loading" && <LinearProgress />}
        </Box>
    );
};
