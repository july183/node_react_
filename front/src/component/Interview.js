import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
const Interview = (props) => {   
    let [ interviewId, interviewIdUpdate ] = useState([]);  
    const [typeData,insertDB] = useState(0);   
   
    const interviewDataSetting = async () => {                      
                            axios({
                                url : `/prointerview?type=${props.botable}`,
                                method : 'POST'
                            })
                            // 1.await axios.get(`/prointerview?type=${props.botable}`) get과 post 약간의 차이가 있다.
                            // 2. await axios.post(`/prointerview?type=${props.botable}`, {}) post는 중구난방이기에 담을 곳을 만들어 준다.
                                        .then(
                                            (result) => {

                                                // select 전용 
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
            <div> 
                <h2>{ interviewId.length > 0 ? props.titlenm : "데이터전송중..." }</h2>  {/*props.titlenm 이렇게 사용하거나 var titletext = props.titlenm 라고 선언해서 사용하거나 */}
            {
                interviewId.map(( contant, i ) => {
                    return(
                        <li key={contant.no}>
                            <h3>{i+1} {contant.subject_}</h3><div>{contant.content}</div>
                        </li>
                    )
                })
            }
                <section id='formContent'>
                    <h2>면접제안</h2>
                    <div className='container'>
                        <from action='prointerview?type=write' method='post' name='meetSuppose'>
                            <div className='inner'>
                                <dl className='row mx-0'>
                                    <dt className='col-md-3'><label for='subject'>제목</label></dt>
                                    <dd className='col-md-3'>
                                        <input type="text" name='subject' id='subject' />
                                    </dd>
                                    <dt className='col-md-3'><label for='wr_content'>내용</label></dt>
                                    <dd className='col-md-3'>
                                        <textarea rows="5" id='wr_content' name='wr_content'>

                                        </textarea>
                                    </dd>
                                </dl>
                                <input type="submit" className='btn' value="제안하기"/>
                            </div>
                        </from>
                    </div>
                </section>
            </div>
        );   
}
export default Interview;