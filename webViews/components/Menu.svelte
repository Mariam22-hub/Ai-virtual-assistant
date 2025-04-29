<script>
  import { onMount } from "svelte";

  export let onCustomCommands;
  let vscode;
  let user = { name: "John Doe", userImg: "https://via.placeholder.com/50" }; // Replace with your actual user data

  onMount(() => {
    vscode = acquireVsCodeApi();
    console.log("VSCode API acquired:", vscode);
  });

  function handleDocumentCode() {
    tsvscode.postMessage({ type: "documentCode" });
  }

  function handleNewChat() {
    console.log("in handle new chat");
    tsvscode.postMessage({ type: "openChatPanel" });
  }

  function handleExplainCode() {
    tsvscode.postMessage({ type: "openExplainPanel" });
  }

  function handleGenerateUnitTests() {
    tsvscode.postMessage({ type: "unitTest" });
  }

  function handleFindCodeSmells() {
    tsvscode.postMessage({ type: "codeSmell" });
  }

  function handleCustomCommands() {
    if (onCustomCommands) {
      onCustomCommands();
    }
  }
</script>

<div class="intro">
  <p>This VS Code extension helps you manage and improve your code effortlessly. Use the options below to get started.</p>
</div>

<div class="options">
  <button class="option" on:click={handleExplainCode}>
    <span class="icon">📝</span>
    <span>Explain Code</span>
  </button>
  <button class="option" on:click={handleDocumentCode}>
    <span class="icon">📄</span>
    <span>Document Code</span>
  </button>
  <button class="option" on:click={handleNewChat} type="button">
    <span class="icon">💬</span>
    <span>New Chat</span>
  </button>
  <button class="option" on:click={handleGenerateUnitTests} type="button">
    <span class="icon">🧪</span>
    <span>Generate Unit Tests</span>
  </button>
  <button class="option" on:click={handleFindCodeSmells} type="button">
    <span class="icon">👃</span>
    <span>Find Code Smells</span>
  </button>
  <button class="option" on:click={handleCustomCommands} type="button">
    <span class="icon">🔧</span>
    <span>Custom Commands</span>
  </button>
</div>

<style>
  .intro {
    text-align: center;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #e6f7ff; /* Light blue background for the intro */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for a more prominent look */
  }

  .intro p {
    font-size: 16px;
    color: #333;
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 35px; /* Adds space between buttons */
    padding: 50px; /* Adds padding around the options container */
    background-color: #f5f5f5; /* Light background color */
    border-radius: 10px; /* Rounded corners for the options container */
  }

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    border: 2px solid #007acc; /* Border color */
    border-radius: 5px;
    background-color: #fff; /* White background for buttons */
    transition: background-color 0.3s, transform 0.3s; /* Smooth transition for hover effects */
  }

  .option:hover {
    background-color: #0f91ce; /* Light blue background on hover */
    transform: scale(1.05); /* Slightly enlarge the button on hover */
  }

  .icon {
    font-size: 40px;
    margin-bottom: 10px;
  }

  .option span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
</style>
