import axios from "axios";

const axiosClient =axios.create({
    baseURL: import.meta.env.VITE_BASE_URL+ "/api",
    headers:{
        'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`
    }
});
const  CreateNewresume = (data) => axiosClient.post("/user-resumes",data);

const GetUserResume=(userEmail)=> axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

const UpdateResumeDetail=(id,data)=> axiosClient.put(`/user-resumes/${id}`,data);

const GetResumeById = (id) => axiosClient.get('/user-resumes/'+id+"?populate=*");

const DeleteResumeById = (id) => axiosClient.delete('/user-resumes/'+id);

export default {
    CreateNewresume
    ,GetUserResume
    ,UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById 
};