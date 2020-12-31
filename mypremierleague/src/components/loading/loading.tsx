import * as React from 'react';
import "./loading.scss";

const Loading: React.SFC = () => {
    return ( 
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
     );
}
 
export default Loading;