
import { Grid, Typography, useTheme, IconButton } from '@mui/material';
import React, { FC, Dispatch, SetStateAction } from 'react';
import moment from 'jalali-moment';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
type propsType = {
  selectedWeek: string;
  setSelectedWeek: Dispatch<SetStateAction<string>>;
};

const WeeksNavigation: FC<propsType> = ({ selectedWeek, setSelectedWeek }) => {
  const { lang } = useParams();
  const t = useTranslations();
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        sx={{
          // position: 'sticky',
          // top: 0,
          my: 2,
          // bgcolor: alpha(theme.palette.primary.light, 0.2),
          width: 'auto',
          // ...(theme.direction === 'rtl' ? { pr: 0 } : { pl: 0 }),
        }}
      >
        <Typography sx={{ mx: 1.5 }}>
          {}
          {moment(selectedWeek).locale(lang).format('MMMM yyyy')}
        </Typography>

        <Grid display="flex">
          <IconButton
            color="inherit"
           
            onClick={() =>
              setSelectedWeek(moment(selectedWeek).add(1, 'week').format())
            }
          >
            {theme.direction === 'rtl' ? <ArrowForwardIosIcon/> :<ArrowBackIosNewIcon/>}
        
            <Typography
            
      
            variant="subtitle2">{t('next_week')}</Typography>
          </IconButton>
          <Grid sx={{ px: 1 }}></Grid>
          <IconButton
            color="inherit"
            onClick={() =>
              setSelectedWeek(moment(selectedWeek).add(-1, 'week').format())
            }
          >
            <Typography variant="subtitle2">{t('previus_week')}</Typography>
            {theme.direction === 'rtl' ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};
export default WeeksNavigation;
