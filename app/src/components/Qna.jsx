import React, { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import {Configuration, OpenAIApi} from "openai";
import Testing from './Testing';

const configuration = new Configuration({
  apiKey: 'Enter API Key',
});

const openai = new OpenAIApi(configuration);

const API_KEY = "Enter API Key";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}


const explanation = [];



const Qna =  (props) => {
    

    let isCorrect = 1;
    const [score, setScore] = useState(0);
    
    console.log("Hello");
    const [messages, setMessages] = useState([
        
        {
          message: props.topic,
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
      const [isTyping, setIsTyping] = useState(false);
    
      const handleSend = async (message) => {
        // runPrompt();
        const newMessage = {
          // message: message + "\n What percentage of the answer is in context to the question: " + props.topic + " Display only the numeric value without % symbol",
          message: message + "\nIs the above answer relevant to the question: " + props.topic,
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
          explanation.push(data.choices[0].message.content)

          if(Number(data.choices[0].message.content) >= 50) {
            console.log("Correct ans");
            
            isCorrect = 1;
          }
          isCorrect && <Testing topic = "lskdjfl" />
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
            
          }]);
          setIsTyping(false);
        });
        console.log("Explanation array: " + explanation);
    }
    

  return [
    (
    <div> 
    
    <div className="chat">
      <div style={{ position:"relative", height: "700px", width: "900px"  }}>
      <script>
        {/* Window.onload = runPrompt(); */}
      </script>
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

    {/* <h1>{props.num}</h1> */}
    
    </div>
    ),isCorrect
            ]
            }

export default Qna