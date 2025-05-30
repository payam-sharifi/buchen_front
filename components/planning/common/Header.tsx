'use client';
import { FC, Dispatch, SetStateAction } from 'react';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import TodayIcon from '@mui/icons-material/Today';
import moment from 'jalali-moment';

type propsType = {
  setSelectedMonth: Dispatch<SetStateAction<string>>;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
};

const Header: FC<propsType> = ({ setSelectedMonth, setFilterModal }) => {
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const { lang } = useParams();

  return (
    <Grid
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.paper,
        py: 1.8,
      }}
    >
      <Grid container justifyContent="start" alignItems="center">
        <IconButton
          sx={[
            { p: 0 },
            theme.direction === 'rtl' ? { mr: 2, ml: 1.5 } : { ml: 2, mr: 1.5 },
          ]}
          onClick={() => {
            router.push('/' + lang + '/');
          }}
        >
          <PmlmIcon
            src={
              theme.direction === 'rtl'
                ? 'icon-typeChevrone-right-solid'
                : 'icon-typeChevron-left'
            }
            color={theme.palette.grey[800]}
          />
        </IconButton>
        <Typography variant="h6">{t('planning')}</Typography>
      </Grid>

      <Grid
        display="flex"
        alignItems="center"
        sx={[
          theme.direction === 'rtl' ? { ml: 2 } : { mr: 2 },
          { display: 'flex', alignItems: 'center' },
        ]}
      >
        <IconButton
          onClick={() => setSelectedMonth(moment().format())}
          sx={[theme.direction === 'rtl' ? { ml: 1 } : { mr: 1 }, { p: 0 }]}
        >
          <PmlmIcon src={'icon-calendar-day'} color={theme.palette.grey[800]} />
        </IconButton>
        <IconButton onClick={() => setFilterModal(true)} sx={{ p: 0 }}>
          <PmlmIcon src={'icon-typefilter'} color={theme.palette.grey[800]} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
