import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { alpha, Grid, Typography, useTheme, IconButton } from '@mui/material';
import React, { FC, Dispatch, SetStateAction } from 'react';
import moment from 'jalali-moment';
import { useParams, useRouter } from 'next/navigation';

type propsType = {
  selectedMonth: string;
  setSelectedMonth: Dispatch<SetStateAction<string>>;
};

const MonthsNavigation: FC<propsType> = ({
  selectedMonth,
  setSelectedMonth,
}) => {
  const { lang } = useParams();

  const theme = useTheme();
console.log(selectedMonth,"selectedMonth")
  return (
    <>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        sx={{
          my: 2,
          background: alpha(theme.palette.background.default, 0.5),
          width: 'auto',
          // ...(theme.direction === 'rtl' ? { pr: 0 } : { pl: 0 }),
        }}
      >
        <IconButton
          sx={{
            ...(theme.direction === 'rtl'
              ? {}
              : { transform: 'rotate(180deg)' }),
          }}
          onClick={() =>
            setSelectedMonth(moment(selectedMonth).add(-30, 'day').format())
          }
        >
          <PmlmIcon src={'icon-typeChevrone-right-solid'} />
        </IconButton>

        <Typography sx={{ mx: 1.5 }}>
          {}
          {moment(selectedMonth).locale(lang).format('MMMM yyyy')}
        </Typography>

        <IconButton
          sx={{
            ...(theme.direction === 'rtl'
              ? {}
              : { transform: 'rotate(180deg)' }),
          }}
          onClick={() =>
            setSelectedMonth(moment(selectedMonth).add(30, 'day').format())
          }
        >
          <PmlmIcon src={'icon-typeChevron-left'} />
        </IconButton>
      </Grid>
    </>
  );
};
export default MonthsNavigation;
