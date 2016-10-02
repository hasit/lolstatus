var open = window.require('open');

import React from 'react';

class Footer extends React.Component {
    openStream(shard) {
        var url = "http://status.leagueoflegends.com/#" + shard; 
        console.log(url)
        open(url);
    }

    render() {
        var shard = this.props.shard;

        return(
            <div className="footer">
                <span>Visit the official <span className="statuslink" onClick={this.openStream.bind(this, shard)}>status page</span> for more information.</span>
            </div>
        );
    }
}

export default Footer;