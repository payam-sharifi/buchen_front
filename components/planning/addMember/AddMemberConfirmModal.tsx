'use client';

import { Grid, Modal, Typography, useTheme, Button, Box ,styled} from '@mui/material';
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

const AddMemberConfirmModal = ({
  openModal,
  onClose,
  title,
  idSemat,
  semat_Desc,
  content,
  action,
}: any) => {
  const theme = useTheme();
  const t = useTranslations();
  const RankImage = styled('img')({
    width: '40px',
  });
  return (
    <>
      <Modal open={openModal} onClose={onClose}>
        <Box sx={style}>
          <Grid container textAlign="center">
            <Grid item xs={12}>
              <Grid
                sx={{
                  backgroundColor: theme.palette.grey[200],
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  borderRadius: '50% ',
                }}
              >
                 <RankImage
                  sx={{ mx: 1 }}
                  src={`https://cdn.pmlm.ir/assets/img/rank-logo/${idSemat}.png`}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight={'600'} mt={3}>
                {title} {semat_Desc}
              </Typography>
              <Typography variant="body2" mt={2}>
                {content} 
              </Typography>
            </Grid>
            <Grid item xs={6} mt={3}>
              <Button
                onClick={action}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'common.white',
                  minHeight: '45px',
                  px: 4,
                  fontSize: '14px',
                  fontWeight: '500',
                  '&:hover': { backgroundColor: 'primary.main' },
                }}
              >
                {t('F_Ok')}
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
                  color: theme.palette.grey[600],
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
export default AddMemberConfirmModal;
