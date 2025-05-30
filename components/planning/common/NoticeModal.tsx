'use client';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
type ContactListModalPropsType = {
  onClose: () => void;
  open: boolean;
  icon?: ReactNode;
  primaryText?: string;
  secondaryText?: string;
  btnPrimary?: ReactNode;
  btnSecondary?: ReactNode;
};

const NoticeModal = (props: ContactListModalPropsType) => {
  const t = useTranslations();
  return (
    <Modal open={props.open}>
      <ClickAwayListener onClickAway={props.onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '250px',
            backgroundColor: 'background.paper',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: '18px',
            px: '10px',
          }}
        > 

          {props.icon}
      
          <Typography variant="subtitle1" sx={{ color: 'grey.800', mb: '4px' }}>
            {t(props.primaryText)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'secondary.darker', mb: '5px' }}
          >
            {t(props.secondaryText)}
          </Typography>

          {props.btnPrimary}
          {props.btnSecondary}
        </Box>
      </ClickAwayListener>
    </Modal>
  );
};
export default NoticeModal;
