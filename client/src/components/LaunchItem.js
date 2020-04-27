import React from 'react';
import { Link } from 'react-router-dom';

export default function LaunchItem({  
  launch: { flight_number, mission_name, launch_success }
}) {

  return (
    <div className="card card-body my-3 mx-2">
      <div className="row">
        <div className="col-md-7">
          <h4>Mission:  
            <span 
              className={launch_success ? 'text-success' : 'text-danger'}
              title={launch_success ? 'successful' : 'failed'}>
               {' ' + mission_name}
            </span>
          </h4>
        </div>
        <div className="col-md-2 ml-auto">
          <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  )
}
