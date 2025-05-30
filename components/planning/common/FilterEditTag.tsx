'use client';
import {
  Box,
  Modal,
  Stack,
  Container,
  useTheme,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { OutLinedTextField } from '#/ui/component/InputComp';
import { useUpdateTagMutation } from '#/redux/services/user/planningApi';
import { useState, useEffect } from 'react';
import {
  setAlert,
  setMessage,
  setSuccess,
} from '#/redux/features/snackBarHandlerSlice';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { tagListItemsType } from './FilterModal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  getIdTagSession,
  getTagSession,
  getTagTitleSession,
} from '#/redux/features/planningSlice';
import { usePathname } from 'next/navigation';
import { LoadingButton } from '@mui/lab';

interface Item {
  nameTage: string;
  planTageRequestId: number;
}
const FilterEditTag = ({
  openModal,
  onClose,
  modalListData,
}: {
  openModal: boolean;
  onClose: any;
  modalListData?: tagListItemsType[];
}) => {
  const t = useTranslations();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const path = usePathname();
  const [updateTags, isLoading] = useUpdateTagMutation({});
  const TagId = useAppSelector((state) => state.planningSlice.planTagId);

  const [items, setItems] = useState<Item[]>([]);
  const [value, setValue] = useState(1);
  const [title, setTitle] = useState('');
  const [Id, setId] = useState(1);

  useEffect(() => {
    setValue(TagId);
  }, [TagId]);

  const handleChange = (tagId: any, title: any, id: any) => {
    setValue(tagId);
    setTitle(title);
    setId(id);
  };

  const addItem = (nameTage: string, planTageRequestId: number) => {
    nameTage = nameTage === '' ? t('untitled') : nameTage;
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.planTageRequestId === planTageRequestId,
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = { nameTage, planTageRequestId };
        return updatedItems;
      } else {
        return [...prevItems, { nameTage, planTageRequestId }];
      }
    });
  };

  const onSubmit = () => {
    const tagListDto = {
      tagList: items,
    };
    if (path.includes('session') && items.length === 0) {
      dispatch(getIdTagSession(Id));
      dispatch(getTagSession(value));
      dispatch(getTagTitleSession(title));
      onClose();
    } else {
      updateTags(tagListDto)
        .unwrap()
        .then((response: any) => {
          dispatch(setAlert(t(response?.status)));
          dispatch(setSuccess(t(response?.data)));
          dispatch(setMessage(t(response?.message)));

          dispatch(
            getTagTitleSession(
              items.find((j: any) => j.planTageRequestId)?.nameTage,
            ),
          );
          dispatch(
            getTagSession(
              modalListData?.find(
                (i: any) =>
                  i?.id == items?.map((j: any) => j?.planTageRequestId),
              )?.tagId,
            ),
          );
          dispatch(
            getIdTagSession(
              modalListData?.find(
                (i: any) =>
                  i?.id == items?.map((j: any) => j?.planTageRequestId),
              )?.id,
            ),
          );

          onClose();
        })
        .catch((error) => {});
    }
  };

  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      <Modal open={openModal} onClose={onClose}>
        <Box
          sx={{
            position: 'fixed',
            left: '50%',
            transform: 'translate(-50%, 0)',
            borderRadius: '5px',
            backgroundColor: 'background.paper',
            width: { xs: '100%', md: '770px' },
            zIndex: 100,
            bottom: '0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              py: 3,
              px: 2,
            }}
          >
            {modalListData?.map((listItem, index) => (
              <Stack
                color="inherit"
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Stack
                  sx={[theme.direction === 'rtl' ? { ml: 0.5 } : { mr: 0.5 }]}
                >
                  {listItem.icon}
                </Stack>
                <OutLinedTextField
                  disabled={index == 0}
                  placeholder={listItem.title}
                  defaultValue={listItem.title}
                  onBlur={(e) => addItem(e.target.value, listItem.id)}
                  sx={[
                    index == 0 && {
                      backgroundColor: theme.palette.grey[300],
                      borderRadius: 0.8,
                      '& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled ':
                        {
                          color: 'red',
                        },
                    },
                  ]}
                />
                {path.includes('session') && (
                  <RadioGroup
                    aria-labelledby="radio-button"
                    name="controlled-radio-buttons"
                    value={value}
                    onChange={() =>
                      handleChange(
                        listItem?.tagId,
                        listItem?.title,
                        listItem?.id,
                      )
                    }
                  >
                    <FormControlLabel
                      value={listItem?.tagId}
                      control={<Radio />}
                      label={''}
                    />
                  </RadioGroup>
                )}
              </Stack>
            ))}
            <Stack sx={{ mt: 2 }}>
              <LoadingButton
                variant="contained"
                fullWidth
                onClick={onSubmit}
                type="submit"
              >
                <Typography sx={{ fontSize: '14px' }}>{t('S_Save')}</Typography>
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};
export default FilterEditTag;
