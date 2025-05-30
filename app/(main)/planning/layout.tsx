import { Grid } from "@mui/material";
import React from "react";
import MainLayout from "@/components/layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid container>
      {/* <MainLayout>{children}</MainLayout> */}
      {children}
    </Grid>
  );
}
