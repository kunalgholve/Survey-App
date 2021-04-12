import TypeSelector from './TypeSelector';
import {useState} from 'react';
import Question from './Question';
import Options from './Options';
const CreateSurvey= ({squestions})=>{

    const getRandom =()=>{return Math.floor((Math.random()*1000)+1);}
    const [qText,setQtext]=useState('');
    const [qType,setQtype]=useState(0);
    const [options,setOptions]=useState([{uid:getRandom(),value:''},{uid:getRandom(),value:''}]);

    const addOptions=()=>{
        let newOptions={
            uid:getRandom(),
            value:''
        }
        let updatedOptions=[...options];
        updatedOptions.push(newOptions);
        setOptions(updatedOptions);
    }

    const deleteOptions=()=>{
        let updatedOptions=[...options];
        updatedOptions.pop();
        setOptions(updatedOptions);
        
    }

    return(
    <>
        <TypeSelector qtype={qType} setQtype={setQtype }/> 
        {qType !==0? 
        <>
            <Question/>
            { 
                options.map((opt,key)=>{
                    <Options key={key} addOptions={addOptions} deleteOptions={deleteOptions}/>
                })
            }
            <Options/>
        </> 
            : null
        }  
     </>
    )
}

export default CreateSurvey;