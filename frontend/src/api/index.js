import axios from "axios"

const customAxios = axios.create(
    {
        baseURL: process.env.REACT_APP_BASE_URL
    }
)

// customAxios.interceptors.request.use((config) => {
//     const token = localStorage.getItem(`mindx-img-token`)
//     if (token) {
//         config.headers.auth = token
//     }
//     return config
// }, function (err) {
//     return Promise.reject(err)
// })

export default customAxios