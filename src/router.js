import { Route, Routes } from "react-router-dom";
import Search from "./pages/Client/Search";
import { ROUTERS } from "./routes/route";
import MasterLayout from "./pages/Client/theme/masterLayout";
import Thongbao from "./pages/Client/Thongbao";

const rederClientRouter=()=>{
    const ClientRouter =[
        {
            path: ROUTERS.CLIENT.SEARCH,
            component:<Search/>
        },
        {
            path: ROUTERS.CLIENT.THONGBAO,
            component:<Thongbao/>
        },
       
       
    ]
    return (
        <MasterLayout>

        <Routes>
        {
            ClientRouter.map((item, key) => (
                <Route key={key} path={item.path} element={item.component}/>
                    
               
            ))
        }
        </Routes>
        </MasterLayout>
    )
      
    
}

const RouterCustom =()=>{
return rederClientRouter();
};
export default RouterCustom;