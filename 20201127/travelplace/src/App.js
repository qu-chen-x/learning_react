import React,{useState,useEffect} from 'react';
import Loading from './components/Loading';
import Tours from './components/Tours';
        const url = "https://course-api.com/react-tours-project";
        function App() {

          //初始化状态
          const [tours,setTours] = useState([]);
          const [loading,setLoading] = useState(true);

          //请求数据
          const fetchTours = async () => {
            setLoading(true);
            try{
              //获取网络资源
              const response = await fetch(url);
              //调用json()将其转换为json数据
              const tours = await response.json();
              setLoading(false);
              setTours(tours);
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }
          //使用useEffec请求第三方接口数据
          useEffect(() => {
            fetchTours();
          },[])

          //删除卡片
          const removeTour = (id) => {
            const newTours = tours.filter(tour => tour.id !== id);
            setTours(newTours);
          }
          
          //判断加载
          if(loading){
            return (
              <main>
                <Loading/>
              </main>
            )
          }
          //判断目的地信息
          if(tours.length === 0 ){
            return (
              <main>
                <div className = "title">
                  <h2>没有旅游目的地信息</h2>
                  <button className = "btn" onClick = {() => {fetchTours()}}>重新获取</button>
                </div>
              </main>
            )
          }
          return (
            <main>
              <Tours tours = {tours} removeTour = {removeTour}/>
            </main>
          )
        }

        export default App;
