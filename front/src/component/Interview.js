import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
const Interview = (props) => {   
    let [ interviewId, interviewIdUpdate ] = useState([]);  
    const [typeData,insertDB] = useState(0);   
   
    const interviewDataSetting = async () => {                      
                             await axios.post(`/prointerview?type=${props.botable}`, {}) //await axios.get(`/prointerview?type=${props.botable}`) get과 post 약간의 차이가 있다. post는 중구난방이기에 담을 곳을 만들어 준다.
                                        .then(
                                            (result) => {  
                                                try{  
                                                    console.log(result)
                                                    interviewIdUpdate([...result.data]); 
                                                    insertDB(result.data[ result.data.length - 1 ].no);                                                 
                                                }
                                                catch(err){ console.log(err.message) }
                                            }
                                        )
                                        .catch ( e => { console.log(e +'이유로 통신이 불안전함') }
                                        ) 
    } 
    useEffect( () => {  interviewDataSetting(); } , [typeData]  ) 
    //typeData이 값이 변할때 재랜더링해라.
    
    

        return (  
            <div> <h2>{ interviewId.length > 0 ? "사전인터뷰" : "데이터전송중..." }</h2>
             {
                 interviewId.map(( contant, i ) => {
                     return(
                         <li>
                             <h3>{i+1} {contant.subject}</h3><div>{contant.content}</div>
                         </li>
                     )
                 })
             }
            </div>
        );   
}
export default Interview;