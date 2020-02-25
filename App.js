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

  showRepoPage = (nothingInteresting, bDeleteContent) => {
    bDeleteContent && typeof bDeleteContent === "boolean" ? changeTextRepo(repoName) : null;
    changeVisibleRepo(!isAddRepoVisible);
  };

  showUserPage = (nothingInteresting, bDeleteContent) => {
    bDeleteContent && typeof bDeleteContent === "boolean" ? changeTextUsername(userName) : null;
    changeVisibleUser(!isAddUserVisible);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        {!isAddUserVisible && !isAddRepoVisible ? 
          <MainPage showUserPage={showUserPage} showRepoPage={showRepoPage} 
          userName={userName} repoName={repoName}/> :
          null}
        {isAddUserVisible ? 
          <InsertUsername changeTextUsername={changeTextUsername} userName={userName} showMainPage={showUserPage}/> :
          null}
        {isAddRepoVisible ? 
          <InsertGit changeTextRepo={changeTextRepo} repoName={repoName} showMainPage={showRepoPage}/> :
          null}
      </SafeAreaView>
    </>
  );
};

export default App;
