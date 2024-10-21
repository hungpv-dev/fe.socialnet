import { CircularProgress } from "@mui/material";

export default function PageLoading  ({fullpage = false}) {
    return (
        <div style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: fullpage ? 'fixed' : 'relative',
            top: 0,
            left: 0,
            zIndex: 9999,
         }}>
            <div className="loading-spinner">{
                <CircularProgress />
            }</div>
        </div>
    );
}
