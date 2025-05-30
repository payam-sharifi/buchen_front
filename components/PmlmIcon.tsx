'use client';
import 'dayjs/locale/fa';
import { styled } from '@mui/material';

type propsType = {
  src: string;
  color?: string;
  fontSize?: String;
};
export const PmlmIcon = styled(({ ...props }: propsType) => {
  const I = styled('i')(({ theme }) => ({
    height: 'auto',
    display: 'inline-block',
    '&:before,&:after': {
      fontSize: props.fontSize ? props.fontSize : '28px',
      color: props.color,
    },
  }));
  return <I {...props} className={props.src} />;
})(({ theme }) => ({}));
