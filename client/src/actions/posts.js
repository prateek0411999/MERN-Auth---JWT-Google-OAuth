import * as api from '../api';

//actions creators -func that return action

// export const getPosts = () => async(dispatch) => {
//     try{
//         const {data} = await api.fetchPosts();
//         const action = {
//             type: 'FETCH_ALL',
//             payload: data
//         }
//         console.log("!!!@!@!@!@",data)
//         dispatch(action);
//     }
//     catch(error){
//         console.log('error occured',error)
//     }
    
// }
// export const createPost = (post) => async(dispatch) => {
//     try{
//         const {data} = await api.createPost(post);
//         const action = {
//             type: 'CREATE',
//             payload: data
//         }
//         dispatch(action);
//     }
//     catch(error){
//         console.log(error);
//     }
    
// }

export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
  
      dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
  
      dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  export const updatePost =(id,post) =>async(dispatch)=>{
    console.log('!!!!!!!!!!!!!!,',id,post)
    try {
      const{data} = await api.updatePost(id,post);
      dispatch({type:'UPDATE', payload: data});

    } catch (error) {
      console.log(error.message)
    }
  }