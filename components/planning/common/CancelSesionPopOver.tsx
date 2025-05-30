import React, {
    useState,
    FC,
    
    ReactNode,
  } from 'react';
  
  import {
    Popover,
    Typography,
    IconButton,
    Box,
    Stack,
    MenuItem,
  } from '@mui/material';
  
  import { PmlmIcon } from '#/ui/component/PmlmIcon';
  type popOverType = {
    action: () => void;
    title?: string;
    icon?: string | ReactNode;
    show?: boolean;
  };
  interface PropsType {
    userMenuItems: popOverType[];
  }
  
  const CancelSesionPopOver: FC<PropsType> = ({ userMenuItems }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <Box>
        <IconButton aria-describedby={id} color="inherit" onClick={handleClick}>
          <PmlmIcon src="icon-ellipsis-vertical" />
        </IconButton>
  
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Stack
            sx={{
              minWidth: '110px',
              maxHeight: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {userMenuItems
              .filter((i) => i.show)
              .map((item, index) => (
                <MenuItem
                  key={index + 'userMenuItem'}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    height: '36px',
                  }}
                  onClick={() => {
                    handleClose();
                    item.action();
                  }}
                >
                  <Box>{item.icon}</Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                </MenuItem>
              ))}
          </Stack>
        </Popover>
      </Box>
    );
  };
  
  export default CancelSesionPopOver;
  