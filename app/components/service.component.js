import React from 'react';
import Incidents from './incidents.component'

class Service extends React.Component {
    render() {
        var isOnline = false;
        if (this.props.status === 'online') {
            isOnline = true;
        }

        var incidents = [];
        if (this.props.incidents[0] != null) {
            console.log(incidents[0]);
        }

        return(
            <div className="service">
                <span className="servicename"><i className={isOnline ? "fa fa-circle online" : "fa fa-circle notonline"}></i>{this.props.name}</span>
                <span className=""></span>
            </div>
        );
    }
}

export default Service;