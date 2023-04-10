
import { useState } from 'react'
import './App.css'
import Learning from './components/Learning'
import Qna from './components/Qna'

const topics = [
  "Do you want me to give me an intro to ML?",
  "Do you want to know the steps in Data Training?",
  "Do you want to learn about Data Collection?",
  "Do you want to learn about data preprocessing?",
  "Do you want to know what data training is?",
  "Do you want to learn about Data Evaluation?"
]

function App() {
  

const [showComponent1, setShowComponent1] = useState(false);
const [showComponent2, setShowComponent2] = useState(false);
const [showComponent3, setShowComponent3] = useState(false);
const [showComponent4, setShowComponent4] = useState(false);
const [showComponent5, setShowComponent5] = useState(false);
const [showComponent6, setShowComponent6] = useState(false);


let arr = [];
for(let i=0; i<6; i+=1){
    arr.push(false);
}
let i = 0;

let b1=false, b2=false, b3=false, b4=false, b5=false, b6=false;



let isCorrect = false;

function setIsCorrect(n) {
  isCorrect = Boolean(n);
  return 1;
}

const handleClick1 = () => {
  console.log("Clicking");

  setShowComponent1(true);
  setIsCorrect(0);
}

const handleClick2 = () => {
  console.log("Clicking");

  setShowComponent2(true);
  setIsCorrect(0);

}

const handleClick3 = () => {
  console.log("Clicking");

  setShowComponent3(true);
  setIsCorrect(0);
}

const handleClick4 = () => {
  console.log("Clicking");

  setShowComponent4(true);
  setIsCorrect(0);
}

const handleClick5 = () => {
  console.log("Clicking");

  setShowComponent5(true);
  setIsCorrect(0);
}

const handleClick6 = () => {
  console.log("Clicking");

  setShowComponent6(true);
  setIsCorrect(0);
}



  return (
    <>

       <Learning topic = {topics[0]} />
        {b1 = true}
       {b1 && <button onClick={handleClick1}>Module 1 Test</button>}

       {showComponent1 && setIsCorrect(1) && <Qna topic="What is ML?" />  }
       {isCorrect && <Learning topic = {topics[1]} />}
       {isCorrect = false}
       {b2 = true}
       
       { b2 && <button onClick={handleClick2}>Module 2 Test</button>}
       {showComponent2 && setIsCorrect(1) && <Qna topic="What are the steps in data training?" />}

       
       {isCorrect && <Learning topic = {topics[2]} /> }
       {isCorrect = false}
       {b3 = true}
       {b3 && <button onClick={handleClick3}>Module 3 Test</button>}
       {showComponent3 && setIsCorrect(1) && <Qna topic="What is data collection?" />}

       {isCorrect && <Learning topic = {topics[3]} />}
       {isCorrect = false}
       {b4 = true}
       {b4 && <button onClick={handleClick4}>Module 4 Test</button>}
       {showComponent4 && setIsCorrect(1) && <Qna topic="What is data preprocessing?" />}

       {isCorrect && <Learning topic = {topics[4]} />}
       {isCorrect = false}
       {b5 = true}
       {b5 && <button onClick={handleClick5}>Module 5 Test</button>}
       {showComponent5 && setIsCorrect(1) && <Qna topic="What is data training?" />}

       {isCorrect && <Learning topic = {topics[5]} />}
       {isCorrect = false}
       {b6 = true}
       {b6 && <button onClick={handleClick6}>Module 6 Test</button>}
       {showComponent6 && setIsCorrect(1) && <Qna topic="What is data evaluation?" />}

    </>
    
   
  )
}

export default App;