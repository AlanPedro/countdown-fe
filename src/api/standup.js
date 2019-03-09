import axios from 'axios';
import { SERVER_URL } from '../config/constants';

const baseUrl = SERVER_URL;

const getStandupByName = (name) => (
    axios.get(baseUrl + "/standups/" + name)
    .then(res => res.data)
    .catch(err => console.log(err))
)

const getAllStandups = () => (
    axios.get(baseUrl + "/standups")
    .then(res => res.data)
    .catch(err => console.log(err))
)

export default {
    getStandupByName,
    getAllStandups
}