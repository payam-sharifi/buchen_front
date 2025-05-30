'use client';
import {
  GetSearchInvoice,
  getSearchInvoiceType,
} from '#/redux/services/user/planningApi/planningApi';
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { Grid, Modal, Typography, useTheme, Button, Box } from '@mui/material';
import { useTranslations } from 'next-intl';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', md: '79%' },
  height: '100vh',
  
  overflowY: 'auto', 
  
  bgcolor: 'grey.300',
};

const InvoiceSearchModal = ({
  openModal,
  onClose,
  setValFactorModal,
  InvoiceListData,
}: {
  openModal: boolean;
  onClose: any;
  setValFactorModal: any;
  InvoiceListData?: getSearchInvoiceType;
}) => {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <>
      <Modal open={openModal} onClose={onClose}>
        <Box sx={style}>
          <Grid
            container
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="nowrap"
            sx={{ height: '100%', width: '100%' }}
          >
            <Grid
              sx={{
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid',
                borderColor: theme.palette.grey[200],
                maxHeight: '56px',
                width: '100%',
              }}
            >
              <Typography variant="h6" sx={{ color: theme.palette.grey[800] }}>
                {t('S_Factor')}
              </Typography>
              <Button onClick={onClose} sx={{ p: 0, minWidth: 'auto' }}>
                <PmlmIcon src={'icon-x-mark'} />
              </Button>
            </Grid>
            <Grid
              sx={{
                bgcolor: 'background.paper',
                py: 2,
                mt: 2,
                flexGrow: 1,
                width: '100%',
              }}
            >
              {InvoiceListData?.data.map(
                (item: GetSearchInvoice, index: number) => (
                  <Button
                    key={item.idOrder + index}
                    onClick={() => {
                      setValFactorModal(item);
                      onClose();
                    }}
                    fullWidth
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: theme.palette.grey[200],
                      px: 2,
                      pb: 2,
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'start',
                      alignItems: 'start',
                      '&:hover': { backgroundColor: 'transparent' },
                    }}
                  >
                    <Typography variant="body1" color={'info.main'}>
                      {item.idOrder}
                    </Typography>
                    {/* <Typography variant="body1" mt={1} color={'common.black'}>
                  شامپو ، رژ لب
                </Typography> */}
                  </Button>
                ),
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
export default InvoiceSearchModal;
