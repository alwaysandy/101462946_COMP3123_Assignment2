import axiosInstance from '../AxiosInstance';

const EmployeeAPI = {
    fetchEmployees: async() => {
        try {
            const response = await axiosInstance.get('/employees');
            if (response.status === 200) return response.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error fetching employees: ' + error.message);
        }
    },
    fetchEmployeeById: async(employeeId) => {
        try {
            const response = await axiosInstance.get(`/employees/${employeeId}`);
            if (response.status === 200) return response.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error fetching employee: ' + error.message);
        }
    },
    addEmployee: async(employee) => {
        try {
            const response = await axiosInstance.post('/employees', employee);
            if (response.status === 201) return response.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error adding employee: ' + error.message);
        }
    },
    updateEmployee: async(employeeId, employeeData) => {
        try {
            const response = await axiosInstance.put(`/employees/${employeeId}`, employeeData);
            if (response.status === 200) return response.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error updating employee: ' + error.message);
        }
    },
    deleteEmployee: async(employeeId) => {
        try {
            const response = await axiosInstance.delete(`/employees/?eid=${employeeId}`);
            if (response.status === 200) return response.data;
            else throw new Error(response.data.message);
        } catch (error) {
            throw new Error('Error deleting employee: ' + error.message);
        }
    }
}

export default EmployeeAPI;