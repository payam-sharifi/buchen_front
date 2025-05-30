'use client';
import { useEffect, useState } from 'react';
import FilterMembers from '#/ui/main/planning/contributers/FilterMembers';
import MemberInFilter from '#/ui/main/planning/contributers/MemberInFilter';
import AddedList from '#/ui/main/planning/contributers/AddedList';
import { useParams } from 'next/navigation';

import SearchHeader from '#/ui/main/planning/contributers/SearchHeader';
import { Container } from '@mui/material';
import { useGetListAttendeesOfASessionQuery } from '#/redux/services/user/planningApi';
export default function Page() {
  const [searchText, setSearchText] = useState('');
  const { lang, id } = useParams();

  const [filterConfig, setFilterConfig] = useState({
    IsResponse: false,
    SematId: '',
    SematTitle: 'همه',
  });




  return (
    <Container maxWidth="md" sx={{ px: '0px' }}>
      <SearchHeader searchText={searchText} setSearchText={setSearchText} />
      {/* <FilterMembers
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
      /> */}

      <AddedList focusedSerch={true} filterConfig={filterConfig}   />
      {/* {membersItems.map((item) => (
        <MemberInFilter item={item} />
      ))} */}
    </Container>
  );
}
