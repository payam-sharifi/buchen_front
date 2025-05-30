'use client';

import { Box, Modal, useTheme, Button, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Dispatch, FC, SetStateAction, useState } from 'react';
// https://www.google.com/maps/@35.7418463,51.4359905,16.39z?entry=ttu
type PropType = {
  openModal: boolean;
  onClose: () => void;

  setAddress: Dispatch<SetStateAction<string>>;
};

export const AddLinkModal: FC<PropType> = ({
  openModal,
  onClose,
  setAddress,
}) => {
  const t = useTranslations();
  const [newAddress, setNewAddress] = useState<string>('');

  const SetAddress = () => {
    setAddress(newAddress);
    onClose();
  };
  return (
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
            p: '10px',
            my: 2,
          }}
        >
          <TextField
            onChange={(e) => setNewAddress(e.target.value)}
            id="outlined-basic"
            label="لینک جلسه"
            variant="outlined"
          />

          <Button
            variant="contained"
            fullWidth
            onClick={SetAddress}
            disabled={!newAddress}
            sx={{ fontSize: '14px', py: 1 }}
          >
            {t('S_Save')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
