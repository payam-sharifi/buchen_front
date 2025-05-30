import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Box, Modal, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type ContactListModalPropsType = {
  onClose: () => void;
  open: boolean;
  icon: ReactNode;
  primaryText: string;
  secondaryText: string;
  actionButtonPrimary: ReactNode;
  actionButtonSecondary?: ReactNode;
};

const CancelSessionModal = (props: ContactListModalPropsType) => {
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
            height: '200px',
            backgroundColor: 'background.paper',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: '18px',
            px: '20px',
          }}
        >
          {props.icon}
          <Typography variant="subtitle1" sx={{ color: 'grey.800', mb: '4px' }}>
            {props.primaryText}
          </Typography>
          <Typography variant="body2" sx={{ color: 'secondary.darker' }}>
            {props.secondaryText}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '20px',

              gap: '8px',
              justifyContent: 'center',
            }}
          >
            {props.actionButtonPrimary}
            {props.actionButtonSecondary ?? props.actionButtonSecondary}
          </Box>
        </Box>
      </ClickAwayListener>
    </Modal>
  );
};
export default CancelSessionModal;
