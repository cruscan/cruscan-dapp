import React from 'react';
import GlobalAnnounce from '../../components/GlobalAnnounce/GlobalAnnounce';
import SearchBoxOrderStatus from '../../components/SearchBoxOrderStatus/SearchBoxOrderStatus';

export default function Home() {
    return (
        <>
            <GlobalAnnounce />
            <SearchBoxOrderStatus />
        </>
    );
}
