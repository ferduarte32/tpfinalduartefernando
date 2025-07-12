import { createContext } from "react";

export const TestContext = createContext()

const TestContextProvider = ({children}) => {
    const value_to_provide = {
        valor_x: 'pepe'
    }
    return (
        <TestContext.Provider
            value={
                value_to_provide
            }
        >
            {children}
        </TestContext.Provider>
    )
}

export default TestContextProvider