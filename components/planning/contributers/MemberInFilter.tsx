import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
// felan any hast ta az back data ro begirim
const MemberInFilter = ({ item }: { item: any }) => {
  return (
    <>
      <Grid
        container
        sx={{
          //   display: 'flex',
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          //   alignItems: 'center',
          my: 1,

          height: 'auto',
          backgroundColor: 'Background.main',
          borderBottom:
            '1px solid #EDEDED' /* color should change same as pallete */,

          py: 1,
        }}
      >
        <Grid
          item
          xs={10}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Stack
            sx={{
              borderRadius: '50%',
              mx: 1,
              backgroundColor: 'red',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.image != '' ? (
              item.image
            ) : (
              <PmlmIcon src="icon-typeuser-light" />
            )}
          </Stack>
          <Typography sx={{ mx: 1 }} variant="overline">
            {item.name}
          </Typography>
        </Grid>

        <Grid item xs={2} sx={{ justifyContent: 'end' }}>
          <Typography variant="overline" sx={{ mx: 2, color: 'grey' }}>
            {item.rank}
          </Typography>
        </Grid>

        {item.comment && (
          <Grid container display="flex" sx={{ px: 1, mt: 0.5 }}>
            <Grid
              item
              xs={12}
              sx={{
                px: 1,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                bgcolor: 'action.disabledBackground',
              }}
            >
              <PmlmIcon src={'icon-typeConversation-light'} />
              <Typography variant="overline">{item.comment}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default MemberInFilter;
