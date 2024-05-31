import axios from 'axios';
import toast from 'react-hot-toast';
import {errorToasterStyles} from "../constants/toaster";
const url ='https://backend-vjn4.onrender.com/'
export const getTrains=async () => {
    try {
        const response = await axios.get(url + 'trains');
        if (response.status !== 200) {
            toast.error('No data');
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const getTrainByID=async (id:string|undefined) => {
    try {
        const response = await axios.get(url + 'trains/'+id);
        if (response.status !== 200) {
            toast.error('No data');
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const postTrain=async (name:string,destination:string,time:string) => {
    try {
        const response = await axios.post(url + 'trains',{
            name,destination,time
        });
            return response.data;
    } catch (error) {
            toast.error('Error');
    }
}
export const deleteTrain=async (id:string) => {
    try {
        const response = await axios.delete(url + 'trains/'+id);
        if (response.status !== 200) {
            toast.error('Не вдалося видалити поїзд',errorToasterStyles);
        }
        else{
            window.location.href='/'
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
