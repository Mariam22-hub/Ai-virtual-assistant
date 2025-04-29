<script lang="ts">
  import { onMount } from 'svelte';
  import { marked, type Token, type Tokens } from 'marked';
  import hljs from 'highlight.js';
  
  let message = '';
  let messages = [];
  let chatbox: HTMLDivElement;
  
  function sendMessage() {
    if (message.trim() !== '') {
      // Retrieve or generate session ID
      let sessionId = localStorage.getItem('chatSessionId');
      if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('chatSessionId', sessionId);
      }

      const msg = { content: message, sender: 'user', sessionId: sessionId, id: Date.now() };
      tsvscode.postMessage({ type: 'newMessage', value: msg });
      messages = [...messages, msg];
      message = '';
      scrollChatToBottom();
    }
  }

  function generateSessionId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  function scrollChatToBottom() {
    setTimeout(() => {
      if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    }, 100);
  }
  
  function renderMessage(content) {
    const renderer = new marked.Renderer();
  
    renderer.code = (code) => {
      const validLanguage = hljs.getLanguage(code.lang) ? code.lang : 'plaintext';
      const highlighted = hljs.highlight(validLanguage, code.raw).value;
      return `<pre><code class="hljs ${validLanguage}">${highlighted}</code></pre>`;
      // const highlighted = hljs.highlightAuto(code.raw).value;
      // return `<pre><code class="hljs">${highlighted}</code></pre>`;    
    };
  
    return marked(content, { renderer });
  }
  
  onMount(() => {
    window.addEventListener('message', event => {
      const { type, message } = event.data;
      if (type === 'updateChat') {
        messages = [...messages, { content: message, sender: 'bot', id: Date.now() }];
        scrollChatToBottom();
      }
    });
  
    tsvscode.postMessage({ type: 'getMessages', value: undefined });
    scrollChatToBottom();
  });
  </script>
  
  <main>
    <h1>Chat with O</h1>
    <div class="chatbox" bind:this={chatbox}>
      {#each messages as msg (msg.id)}
        <div class={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}>
          <p>{@html renderMessage(msg.content)}</p>
        </div>
      {/each}
      {#if messages.length === 0}
        <div class="instructions">
          <div class="logo-wrapper">
            <img src="media/Icon.png" alt="Chat with O Logo" class="chat-logo">
          </div>
          <p>Welcome to your legendary Chat with O!</p>
          <p>Type your message below and hit Enter to send.</p>
          <p>Example queries:</p>
          <ul>
            <li>Write me a function to perform Binary Search</li>
            <li>How to code in Python?</li>
            <li>Help me fix an error.</li>
          </ul>
        </div>
      {/if}
    </div>
    <div class="input-group">
      <input type="text" bind:value={message} on:keyup="{event => event.key === 'Enter' && sendMessage()}" placeholder="Chat with O...">
      <button on:click="{sendMessage}" aria-label="Send message">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  </main>
  
  <style>
    .logo-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  
    .chat-logo {
      max-width: 100px;
      opacity: 0.5;
    }
  
    .instructions {
      padding: 20px;
      margin-top: 60px;
      text-align: center;
      color: white;
      font-size: 20px;
    }
  
    .instructions ul {
      list-style-type: none;
      padding: 0;
    }
  
    .instructions li {
      font-size: 15px;
      margin-bottom: 10px;
    }
  
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      height: 100vh;
      box-sizing: border-box;
      justify-content: space-between;
    }
  
    .chatbox {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 200px;
      margin-bottom: 10px;
      padding: 10px;
      overflow-y: auto;
      flex-grow: 1;
    }
  
    .message {
      max-width: 80%;
      margin: 10px;
      padding: 10px;
      border-radius: 15px;
      color: white;
      word-wrap: break-word;
    }
  
    .sent {
      background-color: #007acc;
      align-self: flex-end;
      border-bottom-right-radius: 2px;
    }
  
    .received {
      background-color: #555;
      align-self: flex-start;
      border-bottom-left-radius: 2px;
    }
  
    .input-group {
      margin-bottom: 20px;
      display: flex;
      width: 100%;
      align-items: center;
    }
  
    input[type="text"], button {
      height: 40px;
      display: flex;
      align-items: center;
    }
  
    input[type="text"] {
      flex-grow: 1;
      padding: 0 10px;
      border: 2px solid #ccc;
      border-right: none;
      border-radius: 4px 0 0 4px;
      margin: 0;
    }
  
    button {
      width: 50px;
      border: 2px solid #ccc;
      border-left: none;
      background-color: #007acc;
      color: white;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      justify-content: center;
    }
  
    button:hover {
      background-color: #005ea6;
    }
  
    button svg {
      fill: white;
      width: 20px;
      height: 20px;
    }
  
    pre {
      background-color: #2d2d2d;
      color: #f8f8f2;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  
    code {
      font-family: 'Source Code Pro', monospace;
      font-size: 1em;
    }
  
    @media (max-width: 600px) {
      .input-group {
        flex-direction: column;
      }
  
      input[type="text"], button {
        width: 100%;
        border-radius: 4px;
      }
  
      button {
        height: 40px;
        border-top: none;
      }
    }
  </style>
  