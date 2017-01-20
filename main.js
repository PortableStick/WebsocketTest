window.onload = function () {
  var host = location.origin.replace(/^http/, 'ws')
  var ws = new WebSocket(host);
  var messagesList = document.querySelector('#messages');
  var status = document.querySelector('#status');

  ws.onopen = function(data) {
    console.log(data)
    status.innerHTML = data.type;
  }

  ws.onmessage = function(message) {
    messagesList.innerHTML += `<li class=${message.data.replace(/\,\s/, '').toLowerCase()}>${message.data}</li>`;
  }
}