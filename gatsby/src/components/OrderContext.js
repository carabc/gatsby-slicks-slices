import React, {useState} from 'react';

// Create a order context
const OrderContext = React.createContext();

// Create the provider, lives at a higher level and inject at root
export function OrderProvider({children}) {
    // we need to stick state in here
    const [order, setOrder] = useState([]);

    return <OrderContext.Provider value={[order, setOrder]}>
        {children}
    </OrderContext.Provider>
}

export default OrderContext;
