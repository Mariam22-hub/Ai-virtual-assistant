import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorld";
import { SidebarProvider } from "./SidebarProvider";
import { ChatPanelProvider } from "./chatPanelProvider";
import { unitTest } from "./commands/unitTest";
import { authenticate } from "./authenticate";
import { TokenManager } from "./TokenManager";
import { makeCodeSmellCommand } from "./commands/findcodesmell";
import { documentCodeCommand } from "./commands/documentCode";
import { makeExplainCodeCommand } from "./explainPanelProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "O" is now active!');

  TokenManager.globalState = context.globalState;

  const item = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
    100
  );
  item.text = "$(beaker) Authenticate";
  item.show();
  item.command = "O.Authenticate";

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("O-sidebar", sidebarProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("O.helloWorld", () => {
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("O.authenticate", () => {
      authenticate(() =>  context.subscriptions.push());
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("O.unitTest", () => {
      unitTest();
    })
  );

  vscode.commands.registerCommand('O.newChat', () => {
    console.log("Command O.newChat triggered");
    ChatPanelProvider.createOrShow(context.extensionUri);
  });

  vscode.commands.registerCommand('O.explainCode', () => {
    console.log("Command O.explainCode triggered");
    makeExplainCodeCommand(context.extensionUri);
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("O.AskO", () => {
      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active editor");
        return;
      }
      const text = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      if (!text) {
        vscode.window.showInformationMessage("No text selected");
        return;
      }
      vscode.window.showInformationMessage("Text: " + text);

      if (sidebarProvider._view) {
        sidebarProvider._view.webview.postMessage({
          type: "AskO",
          value: text,
        });
      }
    })
  );
   // Register the command
   const disposable = vscode.commands.registerCommand('O.findCodeSmell', makeCodeSmellCommand);
   context.subscriptions.push(disposable);

  context.subscriptions.push(
    vscode.commands.registerCommand("O.documentCode", documentCodeCommand)
  );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("O.documentCode", ()=>{
  //     console.log("O.documentCode truggered")
  //     documentCodeCommand()
  //   })
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("O.findCodeSmell", ()=>{
  //     console.log("O.findCodeSmell truggered")
  //     makeCodeSmellCommand()
  //   })
  // );
}

export function deactivate() {}