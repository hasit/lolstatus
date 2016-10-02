import React from 'react';

class ShardSelect extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getShard = this.props.getShard;
    }

    handleChange(event) {
        let _this = this;
        _this.getShard(event.target.value);
        
    }

    // TODO: Convert select -> dropdown for better styling options.
    render() {
        var shards = this.props.shards;
        var options = shards.map(function(shard, i){
            return (<option key={i} value={shard.slug}>{shard.name}</option>)
        });

        return(
            <select className="select" onChange={this.handleChange}>
                {options}
            </select>
        );
    }
}

export default ShardSelect;
