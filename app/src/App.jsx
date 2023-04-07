// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"
// // import { async } from 'node-couchdb/dist/node-couchdb'

// const API_KEY = "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";

// const systemMessage = {
//   "role": "system",
//   "content": "Explain all concepts like I am 20 years old"
// }

// function App() {
//   const [isTyping, setIsTyping] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I am ChatGPT",
//       sender: "ChatGPT",
      
//     }
//   ])

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       sender: "user",
//       direction: "outgoing"
//     }

//     const newMessages = [...messages, newMessage]; //old + new Messages

//     // Update message State
//     setMessages(newMessages);
    
//     // Set typing to true
//     setIsTyping(true);

//     // Process message to ChatGPT (send it over and see the response)
//     await processMessageToChatGPT(newMessages);
//   } 


//   async function processMessageToChatGPT(chatMessages){
//     // chatMessages {sender: "user" or "ChatGPT", message: "Message Content here"}
//     // apiMessages {role: "user" or "assistant", content: "Message Content here"}
    
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if(messageObject.sender === "ChatGPT"){
//         role = "assistant";
//       } else{
//         role = "user";
//       }
//       return {role: role, content: messageObject.message}
//     });

    

//     const apiRequestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         systemMessage,
//         ...apiMessages //[message1, message2, ..]
//       ]
//     }

//     await fetch("https://api.openai.com/v1/chat/completions", 
//     {
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer " + API_KEY,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(apiRequestBody)
//     }).then((data) => {
//       console.log(data);
//       console.log(data.choices[0].message.content);
//       setMessages(
//         [...chatMessages, {
//           message: data.choices[0].message.content,
//           sender: "ChatGPT"
//         }]
//       );
//       setIsTyping(false);
//     });

//   }

//   return (
//     <div className="App">
//       <div style={{position: "relative", height: "700px", width: "1000px"}}>
//         {/* <h1>Hello</h1> */}
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//               typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is generating response" /> : null}
//             >
//               {messages.map((message, i) => {
//                 return <Message key={i} model={message} />
//               })}
//             </MessageList>
//             <MessageInput placeholder='Type message here' onSend={handleSend}></MessageInput>
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   )
// }

// export default App




















import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "600px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is generating a response" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App