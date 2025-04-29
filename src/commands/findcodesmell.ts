import * as vscode from 'vscode'; // Import VSCode API
import { OpenAI } from 'openai'; // Import OpenAI API

const apiKey = ''; // OpenAI API key

const openai = new OpenAI({ apiKey: apiKey }); // Create an OpenAI instance with the API key

export const makeCodeSmellCommand = async () => {
    // Main command function to generate code smell and refactor code
    const selectedText = await getSelectedText(); // Get the selected text in the editor
    if (!selectedText) { // Check if no text is selected
        vscode.window.showInformationMessage('No code selected.'); // Show information message if no text is selected
        return; // Exit the function
    }

    let generatedSmell = await detectAndGenerateCodeSmell(selectedText); // Generate code smell from selected text
    if (!generatedSmell) { // Check if code smell generation failed
        generatedSmell = '// Failed to detect code smell.'; // Set failure message as generated smell
        vscode.window.showErrorMessage('Failed to detect code smell.'); // Show error message
    }

    let refactoredCode = await detectAndRefactorCodeSmell(generatedSmell); // Detect and refactor code smells from generated smell
    if (!refactoredCode) { // Check if code smell detection and refactoring failed
        refactoredCode = '// Failed to detect and refactor code smells.'; // Set failure message as refactored code
        vscode.window.showErrorMessage('Failed to detect and refactor code smells.'); // Show error message
    }

    await displayInSidePanel(generatedSmell, refactoredCode); // Display the generated smell and refactored code in a side panel
};

const getSelectedText = async () => {
    // Function to get the selected text in the editor
    const editor = vscode.window.activeTextEditor; // Get the active text editor
    if (!editor) { // Check if no active editor is found
        vscode.window.showErrorMessage('No active text editor found.'); // Show error message
        return null; // Return null
    }

    return editor.document.getText(editor.selection); // Return the selected text
};

export const detectAndGenerateCodeSmell = async (selectedCode: string) => {
    // Function to detect and generate code smell using OpenAI
    const userMessage = `Please analyze the following code and detect potential code smells. Make sure to:
    - Improve unnecessary complexity.
    - Remove redundant comments.
    - Remove unnecessary variables.
    - Remove used magic numbers without explanation.
    - Remove duplicate code logic.
    - Prevent making functions excessively long.
    - Also make any suggestions fit to improve the quality of code

    Here is the code:
    ${selectedCode}`; // User message to instruct OpenAI on how to introduce code smells

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }); // Call OpenAI API to generate the response

        const answer = response.choices.map((out) => out.message.content).join(' '); // Combine the response messages

        return answer; // Return the generated code smell
    } catch (error) {
        console.error('Error in OpenAI API request:', error); // Log error if API request fails
        return null; // Return null
    }
};

export const detectAndRefactorCodeSmell = async (generatedSmell: string) => {
    // Function to detect and refactor code smells using OpenAI
    const userMessage = `Please detect the code smells in the following code and suggest refactorings to improve it:
    ${generatedSmell}

    Code smells to detect and refactor:
    - Long Method
    - Duplicate Code
    - Comments
    - Unnecessary Variables
    - Complexity
    - Magic Numbers`; // User message to instruct OpenAI on detecting and refactoring code smells

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }); // Call OpenAI API to generate the response

        const answer = response.choices.map((out) => out.message.content).join(' '); // Combine the response messages

        return answer; // Return the refactored code
    } catch (error) {
        console.error('Error in OpenAI API request:', error); // Log error if API request fails
        return null; // Return null
    }
};

export const displayInSidePanel = async (generatedSmell: string, refactoredCode: string) => {
    // Function to display content in a side panel
    const panel = vscode.window.createWebviewPanel(
        'codeSmellAndRefactor', // Identifies the type of the webview. Used internally
        'Detect Code Smells and Refactor Code', // Title of the panel displayed to the user
        vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
    ); // Create a new webview panel

    panel.webview.html = getWebviewContent(generatedSmell, refactoredCode); // Set the HTML content of the webview
};

const getWebviewContent = (generatedSmell: string, refactoredCode: string): string => {
    // Function to get the HTML content for the webview
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Detected Code Smell and Refactored Code</title>
        </head>
        <body>
            <h2>Detected Code Smells</h2>
            <pre>${generatedSmell}</pre> <!-- Display the detected code smell inside a <pre> tag -->
            <h2>Refactored Code suggestions</h2>
            <pre>${refactoredCode}</pre> <!-- Display the refactored code inside a <pre> tag -->
        </body>
        </html>
    `; // Return the HTML content as a string
};
