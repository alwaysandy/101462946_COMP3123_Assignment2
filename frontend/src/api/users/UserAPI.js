import axiosInstance from "../AxiosInstance";
import EmployeeAPI from "../employees/EmployeeAPI";

const UserAPI = {
    signupUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/users/signup', userData);
            if (response.status === 201) return response.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error signing up user: ' + error.message);
        }
    },
    loginUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/users/login', userData);
            if (response.data.status) return response.data.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error logging in user: ' + error.message);
        }
    }
}

export default UserAPI;
