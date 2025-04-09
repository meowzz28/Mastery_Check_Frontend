import * as React from "react";
import ChatComponent from "./components/ChatComponent";
import ChatDropdown from "./components/ChatDropDown";

const App: React.FunctionComponent = () => {
  return (
    <div className="flex max-w-4xl mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <ChatDropdown />
      <div className="w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <ChatComponent />
      </div>
    </div>
  );
};

export default App;
