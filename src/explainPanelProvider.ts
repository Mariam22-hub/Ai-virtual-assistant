import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { apiBaseUrl } from "./constants";

export class ExplainPanelProvider {
  static currentPanel: ExplainPanelProvider | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  
  static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (ExplainPanelProvider.currentPanel) {
      ExplainPanelProvider.currentPanel.panel.reveal(column);
      ExplainPanelProvider.currentPanel._update();
      return;
    }

    let targetColumn: vscode.ViewColumn;
    if (column === vscode.ViewColumn.One) {
      targetColumn = vscode.ViewColumn.Two;
    } else if (column === vscode.ViewColumn.Two) {
      targetColumn = vscode.ViewColumn.One;
    } else {
      targetColumn = vscode.ViewColumn.Beside;
    }

    const panel = vscode.window.createWebviewPanel(
      'explain',
      'Explain Code',

      targetColumn,
      {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(extensionUri, 'media'),
            vscode.Uri.joinPath(extensionUri, "out/compiled")
          ],
          
      }
    );

    panel.iconPath = vscode.Uri.joinPath(extensionUri, 'media', 'notebook.png');
    ExplainPanelProvider.currentPanel = new ExplainPanelProvider(panel, extensionUri);
  }

  public static kill() {
    ExplainPanelProvider.currentPanel?.dispose();
    ExplainPanelProvider.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    ExplainPanelProvider.currentPanel = new ExplainPanelProvider(panel, extensionUri);
  }

  constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.panel = panel;
    this._extensionUri = extensionUri;
    
    // Set the webview's initial html content
    this._update();

    this.panel.onDidDispose(() => this.dispose(), null, []);
  }

  public dispose() {
    ExplainPanelProvider.currentPanel = undefined;

    // Clean up our resources
    this.panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this.panel.webview;

    this.panel.webview.html = this._getHtmlForWebview(webview);
    
    webview.onDidReceiveMessage(async (message) => {
      try {
        switch (message.type) {
          case "newMessage": {
            if (!message.value) {
              return;
            }
            this.handleNewMessage(message.value);
            break;
          }
        }
      } catch (error) {
        console.error("Error handling message:", error);
        vscode.window.showErrorMessage('Error handling message');
      }
    });
  }

  public handleNewMessage(text: string) {
    this.sendMessageToServer(text);
  }

  private async sendMessageToServer(text: string) {
    console.log("Sending message to server:", text);

    const apiEndpoint = 'http://127.0.0.1:3002/explainCode';
    const postData = { content: text };

    console.log("Data being sent: ", postData);

    try {
      await vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: "Generating...",
        cancellable: false
      }, async (progress) => {
        console.log("Attempting to fetch from: ", apiEndpoint);

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        });

        console.log("response: ", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success: ', data.answer);
        this.updateExplainInView(data.answer);
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      vscode.window.showErrorMessage('Failed to send message');
    }
  }

  private updateExplainInView(message: string) {
    // Send message back to webview to display in the chat
    this.panel.webview.postMessage({ type: 'updateWindow', message: message });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/explainCode.js")
    );
    const cssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/explainCode.css")
    );
    
    const highlightCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "atom-one-dark.css")
    );

    const highlightScriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "highlight.min.js")
    );

    const iconUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "notebook.png"));

    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <link rel="icon" href="${iconUri}" type="image/png" />
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https: data: ${webview.cspSource}; style-src 'self' ${webview.cspSource}; script-src 'self' 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleResetUri}" rel="stylesheet">
        <link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${cssUri}" rel="stylesheet">
        <link href="${highlightCssUri}" rel="stylesheet">
        <script nonce="${nonce}">
          hljs.highlightAll();
        </script>
        <script nonce="${nonce}" src="${highlightScriptUri}"></script>
        <script nonce="${nonce}">
            const tsvscode = acquireVsCodeApi();
            const apiBaseUrl = ${JSON.stringify(apiBaseUrl)};
        </script>
      </head>
      <body>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`;
  }
}

export const makeExplainCodeCommand = async (extensionUri: vscode.Uri) => {
  const selectedText = await getSelectedText();
  if (!selectedText) {
      vscode.window.showInformationMessage('No code selected.');
      return;
  }

  ExplainPanelProvider.createOrShow(extensionUri);

  // Automatically send the selected code to the server for explanation
  ExplainPanelProvider.currentPanel?.handleNewMessage(selectedText);
};

const getSelectedText = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
      vscode.window.showErrorMessage('No active text editor found.');
      return null;
  }

  return editor.document.getText(editor.selection);
};

export const generateExplanation = (selectedCode: string) => {
  return `Explanation for the selected code: ${selectedCode}`;
};
