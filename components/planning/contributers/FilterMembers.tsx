import {
  alpha,
  Checkbox,
  FormControl,
  Grid,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import ExecutionPriorityEnum from '#/ui/main/contactList/types/ExecutionPriorityEnum';
import { useTranslations } from 'next-intl';
import { useGetAllReminderListQuery } from '#/redux/services/contactListApi';
import { useParams } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { OutLinedTextField } from '#/ui/component/InputComp';

import RankList from '#/ui/main/planning/contributers/RankList';

export type PropsType = {
  isShow: any,
  filterConfig: { IsResponse: boolean; SematId: string; SematTitle: string };
  setFilterConfig: Dispatch<
    SetStateAction<{
      IsResponse: boolean;
      SematId: string;
      SematTitle: string;
    }>
  >;
};

const FilterMembers: FC<PropsType> = ({ filterConfig, setFilterConfig, isShow }) => {
  const t = useTranslations();
  const params = useParams();
  const theme = useTheme();
  const [openRankModal, setOpenRankModal] = useState<boolean>(false);
  return (
    <Grid
      container
      sx={{
        alignItems: 'center',
        py: 1.5,
        px: 1,
        justifyContent: 'space-around',
        mt: 9,
      }}
    >
      <RankList
        onClose={() => setOpenRankModal(false)}
        openModal={openRankModal}
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
      />
      
        <Grid item xs={true} sx={{ px: 1 }}>
          <FormControl fullWidth sx={{}}>
            <Button
              color="inherit"
              fullWidth
              sx={{ p: 0 }}
              onClick={() => setOpenRankModal(true)}
            >
              <Grid
                container
                display="flex"
                alignItems="center"
                sx={{
                  border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
                  bgcolor: 'background.paper',
                  height: '40px',
                  px: 2,
                  borderRadius: 1.5,
                }}
              >
                <Typography>
                  {t('S_Semat')}: {filterConfig.SematTitle}
                </Typography>
              </Grid>
            </Button>
          </FormControl>
        </Grid>
      

      <Grid container sx={{ display: 'flex', px: 1 }} item xs={5} md={ 12 }>
        <Button
          fullWidth
          color="inherit"
          sx={{ p: 0 }}
          onClick={() =>
            setFilterConfig({
              ...filterConfig,
              IsResponse: !filterConfig?.IsResponse,
            })
          }
        >
          <Grid
            container
            display="flex"
            alignItems="center"
            sx={{
              border: `1px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
              bgcolor: 'background.paper',
              height: '40px',
              borderRadius: 1.5,
            }}
          >
            <Typography textAlign="start" variant="body2">
              <Checkbox color="primary" checked={filterConfig?.IsResponse} />
              {t('just_desc')}
            </Typography>
          </Grid>
        </Button>
      </Grid>
    </Grid>
  );
};
export default FilterMembers;
