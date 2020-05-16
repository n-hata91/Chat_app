App.room = App.cable.subscriptions.create("RoomChannel", {

  // フロントエンドでバックエンドを監視
  connected: function() {
    console.log('connected')
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function (message) {
    // 受け取ったメッセージをフロントに表示
    const messages = document.getElementById('messages')
    message.innerHTML += message
    // Called when there's incoming data on the websocket for this channel
  },

  // フロントエンドからバックエンドへデータを渡す
  speak: function (content) {
    // room_channelのspeakを実行させデータを返す
    return this.perform('speak', {message: content});
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('chat-input')
  const button = document.getElementById('button')
  button.addEventListener('click', function () {
    const content = input.value
    // サーバー側に送る
    App.room.speak(content)
    // 入力フォームの中身を消す
    input.value = ''
  })
});