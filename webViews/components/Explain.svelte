<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  // import 'highlight.js/styles/github.css';

  let explanation = '';
  let explanationHTML: string = '';

  // Function to adjust the height of the textarea based on its content
  function adjustTextareaHeight(textarea: HTMLElement) {
    textarea.style.height = 'auto';
    const maxHeight = window.innerHeight - 50; // Define the maximum height
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }

  // // Function to highlight all code blocks
  function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.explanation pre code');
    codeBlocks.forEach(block => {
      hljs.highlightElement(block as HTMLElement);
    });
  }

  // Setup to receive messages from VS Code extension
  onMount(() => {
    const textarea = document.querySelector('.explanation') as HTMLElement;
    window.addEventListener('message', async event => {
      const { type, message } = event.data;
      if (type === 'updateWindow') {
        explanation = message;

        // Convert Markdown to HTML
        explanationHTML = marked(explanation);
        textarea.innerHTML = explanationHTML;
        
        // Manually highlight code blocks
        highlightCodeBlocks();

        // Adjust textarea height
        adjustTextareaHeight(textarea);
      }
    });
  });
</script>

<main>
  <div class="explanation"></div>
</main>

<style>
  .explanation {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 7px;
    white-space: pre-wrap;
    font-size: 16px;
    overflow-y: auto;
    background: #2d2b2b;
    border: 0px solid #ccc;
    color: #f1f1f1; /* Ensure the text is readable on the dark background */
    /* max-height: 70vh; To ensure it doesn't take up too much vertical space */
  }

  .explanation code {
    background-color: #1e1e1e; /* Dark background for code blocks */
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 90%;
  }

  .explanation pre {
    background-color: #1e1e1e; /* Dark background for preformatted text */
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
  }

  .explanation pre code {
    background: none; /* Remove background for code inside pre to avoid double backgrounds */
    padding: 0; /* Remove padding for code inside pre */
  }

  .explanation::-webkit-scrollbar {
    background-color: #000;
    width: 8px;
    border-radius: 10px;
  }

  .explanation::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  }

  .explanation::-webkit-scrollbar-thumb {
    background-image: -webkit-gradient(linear, left bottom, left top, color-stop(.5, #a520ca), color-stop(1, #2681cc));
    border-radius: 10px;
  }

  .explanation::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .explanation:focus::-webkit-scrollbar-thumb {
    background: #555;
  }
</style>
