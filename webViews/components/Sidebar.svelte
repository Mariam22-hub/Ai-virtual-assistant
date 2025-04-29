<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "../types";
  import Menu from "./Menu.svelte";
  import Loader from "./loader.svelte";

  export let onExplainCode;
  export let onMakeDocumentation;
  export let onNewChat;
  export let onEditCode;
  export let onGenerateUnitTests;
  export let onFindCodeSmells;
  export let onCustomCommands;

  let accessToken = "";
  let loading = true;
  let user: User | null = null;

  onMount(async () => {
    window.addEventListener("message", async (event) => {
      switch (event.data.type) {
        case "token":
          accessToken = event.data.value;
          const response = await fetch(`${apiBaseUrl}/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          user = data.user;
          loading = false;
          break;
      }
    });

    tsvscode.postMessage({ type: "get-token", value: undefined });
  });
</script>

{#if loading}
  <div class="loading">
    <Loader />
    <p class="loading">Loading...</p>
  </div>
{:else if user}
  <div class="user-info">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src={user.userImg}
      alt="User Image"
      style="width: 50px; height: 50px; border-radius: 50%;"
    />
    <h1>{user.name}</h1>
  </div>
  <!-- svelte-ignore missing-declaration -->
  <button
    class="logout-button"
    on:click={() => {
      accessToken = "";
      user = null;
      tsvscode.postMessage({ type: "logout", value: undefined });
    }}>Logout</button
  >

  <div class="menu">
    <Menu
      {onExplainCode}
      {onMakeDocumentation}
      {onNewChat}
      {onGenerateUnitTests}
      {onFindCodeSmells}
      {onCustomCommands}
    />
  </div>
{:else}
<div class="intro">
  <p>Please Log-in to GitHub to keep track of your progress</p>
</div>
  <!-- svelte-ignore missing-declaration -->
  <div class="login-div">
    <button
      class="login-button"
      on:click={() => {
        tsvscode.postMessage({ type: "authenticate", value: undefined });
      }}>
      <svg class="github-icon" viewBox="0 0 16 16" width="24" height="24" fill="white" aria-hidden="true">
        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
      Log In with GitHub
    </button>
  </div>
{/if}

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
  .user-info {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  .user-info img {
    margin-right: 10px;
  }

  .login-div {
    text-align: center;
    margin-top: 40px;
  }

  .logout-button {
    background-color: #007acc;
    color: white;
    border: none;
    padding: 15px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
  }

  .login-button {
    display: flex;
    align-items: center;
    justify-content: center; /* Center the text and icon */
    background-color: #24292e; /* GitHub button background color */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }

  .login-button:hover {
    background-color: #333; /* Darker background on hover */
  }

  .github-icon {
    margin-right: 8px;
  }

  .menu {
    margin-top: 60px;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 40px;
    font-size: 26px;
  }
</style>
