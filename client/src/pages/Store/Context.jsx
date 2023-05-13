import { createContext } from 'react'

const data = {
    id:"45",
    name:"hyifiws"
}

const Context = createContext(data);

const Provider = Context.Provider;
const Consumer = Context.Consumer;


export {Provider,Consumer}
export default Context;