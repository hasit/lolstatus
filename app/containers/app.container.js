import React from 'react';
import Axios from 'axios';

import Header from '../components/header.component';
import ShardSelect from '../components/shardselect.component';
import ServiceList from '../components/servicelist.component';
import Footer from '../components/footer.component';

const appIdentifier = "LoLStatus: ";

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shards: [],
            shard: 'na',
            services: [],
            interval: 0
        }
        this.reqURL = 'http://status.leagueoflegends.com/shards';
    }

    getShards() {
        let _this = this;

        console.log(appIdentifier + 'Getting shards');

        Axios.get(_this.reqURL)
            .then(function (response) {
                _this.setState({
                    shards: response.data
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    getShard(shard) {
        let _this = this;

        console.log(appIdentifier + 'Setting shard ' + shard);
        _this.setState({
            shard: shard
        });

        console.log(appIdentifier + 'Getting shard ' + shard);
        Axios.get(_this.reqURL + '/' + shard)
            .then(function (response) {
                _this.setState({
                    services: response.data.services,
                    interval: 0
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    componentWillMount() {
        console.log(appIdentifier + 'App will mount.');
        this.getShards();
        this.getShard(this.state.shard);
    }

    componentDidMount() {
        console.log(appIdentifier + 'App mounted.');
        
        setInterval(function(){
            console.log(appIdentifier + 'Status refreshed - ' + this.state.interval);
            this.setState({
                interval: this.state.interval + 1 
            });
        }.bind(this), 60000);
    }

    render() {
        return (
            <div className="lolstatus">
                <div className="header">
                    <Header/>
                    <ShardSelect
                        shards={this.state.shards}
                        getShard={this.getShard.bind(this) }/>
                </div>
                <ServiceList
                    key={this.state.interval}
                    services={this.state.services}/>
                <Footer
                    shard={this.state.shard}/>
            </div>
        );
    }
}

export default AppContainer;