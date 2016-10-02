import React from 'react';

class IncidentList extends React.Component {
    render() {
        var active = this.props.active;
        var updates = this.props.updates;
        
        var updatelist = updates.map(function (update, i) {
            var date = new Date(update.updated_at);
            var humanUpdatedAt = date.toLocaleString();
            return (
                <div className="update" key={i}>
                    <span className="updated_at">{humanUpdatedAt.toString()}</span>
                    <br/>
                    <span className="content">{update.content}</span>
                </div>
            );
        });

        return (
            <div className="updates">
                {updatelist}
            </div>
        );
    }
}

export default IncidentList;