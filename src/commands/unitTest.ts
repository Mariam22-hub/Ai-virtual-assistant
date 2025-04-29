import * as vscode from "vscode";
import { OpenAI } from "openai";
import * as path from "path";
import * as fs from "fs";

const apiKey = ""

const openai = new OpenAI({ apiKey: apiKey });

export const unitTest = async () => {
  const selectedText = await getSelectedText();
  if (!selectedText) {
    vscode.window.showInformationMessage("No code selected.");
    return;
  }

  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: "Generating Unit Tests...",
    cancellable: false,
  }, async (progress) => {
    progress.report({ increment: 0 });

    let unitTest = await generateUnitTest(selectedText);
    if (!unitTest) {
      unitTest = "// Failed to generate Unit Test.";
      vscode.window.showErrorMessage("Failed to generate Unit Test");
    } else {
      progress.report({ increment: 100, message: "Unit Tests generated" });
    }

    await createNewTestFile(unitTest);
  });
};

const getSelectedText = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active text editor found.");
    return null;
  }

  return editor.document.getText(editor.selection);
};

export const generateUnitTest = async (selectedCode: string) => {
  const userMessage = `You are an experienced software engineer tasked with creating a comprehensive unit test for the following code snippet.
    Ensure the test covers various edge cases, normal cases,
    and potential error cases.
    Use a popular testing framework appropriate for the language (e.g., unittest for Python, JUnit for Java, etc.). 
    The code snippet is as follows:
    ${selectedCode}

    Requirements for the Unit Test:
    Test Name: Clearly name each test to describe what is being tested.
    Normal Cases: Include tests for typical values.
    Edge Cases: Include tests for boundary conditions and special values.
    Error Cases: Include tests to check for proper error handling for invalid inputs.
    Assertions: Ensure assertions verify that the results are as expected.

    Deliverables:
    A complete unit test script.
    Comments explaining each test case and its importance.
    please return to me only the code for the unit test and nothing else,
    in a proper format that can run in vs code file straight away.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const answer = response.choices.map((out) => out.message.content).join(" ");

    return answer;
  } catch (error) {
    console.error("Error in OpenAI API request:", error);
    return null;
  }
};

export const createNewTestFile = async (unitTestContent: string) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active text editor found.");
    return;
  }

  const currentFilePath = editor.document.uri.fsPath;
  const currentDir = path.dirname(currentFilePath);
  const testFileName = path.join(currentDir, "generated_unit_test.txt");

  try {
    fs.writeFileSync(testFileName, unitTestContent, { encoding: "utf8" });
    const document = await vscode.workspace.openTextDocument(testFileName);
    await vscode.window.showTextDocument(document);
    vscode.window.showInformationMessage("Unit Tests generated and saved to generated_unit_test.txt");
  } catch (error) {
    console.error("Error writing new test file:", error);
    vscode.window.showErrorMessage("Error writing new test file.");
  }
};
