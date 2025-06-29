import axios from "axios";
import { useEffect } from "react";
import { setPosts } from "../redux/postSlice.js";
import { useDispatch } from "react-redux"


const useGetAllPort = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPort = async () => {
            try {
                const res = await axios.get('/post/all', {withCredentials: true});
                if (res.data.success) {
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllPort();
    }, [ dispatch ]);
}

export default useGetAllPort;