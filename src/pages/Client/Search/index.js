import { memo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.scss";
const Search = () => {
    return (
        <>

            <div className="body">
                <div className="row">
                    <div className="col-2">
                        <input class="form-control bi bi-search" list="datalistOptions" id="exampleDataList" placeholder="Tìm kiếm người dùng "/>
                 
                    </div>

                </div>
            </div>

        </>
    );
};
export default memo(Search);