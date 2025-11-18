import axiosInstance from "../AxiosInstance";

const UserAPI = {
    signupUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/users/signup', userData);
            if (response.status === 201) return response.data;
            else throw new Error(response.data);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data);
            } else {
                throw new Error("Server Error");
            }
        }
    },
    loginUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/users/login', userData);
            if (response.status === 201) return response.data;
            else throw new Error(response.data.message);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data);
            } else {
                throw new Error("Server Error");
            }
        }
    }
}

export default UserAPI;
