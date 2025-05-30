
import { PmlmIcon } from '#/ui/component/PmlmIcon';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

const MembersShow=({item}:{item:any})=>{

    return(
        <>
          <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',

                my: 1,
                height: 'auto',
                backgroundColor: 'background.lightGray',
                borderRadius: '12px',
                py: 1,
              }}
            >
              <Stack
                sx={{ borderRadius: '50%', mx: 1, backgroundColor: 'red' }}
              >
                {item.image !='' ? item.image :<PmlmIcon src="icon-typeuser-light" />}
              </Stack>
              <Typography sx={{ mx: 1 }} variant="overline">
                {item.name}
              </Typography>
              {'-'}
              <Typography variant="overline" sx={{ mx: 1, color: 'grey' }}>
                {item.rank}
              </Typography>
            </Stack>
        
        </>
    )
}
export default MembersShow