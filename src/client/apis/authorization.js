import axios from 'axios';

export default function  () {
    const url = `../api/authorization/`;
    return axios.get(url).then(response => {
        return {data: response.data, hasData: true};
    }).catch(() => {
        return {message: 'Failed to retrieve data'};
    });
}
