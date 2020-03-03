import axios from 'axios';

const queryURL1 = "http://www.omdbapi.com/?s=";
const queryURL2 = "http://www.omdbapi.com/?t=";
const queryURL3 = "http://www.omdbapi.com/?y=2020&apikey=af23933c";
const apiKEY = "&apikey=af23933c";

export default {
    searchMovie: function(query){
        return axios.get(queryURL1+query+apiKEY);
    },

    searchByName: function(query){
        return axios.get(queryURL2+query+apiKEY);
    },

    searchByYear: function(){
        return axios.get(queryURL3);
    }
}