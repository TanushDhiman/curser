import { useEffect, useState } from "react";
import { headingCheck, replaceHeading } from "../helper";

 const Answers=({ans,totalAnswer,index,type})=>{
   
    const[heading,setheading]=useState(false)
    const[replace,setreplace]=useState(ans)
    // console.log(index);
    
useEffect(()=>{
    if(headingCheck(ans)){
       setheading(true) ;
       setreplace(replaceHeading(ans))
    }
},[])

    return(
        <>
         {
            index==0 && totalAnswer>1?<span className="pt-2 text-lg block dark:text-white text-zinc-800">{replace}</span>:
            heading?<span className="pt-2 text-lg block dark:text-white text-zinc-800">{replace}</span>
         :<span className={type=='q'?'pl-0':'pl-5'}>{replace}</span>
         }
         
        </>
    )
}
export default Answers
