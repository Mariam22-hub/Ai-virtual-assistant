import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { apiBaseUrl } from "./constants";

export class ChatPanelProvider {
  static currentPanel: ChatPanelProvider | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];
  
  static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (ChatPanelProvider.currentPanel) {
      ChatPanelProvider.currentPanel.panel.reveal(column);
      ChatPanelProvider.currentPanel._update();
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
        'chat',
        'New Chat',
        targetColumn,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(extensionUri, 'media'),
            vscode.Uri.joinPath(extensionUri, "out/compiled")
          ],
          
        }
      );
      
      panel.iconPath = vscode.Uri.joinPath(extensionUri, 'media', 'speech_balloon.png'),
      ChatPanelProvider.currentPanel = new ChatPanelProvider(panel, extensionUri);
    
  }
  public static kill() {
    ChatPanelProvider.currentPanel?.dispose();
    ChatPanelProvider.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    ChatPanelProvider.currentPanel = new ChatPanelProvider(panel, extensionUri);
  }

  constructor(panel: vscode.WebviewPanel,  extensionUri: vscode.Uri) {
    this.panel = panel;
    this._extensionUri = extensionUri;
    
    // Set the webview's initial html content
    this._update();

    this.panel.onDidDispose(() => this.dispose(), null, []);

  }

  public dispose() {
    ChatPanelProvider.currentPanel = undefined;

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
      switch (message.type) {
        case "newMessage": {
          if (!message.value) {
            return;
          }
          // vscode.window.showInformationMessage(message.value);
          this.handleNewMessage(message.value);
          break;
        }
      }
    });
  }

  private handleNewMessage(text: string) {
    //send it to a server or process internally
    this.sendMessageToServer(text);
}

private async sendMessageToServer(text: string) {
  console.log("Sending message to server:", text);

  const apiEndpoint = ' http://127.0.0.1:3002/newChat';
  const postData = { text: text };

  console.log("Data being sent: ", postData);

  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Window,
      title: "Sending...",
      cancellable: false
    }, async (progress) => {
      console.log("Attempting to fetch from: ", apiEndpoint);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData.text)
      });

      console.log("response: ", response);

      const data = await response.json();
      console.log('Success: ', data.answer);
      this.updateChatInView(data.answer);  // Ensure that your server is sending back a 'message' field in JSON
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    vscode.window.showErrorMessage('Failed to send message')
  }
}


private updateChatInView(message: string) {
  console.log("in the updateChatInView");
  // Send message back to webview to display in the chat
  this.panel.webview.postMessage({ type: 'updateChat', message: message });
}


private _getHtmlForWebview(webview: vscode.Webview) {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(this._extensionUri, "out", "compiled/chat.js")
  );
  const cssUri = webview.asWebviewUri(
    vscode.Uri.joinPath(this._extensionUri, "out", "compiled/chat.css")
  );

  const highlightCssUri = webview.asWebviewUri(
    vscode.Uri.joinPath(this._extensionUri, "media", "highlight/atom-one-dark.css")
  );

  const highlightScriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(this._extensionUri, "media", "highlight/highlight.min.js")
  );

  const iconUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "speech_balloon.png"));

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
      <meta http-equiv="Content-Security-Policy" content="img-src https: data:${webview.cspSource}; style-src 'unsafe-inline' ${
        webview.cspSource
      }; script-src 'nonce-${nonce}';">				
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${styleResetUri}" rel="stylesheet">
      <link href="${styleVSCodeUri}" rel="stylesheet">
      <link href="${cssUri}" rel="stylesheet">
      <link href="${highlightCssUri}" rel="stylesheet">
      <script nonce="${nonce}" src="${highlightScriptUri}"></script>
      <script nonce="${nonce}"> hljs.highlightAll(); </script>
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

