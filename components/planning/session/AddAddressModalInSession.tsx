'use client';
import {
  FC,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import 'leaflet/dist/leaflet.css';
import {
  Typography,
  Modal,
  IconButton,
  Grid,
  alpha,
  useTheme,
  TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';

import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

import { EditAddressParamsType } from '#/redux/services/customerApi';
import { PrimaryMap } from '#/ui/component/geoMap';
import { LatLngExpression } from 'leaflet';
import { useParams } from 'next/navigation';
import { PmlmIcon } from '#/ui/component/PmlmIcon';

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
  handleOpen: () => void;
  customerAddressId?: string;
  sendAddressData: (location: string, address: string) => void;
  customerAddress?: EditAddressParamsType;
  setSelectedAddress: Dispatch<
    SetStateAction<EditAddressParamsType | undefined>
  >;
};

export const AddAddressModalInSession: FC<PropType> = ({
  open,
  handleOpen,
  customerAddress,
  setSelectedAddress,
  sendAddressData,
}) => {
  const t = useTranslations();
  const theme = useTheme();
  const [position, setPosition] = useState<LatLngExpression>([
    35.700778, 51.338339,
  ]);
  const { lang } = useParams();

  const [textAddress, setTextAddress] = useState<string>('');
  const [address, setNewAddress] = useState<string>(
    'https://www.google.com/maps/@35.7418463,51.4359905,16.39z?entry=ttu',
  );
  const [isUserSelectLocation, setIsUserSelectLocation] = useState(false);
  const [chooseLocationErr, setChooseLocationError] = useState(false);

  useEffect(() => {
    if (open) {
      if (customerAddress?.lat && customerAddress?.long) {
        setPosition([+customerAddress?.lat, +customerAddress?.long]);
        setNewAddress(
          `https://www.google.com/maps/@${customerAddress?.lat},${customerAddress?.long},16.39z?entry=ttu`,
        ),
          setIsUserSelectLocation(false);
      } else {
        setPosition([35.700778, 51.338339]);
        setNewAddress(
          `https://www.google.com/maps/@35.700778,51.338339,16.39z?entry=ttu`,
        );
      }
    }
  }, [open]);

  useEffect(() => {
    setNewAddress(`https://www.google.com/maps/@${position},16.39z?entry=ttu`);
  }, [position]);

  const handleAddress = () => {
    sendAddressData(address, textAddress);
    handleOpen();
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setPosition([35.700778, 51.338339]);
        setNewAddress(
          `https://www.google.com/maps/@35.700778,51.338339,16.39z?entry=ttu`,
        ),
          setIsUserSelectLocation(false);
        setSelectedAddress(undefined);
        // methods.reset(formDefaultValue);
        handleOpen();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid sx={style}>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
          }}
        >
          <Grid
            item
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="h6"
              fontWeight="800"
              sx={{ color: 'grey.800', px: 1 }}
            >
              {t('Choose_location')}
            </Typography>

            <IconButton
              onClick={() => {
                setPosition([35.700778, 51.338339]);
                setNewAddress(
                  `https://www.google.com/maps/@35.700778,51.338339,16.39z?entry=ttu`,
                ),
                  setIsUserSelectLocation(false);
                setSelectedAddress(undefined);
                // methods.reset(formDefaultValue);

                handleOpen();
              }}
              sx={{ px: 1 }}
            >
              <PmlmIcon src={'icon-x-mark'} color={theme.palette.grey[800]} />
            </IconButton>
          </Grid>
          <Grid
            sx={{
              flexGrow: 1,
              mb: 1.5,
              minHeight: '250px',
              bgcolor: alpha(theme.palette.background.default, 0.1),

              '& .leaflet-container': { borderRadius: '0 !important' },
            }}
          >
            <PrimaryMap
              position={position}
              conter={position}
              selectPosition={setPosition}
              setIsUserSelectLocation={setIsUserSelectLocation}
            />
            <Typography variant="body2" mt={2} sx={{ color: 'error.main' }}>
              {chooseLocationErr && t('S_SelectAddressOption')}
            </Typography>
          </Grid>
          <Grid item sx={{ p: 1, pb: 2 }}>
            <Grid container display="flex" alignItems="center">
              <Grid xs={12} item sx={{ px: 0.5, mb: 3 }}>
                <TextField
                  fullWidth
                  onChange={(e) => setTextAddress(e.target.value)}
                  id="address"
                  label={t('ZR_Address_Daghigh_Posti')}
                  variant="outlined"
                />
              </Grid>

              <Grid xs={12} item sx={{ px: 0.5, mb: 1.5 }}>
                <LoadingButton
                  onClick={handleAddress}
                  fullWidth
                  // loading={isLoading}
                  variant="contained"
                  sx={{ py: 1, maxHaight: '40px', fontSize: '14px' }}
                  disabled={
                    35.700778 === (position as number[])[0] ||
                    51.338339 === (position as number[])[1]
                  }
                >
                  {t('S_Save')}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};
