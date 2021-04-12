import TypeSelector from './TypeSelector';
import {useState} from 'react';
import Question from './Question';
import Options from './Options';
import {useHistory} from 'react-router';

const CreateSurvey= ({squestions,setSquestions})=>{

    const history=useHistory();
    const getRandom =()=>{return Math.floor((Math.random()*1000)+1);}
    const defaultOptonsState=[{uid:getRandom(),value:''},{uid:getRandom(),value:''}];
    const [qText,setQtext]=useState('');
    const [qType,setQtype]=useState(0);
    const [options,setOptions]=useState(defaultOptonsState);

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
        if(options.length === 2)
        {
            alert("Error:A select type question should have at least 2 options");
        }
        else
        {
            let updatedOptions=[...options];
            updatedOptions.pop();
            setOptions(updatedOptions);
        }
    }

    const updatedOptionText = (id,text)=> {
        let updatedOptions = [...options];
        let changeIndex = updatedOptions.findIndex(x => x.uid=== id);
        updatedOptions[changeIndex].value=text;
        setOptions(updatedOptions);
    }


    const updateSurveyQuestion = () =>{
        let newSurveyQuestion = [...squestions];
        let newQ={
            qtext:qText,
            qtype:qType,
            options:options
        }
        newSurveyQuestion.push(newQ);
        setSquestions(newSurveyQuestion);
        setQtype(0);
        setQtext('');
        setOptions(defaultOptonsState);
        
    }

    const publish=()=>{
        updateSurveyQuestion();
        history.push('/published');
        
    }

    return(
    <>
        <TypeSelector qtype={qType} setQtype={setQtype }/> 

        {qType !==0 ?

            <>

            <Question onTextUpdate={setQtext}/>
            
                {options.map((opt,key) => (

                    <Options 
                        key={key} 
                        uid={opt.uid}
                        addOptions={addOptions}
                        deleteOptions={deleteOptions}
                        updateText={updatedOptionText}
                    />

                ))}

            
        </> 
            : null}

            <button className="btn btn-primary m-1" onClick={()=>updateSurveyQuestion()}>Add Question</button>
            <button className="btn btn-primary m-1" onClick={()=>publish()}>Publish</button>

     </>
    )
}

export default CreateSurvey;