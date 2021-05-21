import axios from 'axios';
import authHeader from './auth/auth-header';
function Logout() {
    axios.post('http://127.0.0.1/api/auth/logout', authHeader)
        .then(res => {
            console.log(res.data.message);
        }
        ).then(
            localStorage.removeItem('user')
        )
}


export default Logout;
