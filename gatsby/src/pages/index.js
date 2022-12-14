import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';


function CurrentlySlicing({slicemasters}) {
  console.log(slicemasters);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now.</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({hotSlices}) {
  console.log(hotSlices);
  return (
    <div>
      <h2 className='center'>
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case today.</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const {hotSlices, slicemasters} = useLatestData();
  
  return (
    <div className='center'>
      <h2>The best Pizza Downtown!</h2>
      <p>Open 11am to 11pm Every Single Day!</p>
      <HomePageGrid> 
        <CurrentlySlicing slicemasters={slicemasters}/>
        <HotSlices hotSlices={hotSlices}/>
      </HomePageGrid>
    </div>
  );
}
