'use client';

import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { Grid, Modal, Typography, useTheme, Button, Box } from '@mui/material';
import { useTranslations } from 'next-intl';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  p: 3,
  borderRadius: '8px',
};

const DeleteModalPlanning = ({
  openModal,
  onClose,
  title,
  content,
  action,
  
}: any) => {
  const theme = useTheme();
  const t = useTranslations();




  return (
    <>
      <Modal open={openModal} onClose={onClose}>
        <Box sx={style}>
          <Grid container textAlign="center">
            <Grid item xs={12}>
              <Grid
                sx={{
                  backgroundColor: 'error.lighter',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  borderRadius: '50% ',
                }}
              >
                <PmlmIcon
                  src={'icon-typetrash-can'}
                  color={theme.palette.error.main}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight={'600'} mt={3}>
                {title}
              </Typography>
              <Typography variant="body2" mt={2}>
                {content}
              </Typography>
            </Grid>
            <Grid item xs={6} mt={3}>
              <Button
                onClick={action}
                sx={{
                  backgroundColor: 'error.dark',
                  color: 'common.white',
                  minHeight: '45px',
                  px: 4,
                  fontSize: '14px',
                  fontWeight: '500',
                  '&:hover': { backgroundColor: 'error.dark' },
                }}
              >
                {t('S_Delete')}
              </Button>
            </Grid>
            <Grid item xs={6} mt={3}>
              <Button
                onClick={onClose}
                sx={{
                  minHeight: '45px',
                  px: 4,
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                {t('H_Enseraf')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
export default DeleteModalPlanning;
