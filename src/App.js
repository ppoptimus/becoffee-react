import React from 'react';

import Config from './system.json';

function App() {
  var raw = JSON.stringify({
    url_enpoint: Config.CONFIG1.LINE_MESSAGE_MULTICAST_URL,
    user_id: Config.CONFIG1.LINE_USER_ID,
    message: 'test2',
    originalContentUrl: 'https://www.test.com/',
    previewImageUrl: 'https://www.test.com/',
  });

  var requestOptions = {
    method: 'POST',
    headers: Config.CONFIG1.LINE_MESSAGE_HEADER,
    body: raw,
    redirect: 'follow',
  };

  const postMessage = () => {
    fetch('https://becoffee-node.herokuapp.com/multicast', requestOptions)
      .then((response) => console.log(response.status))
      .catch((error) => console.log('error', error));
  };

  return (
    <div className='App'>
      <button onClick={postMessage}>POST</button>
    </div>
  );
}

export default App;
