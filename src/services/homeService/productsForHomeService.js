import { useQuery } from "@apollo/client";
import {PRODUCTS_FOR_HOME} from '../../config/queryGQLConst/productConstant'
import { createContext } from "react";

export const ProductsForHome = ({children}) => { 
    const {data, loading, error} = useQuery(PRODUCTS_FOR_HOME)
    return <>{children}</>
}