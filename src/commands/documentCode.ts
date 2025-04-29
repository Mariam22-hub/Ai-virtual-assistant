import * as vscode from 'vscode';
import { OpenAI } from 'openai';

const apiKey='';

const openai = new OpenAI({ apiKey: apiKey });

export const documentCodeCommand = async () => {
    const selectedText = await getSelectedText();
    if (!selectedText) {
        vscode.window.showInformationMessage('No code selected.');
        return;
    }

    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Generating Document...",
        cancellable: false
    }, async (progress) => {
        progress.report({ increment: 0 });
        
        let generatedDocument = await generateDocument(selectedText);
        if (!generatedDocument) {
            vscode.window.showErrorMessage('Failed to generate document.');
            return;
        }

        await replaceCodeWithDocument(generatedDocument);
        await displayReplacedDocument();
    });
};

const getSelectedText = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return null;
    }

    return editor.document.getText(editor.selection);
};

export const generateDocument = async (selectedCode: string) => {
    const systemMessage = `act as a senior software engineer.
    First,You will be provided with a piece of code.
    second,define the programming language of this piece of code.
    third,specify the right comments operator.fourth,generate comments to explain what this code does line by line.
    fifth,return the same piece of code with the generated comments.
    finally,Only respond with code as plain text without code block syntax around it.`;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-2024-05-13',
            messages: [{ role: 'system', content: systemMessage },{role : 'user', content: selectedCode}],
        });
        console.log(response);
        const answer = response.choices.map((out) => out.message.content).join(' ');
        return answer;
    } catch (error) {
        console.log("your api key : ",apiKey);
        console.error('Error in OpenAI API request:', error);
        return null;
    }
};

export const replaceCodeWithDocument = async (documentContent: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return;
    }

    await editor.edit(editBuilder => {
        editBuilder.replace(editor.selection, documentContent);
    });

    vscode.window.showInformationMessage('Document generated successfully.');
};

export const displayReplacedDocument = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return;
    }

    // await editor.document.save();
    vscode.window.showTextDocument(editor.document);
};
