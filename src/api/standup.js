import axios from 'axios';

const baseUrl = "http://localhost:8081";

const getStandup = (id) => (
    axios.get(baseUrl + "/getStandup/" + id)
    .then(res => res.data)
    .catch(err => console.log(err))
)

export default {
    getStandup
}