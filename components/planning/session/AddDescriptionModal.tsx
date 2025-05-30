'use client';
import { FC, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  Typography,
  Modal,
  IconButton,
  Grid,
  useTheme,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { useTranslations } from 'next-intl';

import { useParams } from 'next/navigation';
// import FormInputText from '#/ui/component/FormTextFiled2';

import { useGetSessionDetailsQuery } from '#/redux/services/user/planningApi';
import { useSessionResponsSubmitMutation } from '#/redux/services/user/planningApi';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: { xs: '100%', md: 770 },
  maxHeight: '100vh',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  overflowY: 'auto',
  py: 1,
  height: '100vh',
};

type PropType = {
  open: boolean;
  handleClose: () => void;
  // customerAddressId?: string;
};

export const AddDescriptionModal: FC<PropType> = ({ open, handleClose }) => {
  const t = useTranslations();
  const theme = useTheme();
  const { lang, id } = useParams();
  const [ResponseSubmit, { isLoading }] = useSessionResponsSubmitMutation({});
  const [description, setDescription] = useState('');

  const { data: sessionDetailData } = useGetSessionDetailsQuery({
    sessionId: Number(id),
  });

  const handleResSubmit = () => {
    ResponseSubmit({
      attendeeToSessionId: sessionDetailData?.data
        .planContributorListId as number,
      customerResponse: description,
    })
      .unwrap()
      .then((res) => {
        handleClose();
      })
      .catch((error) => {});
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
        <Grid sx={{ py: 3, px: 2 }}>
          <Typography
            variant="body1"
            fontWeight={600}
            color={theme.palette.grey[800]}
            mb={2}
          >
            در صورت نیاز توضیحات بنویسید.
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={5}
            label={t('F_Description')}
            placeholder={t('F_Recomr_Key15')}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="caption" color={theme.palette.grey[400]} mt={1}>
            محدودیت کارکتر ۱۰۰/۸۰
          </Typography>
          <LoadingButton
            fullWidth
            loading={isLoading}
            variant="contained"
            sx={{ mt: 2, py: 1, fontSize: '14px' }}
            onClick={() => handleResSubmit()}
          >
            {t('S_Save')}
          </LoadingButton>
        </Grid>
      </Box>
    </Modal>
  );
};
