import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import InsertUsername from './Components/InsertUsername';
import InsertGit from './Components/InsertGitRepoName';
import MainPage from './Components/MainPage';

const App = () => {
  const [repoName, changeTextRepo] = useState("");
  const [userName, changeTextUsername] = useState("");
  const [isAddUserVisible, changeVisibleUser] = useState(false);
  const [isAddRepoVisible, changeVisibleRepo] = useState(false);

  sendMessage = () => {
    fetch("https://pushmore.marc.io/webhook/qnUSj4NmQ2qdfzCPv4jM5ByZ", {
      method: "POST",
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({repoUrl: `github.com/${userName}/${repoName}`, sender: "Carlo Lunetta"}),
    }).then(res => res.text()).then(textRes => {
      if (!(/Error/gmi.test(textRes))) {
        alert("Yes, message has been sent");
      }
    }).catch(err => {
      alert("Ops some error occured, please retry.");
    });
  };

  showRepoPage = () => {
    changeVisibleRepo(!isAddRepoVisible);
  };

  showUserPage = () => {
    changeVisibleUser(!isAddUserVisible);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        {!isAddUserVisible && !isAddRepoVisible ? 
          <MainPage showUserPage={showUserPage} showRepoPage={showRepoPage} 
          userName={userName} repoName={repoName} showMainPage={sendMessage}/> :
          null}
        {isAddUserVisible ? 
          <InsertUsername showMainPage={showUserPage}/> :
          null}
        {isAddRepoVisible ? 
          <InsertGit showMainPage={showRepoPage}/> :
          null}
      </SafeAreaView>
    </>
  );
};

export default App;
