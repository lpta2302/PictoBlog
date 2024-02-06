import { useEffect, useState } from "react"

export default function usePassParam (rootParam){
    const [param, setParam] = useState(rootParam)

    useEffect(()=>{
        setParam(rootParam)
    },[rootParam])

    return {
        param,
        setParam
    }
}