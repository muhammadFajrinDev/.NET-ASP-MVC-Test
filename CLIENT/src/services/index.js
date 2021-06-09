import Delete from "./delete";
import Post from "./post";
import Get from "./get";
import Put from "./put";

const updateEmployee = (data,id) => Put(`employee/${id}`,false,data)

const postEmployee = (data) => Post('employee',false,data)
const deleteEmployee = (id) => Delete(`employee/${id}`)
const getEmployee = (id) => Get(`employee/${id}`,false)
const getListEmployee = () => Get(`employee/`,false)

const API = {
    getListEmployee,
    getEmployee,
    postEmployee,
    deleteEmployee,
    updateEmployee
}

export default API;

