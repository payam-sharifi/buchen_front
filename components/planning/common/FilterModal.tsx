'use client';
import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Container,
  Button,
  Grid,
  IconButton,
  Checkbox,
  alpha,
  Drawer,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import FilterEditTag from './FilterEditTag';
import { ReactNode, useState } from 'react';
import {
  GetListTagResponseType,
  GetListTagType,
} from '#/redux/services/user/planningApi/planningApi';
import { useColorStyles } from '#/Hooks/useColorStyles';
export type tagListItemsType = {
  tagId: number;
  id: number;
  title: string;
  icon: ReactNode;
  action: () => void;
};

const FilterModal = ({
  openModal,
  onClose,
  tagListData,
  changeView,
  view,
  selectedTag,
  setSelectedTag,
}: {
  openModal: boolean;
  onClose: any;
  tagListData?: GetListTagResponseType;
  changeView: any;
  view: any;
  selectedTag: number[];
  setSelectedTag: Dispatch<SetStateAction<number[]>>;
}) => {
  const [filterEditTag, setFilterEditTag] = useState<boolean>(false);
  const t = useTranslations();

  const theme = useTheme();
  const { getbgcolor } = useColorStyles();





  const modalListData: tagListItemsType[] = tagListData?.data
    ? tagListData?.data.map((item: GetListTagType) => ({
        title: item.nameTags,
        tagId: item.planTagId,
        id: item.id,
        icon: (
          <PmlmIcon
            src={'icon-typecircle-solid'}
            color={getbgcolor(item?.planTagId)}
            fontSize={'32px'}
          />
        ),
        action: () => {},
      }))
    : [];

  return (
    <>
      <Drawer
        anchor={theme.direction !== 'rtl' ? 'left' : 'right'}
        SlideProps={{
          direction: theme.direction === 'rtl' ? 'left' : 'right',
        }}
        open={openModal}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: { xs: '70%', md: '60%' },
            height: '100vh',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            backgroundColor: (theme) => theme.palette.background.paper,
          },
        }}
      >
        <Container maxWidth="md" sx={{ px: 0 }}>
          <Grid
            container
            sx={{
              alignItems: 'center',
              px: 1.7,
              py: 1.5,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1">{t('filters')}</Typography>
            <IconButton onClick={() => onClose()} sx={{ p: 0 }}>
              <PmlmIcon src="icon-x-mark"></PmlmIcon>
            </IconButton>
          </Grid>
          {modalListData.map((item) => (
            <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                py: 0.5,
                px: 1,
                borderBottom: '1px solid',
                borderColor: theme.palette.grey[300],
              }}
            >
              <Grid item display="flex" alignItems="center">
                {item.icon}
                <Typography variant="subtitle2" sx={{ mx: 0.5 }}>
                  {/* {t(item.title)} */}
                  {item.title}
                </Typography>
              </Grid>
              <Grid>
                <Checkbox
                  color="info"
                  checked={selectedTag.includes(item.tagId)}
                  onClick={() => {
                    setSelectedTag((state) =>
                      selectedTag.includes(item.tagId)
                        ? state.filter((i) => i !== item.tagId)
                        : [...state, item.tagId],
                    );
                  }}
                />
              </Grid>
            </Grid>
          ))}

          <Typography variant="subtitle1" sx={{ px: 1.7, mt: 2, mb: 1 }}>
            {t('H_Namayesh')}
          </Typography>

          {[
            {
              title: 'weekly',
              value: 'week',
              icon: 'icon-calendar-week-regular',
            },
            {
              title: 'monthly',
              value: 'month',
              icon: 'icon-calendar-month',
            },
          ].map((item) => (
            <Grid container sx={{ px: 1.5 }}>
              <Button
                fullWidth
                onClick={() => {
                  changeView(item.value);
                }}
                sx={{ p: 0, mb: 1.5 }}
                color={item.value === view ? 'primary' : 'inherit'}
                variant={item.value === view ? 'contained' : 'text'}
              >
                <Grid
                  container
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    py: 0.5,
                    px: 1,
                  }}
                >
                  <Grid item display="flex" alignItems="center">
                    <PmlmIcon src={item.icon} color={theme.palette.grey[700]} />
                    <Typography variant="subtitle2" sx={{ mx: 0.5 }}>
                      {t(item.title)}
                    </Typography>
                  </Grid>
                  <Grid></Grid>
                </Grid>
              </Button>
            </Grid>
          ))}

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              bgcolor: 'background.paper',
              py: 2,

              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => {
                setFilterEditTag(true);
                onClose();
              }}
            >
              <PmlmIcon
                src="icon-typegear-regular"
                color={theme.palette.grey[700]}
              />

              <Typography
                sx={{ mx: 0.3 }}
                color={theme.palette.grey[800]}
                variant="subtitle2"
              >
                {t('Edit_tags')}
              </Typography>
            </IconButton>
          </Box>
        </Container>
      </Drawer>
      <FilterEditTag
        modalListData={modalListData}
        openModal={filterEditTag}
        onClose={() => {
          setFilterEditTag(false);
        }}
      />
    </>
  );
};
export default FilterModal;
