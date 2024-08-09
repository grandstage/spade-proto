"use client";
import React, { useEffect, useRef, useState } from "react";
import UserInput from "./user-input";
import Suggestions from "./suggestions";
import ChatError from "../errors/chat-error";
import * as chatTypes from "./chat-types";
import MessageLoader from "./message-loader";
import UserQueryContainer from "./user-query-container";
import ChatStep from "./chat-step";

const SpadeChat = () => {
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const [chatEmpty, setChatEmpty] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [oldSteps, setOldSteps] = useState<Array<chatTypes.ChatStepType>>([]);
  const [steps, setSteps] = useState<Array<chatTypes.ChatStepType>>([]);

  const [followUpContent, setFollowUpContent] = useState<string[]>([]);
  const [errorPresent, setErrorPresent] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [currentChatId, setCurrentChatID] = useState<number | null>(null);

  const [queryList, setQueryList] = useState<Array<string>>([]);
  const [tempSuggestedQueries, setTempSuggestedQueries] = useState<string[]>([])


  const addToQueryList = (query: string) => {
    setQueryList([...queryList, query]);
  }

  const getCleanQueryList = (queryList: string[], steps: chatTypes.ChatStepType[]): string[] => {
    return queryList.filter((queryValue, queryIndex) => {
      return steps.find((stepValue, stepIndex) => {
        return stepValue.content.trim() == queryValue.trim();
      }) === undefined;
    });
  }

  useEffect(() => {
    const id = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
    return () => clearTimeout(id);
  }, [oldSteps]);

  useEffect(() => {
    const newChatOnRender = async () => {
      try {
        const res = await fetch("/api/chat/chats", {
          method: "POST",
        });

        if (res.status === 201) {
          const data = await res.json();
          setCurrentChatID(data.id);
        } else {
          throw new Error("Invalid status code");
        }
      } catch (e: any) {
        setErrorPresent(true);
      }
    };

    newChatOnRender();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentChatId || currentChatId === 0) {
        const res = await fetch(
          `/api/chat/chats/?${new URLSearchParams({
            id: currentChatId.toString(),
          })}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setSteps(data.steps);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [currentChatId]);

  useEffect(() => {
    if (oldSteps.length != steps.length) {
      setOldSteps(steps);
      if (steps.filter((step, index) => step.role === "assistant").length === queryList.length) {
        setIsFetching(false);
      }
    }
  }, [oldSteps, steps, queryList]);

  useEffect(() => {
    console.log(oldSteps);
  }, [oldSteps]);

  // sends user query to backend
  const sendMessage = async (messageToSend: string) => {
    const message = messageToSend || inputValue;

    addToQueryList(message);

    if (message) {
      setChatEmpty(false);
      setIsFetching(true);

      const res = await fetch("/api/chat/add-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentChatId, message: message }),
      });
      setFollowUpContent([
        "Tell me more about AI.",
        "How has AI changed how we work?",
        "How can I use AI in my business?",
      ]);

      setInputValue("");
    }
  };


  return (
    <div className="flex h-screen px-5">
      <div
        className={`flex-grow h-screen flex flex-col ${!chatEmpty ? "gap-5" : "justify-center gap-8"
          } mx-auto max-w-4xl`}
      >
        {errorPresent && (
          <ChatError>
            <h2 className="text-[#eee] text-center font-bold">
              Something went wrong. Please try again.
            </h2>
          </ChatError>
        )}
        {chatEmpty ? (
          <h2 className="text-[#3A3B41] text-center text-2xl lg:text-4xl font-bold">
            What topic do you want to dig into?
            {/* <span className={`${styles.gradientText}`}>gold</span>! */}
          </h2>
        ) : (
          <div className="flex flex-col pb-56 pt-14 md:pt-5">
            {steps?.map((step, index) => (
              <ChatStep
                key={step.id}
                step={step}
                setInputValue={setInputValue}
              />
            ))}
            {getCleanQueryList(queryList, steps).map((query, index) => <UserQueryContainer key={index} message={query} setInputValue={setInputValue}/>)}
            {isFetching && <MessageLoader />}

          </div>
        )}
        <div
          className={`flex flex-col px-5 ${!chatEmpty
              ? "fixed max-w-4xl z-[50] bottom-0 w-full bg-white pb-8 translate-x-[-50%] left-[50%] md:left-auto md:translate-x-0"
              : ""
            }`}
        >

          {(chatEmpty  && tempSuggestedQueries.length > 0)&&  (
            <Suggestions
              content={tempSuggestedQueries}
              sendMessage={sendMessage}
            />
          )}

          <UserInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            sendMessage={sendMessage}
          />
        </div>

        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default SpadeChat;
