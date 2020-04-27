import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';


const LAUNCH_QUERY = gql`
query Launch($flight_number: Int!) {
  launch(flight_number: $flight_number) {
    flight_number
    mission_name
    launch_year
    launch_success
    launch_date_local
    rocket {
      rocket_id
      rocket_name
      rocket_type
    }
  }
}
`;

export default function Launch(props) {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: {flight_number}  //__passing an object here! Watch it!
  });
  if(!flight_number) {
    //__String request case
    return(
    <>
    <h3>Oh jeez you can only request flights by it's numbers</h3>    
    <hr />
    <Link to="/" className="btn btn-secondary">
      Back
    </Link>
    </>)
  }

  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error); 
    return <p>Error happend</p>;
  }


  const {
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type }
  } = data.launch;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-info">Mission:</span> {mission_name}
      </h1>
      <h4 className="mb-3 text-info">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Flight Number: {flight_number}
        </li>
        <li className="list-group-item">
          Launch Year: {launch_year}
        </li>
        <li className="list-group-item">
          Launch Successful:{' '}
          <span
            className="text-success"
          >
            {launch_success ? 'Yes' : 'No'}
          </span>
        </li>
      </ul>

      <h4 className="my-3 text-info">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocket_id}</li>
        <li className="list-group-item">
          Rocket Name: {rocket_name}
        </li>
        <li className="list-group-item">
          Rocket Type: {rocket_type}
        </li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  )
}
