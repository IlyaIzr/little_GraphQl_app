import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
  {
    launches {
      flight_number
      mission_name
      launch_success
    }
  }
`;

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error); 
    return <p>Error happend</p>;
  }

  console.log(data.launches);

  return <>
  {
    data.launches.map(launch => (
      <LaunchItem key={launch.flight_number} launch={launch}/>
    ))
  }   
  </>
};

export default Launches; 