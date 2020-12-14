        import React,{ createContext, useEffect, useContext, useReducer} from 'react';
        import cartItems from '../data';
        import reducer from '../reducers/reducer';
        const url = "https://course-api.com/react-useReducer-cart-project";
        const AppContext = createContext(); 
        const initialState = {
            loading:false,
            cart:[],
            total:0,
            amount:0
        }

        const AppProvider = (props) => {

        // const [cart, setCart] = useState(cartItems);
        const [state, dispatch] = useReducer(reducer, initialState);

        //实现购物车功能
        //实现清除功能
        const clearCart = () => {
            dispatch({type:'CLEAR_CART'})
        }
        //实现移除功能
        const remove = (id) =>{
            dispatch({type:'REMOVE', payload:id})
        }
        //实现增加功能
        const increase = (id) => {
            dispatch({type:'INCREASE', payload:id})
        }
        //实现减少功能
        const decrease = (id) => {
            dispatch({type:'DECREASE', payload:id})
        }

        //请求数据
        const fetchData = async () => {
            dispatch({type:'LOADING'});
            const response = await fetch(url);
            const cart = await response.json();
            dispatch({type:"DISPLAY_ITEMS", payload:cart})
        }

        //计算商品总价
        useEffect(() => {
            dispatch({type:'GET_TOTALS'})
        }, [state.cart])

        useEffect(() => {
            fetchData();
        },[])

            return (
                <AppContext.Provider value = {{...state, clearCart, remove, increase, decrease}}>
                    {props.children}
                </AppContext.Provider>
            )
        }

        export const useGlobalContext = () => { 
            return  useContext(AppContext)
            }
        export  {AppContext, AppProvider}
