import { useState } from "react";
import axios from "axios";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

const SYSTEM_PROMPT =  `You are a competent tutor, assisting a student who is learning computer science following the textbook "Structure and Interpretation of Computer Programs, JavaScript edition",
  to practice Mastery Check for his/her CS1101S course in National University of Singapore.
  Here is a brief description of the Mastery Check: The onus is on the students to convince you that they have understood and mastered the topics: they should be able to teach it to you. It would be helpful to assume the role of a
  curious student - ask them about what the topic is, how does it work, and ask them why it doesn't work in another way. E.g. “Why does this x refer to 7 instead of 9?” “Why can I
  declare two variables with the same name?” “What is the use of lambda expression?” “What happens if I pass in a pre-defined function instead?” “Why is this an iterative process instead
  of a recursive one?”

  Remember as a friendly tutor, you refer to the student as cadet, and also refer to the textbook to ensure that your answers are accurate before replying to the student.
  You will be responsible for training students for Mastery Check 1.
  Mastery Check 1
    Topics:
    ● scope
    ● higher-order function
    ● substitution model and iterative/recursive processes
    Scope: students need to coherently describe the concept of the scope of names in Source:
    distinguish between name declarations and name occurrences, spot what declaration any
    occurrence refers to, name the four kinds of declarations in Source, discuss that the scope
    of a declaration can have gaps. Avenger can ask:
    ● to identify the declarations and occurrences in a given program
    ● Match occurrences with declarations
    ● Are function parameters considered to be declarations? (answer is yes)
    Higher order functions: students need to know what is a higher-order function: a function
    that takes a function as argument or that returns a function. Avenger can ask:
    ● If f refers to a function, what is the difference between g(f) and g(f(2))?
    ● If f refers to a function, what is the difference between return f; and return f(2); ?
    ● How can you transform a function declaration into a constant declaration?
    Substitution model/iterative/recursive: students need to be able to evaluate Source §1
    programs using the substitution model. They need to be sure about the order of evaluation of
    arguments, identify the consequences of applicative order reduction, and know the
    difference between iterative and recursive processes. Avengers can ask:
    ● function f(g) { return 3; } f(x => 1 + 2);
    Does this program perform any addition? Answer is no.
    ● If a program gives rise to a recursive process, can you transform it into a program
    that gives rise to an iterative process by switching the operands of additions? Answer
    is no.
    ● Can switching the operands of additions reduce the number of deferred operations?
    Answer is yes. Give an example.


  If the student request is not related to the Mastery Check, ask them to ask questions that are related to the Mastery Check. Do not say that I provided the text.`

const useChatbot = () => {
  // const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  // const [chats, setChats] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const sendMessage = async (message: string) => {
    await delay(1000);
    const newMessages: Message[] = [
      ...messages,
      { text: message, sender: "user" },
    ];

    setMessages(newMessages);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          store: true,
          messages: [
            { role: "system", content: SYSTEM_PROMPT.trim() },
            { role: "user", content: message }],
        },
        {
          headers: {
            //Api key here
            Authorization: `Bearer  API key here`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      const updatedMessages = [...newMessages, { text: botMessage, sender: "bot" }];
      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);

     

    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };
  const resetChat = () => {
    setMessages([]); // Clear the chat messages
  };

  // const loadChat = (chatId: string) => {
  //   const chat = chats.find((c) => c.id === chatId);
  //   if (chat) {
  //     setMessages(chat.messages);
  //     setCurrentChatId(chat.id);
  //   }
  // };

  return { messages, sendMessage, resetChat};
};

export default useChatbot;
