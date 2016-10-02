import React from 'react';
import IncidentList from './incidentlist.component'

class Service extends React.Component {
    render() {
        var isOnline = false;
        if (this.props.status === 'online') {
            isOnline = true;
        }

        var incidents = this.props.incidents;
        var incidentList = [];
        if (incidents.length != 0) {
            incidentList = incidents.map(function (incident, i) {
                return <IncidentList key={i} active={incident.active} updates={incident.updates} />
            });
        }

        return (
            <div className="service">
                <span className="servicename"><i className={isOnline ? "fa fa-circle online" : "fa fa-circle notonline"}></i>{this.props.name}</span>
                <div className="incidents">
                    {incidentList}
                </div>
            </div>
        );
    }
}

export default Service;