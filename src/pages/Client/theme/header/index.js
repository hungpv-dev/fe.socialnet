import { memo} from "react";

const Header= ({children, ...props}) =>{
    return <div className="shadow p-3 mb-1 bg-body-tertiary rounded">Day la header</div> ;
};
export default memo(Header);