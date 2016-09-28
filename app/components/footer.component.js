var electron = window.require('electron');
var ipcRenderer = window.require('electron').ipcRenderer;
var remote = electron.remote;
var BrowserWindow = remote.BrowserWindow;

import React from 'react';

class Footer extends React.Component {
    openStream(shard) {
        var url = "http://status.leagueoflegends.com/#" + shard; 
        console.log(url)
        var streamWindow = new BrowserWindow({
            width: 800,
            height: 600,
            show: true,
            webPreferences: {
                nodeIntegration: false
            }
        })
        streamWindow.loadURL(url);

        streamWindow.on('close', function(){
            streamWindow.destroy();
        });
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