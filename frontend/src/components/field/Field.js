import React from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { InputBase, InputLabel } from "@material-ui/core";
import { FormControl, FormHelperText, Grid } from "@material-ui/core";

export const Field = ({
  disabled,
  fullWidth,
  gutterBottom = true,
  label,
  labelId,
  required,
  status = "normal",
}) => {
  return (
    <FormControl
      disabled={disabled}
      error={status === "error"}
      fullWidth={fullWidth}
      required={required}
    >
      <Grid container justify="space-between">
        <Grid item>
          <InputLabel shrink id={labelId}>
            {label}
          </InputLabel>
          <InputBase />
        </Grid>
      </Grid>
    </FormControl>
  );
};
