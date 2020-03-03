import React,{Component}from 'react';
import API from '../../scripts/omdb_api';


class RatingPanel extends Component{

    state = {
        result: ''
    }

    componentDidMount(){
        this.searchRating();
        console.log(result);
    }

    searchRating(){
        API.searchByYear().then(function(res){
            this.setState({result:res.data})
        })
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default RatingPanel;