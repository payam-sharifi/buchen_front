'use client';
import { useEffect, useState } from 'react';
import FilterMembers from '@/components/planning/contributers/FilterMembers';
import MemberInFilter from '@/components/planning/contributers/MemberInFilter';
import AddedList from '@/components/planning/contributers/AddedList';
import { useParams } from 'next/navigation';

import SearchHeader from '@/components/planning/contributers/SearchHeader';
import { Container } from '@mui/material';

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
