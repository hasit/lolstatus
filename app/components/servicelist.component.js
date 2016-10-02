import React from 'react';

import Service from './service.component';

class ServiceList extends React.Component {
    render() {
        var services = this.props.services;

        var serviceList = services.map(function (service, i) {
            return <Service key={i} name={service.name} status={service.status} incidents={service.incidents}/>
        })

        return (
            <div className="servicelist">
                {serviceList}
            </div>
        );
    }
}

export default ServiceList;