import axios from 'axios';

const queryURL ="";
const apiKEY = "";

export default{
    getTrailer: function(query){
        return axios.get(queryURL+query+apiKEY);
    }
}