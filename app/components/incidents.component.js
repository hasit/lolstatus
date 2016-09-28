import React from 'react';

class Incidents extends React.Component {
    render() {
        var incidents = this.props.incidents;
        console.log(incidents);
        var incidentList = incidents.map(function(incident, i) {
            return <span className="incident" key={i}/>
        });

        return(
            <div className="incidents">
                
            </div>
        );
    }
}

export default Incidents;