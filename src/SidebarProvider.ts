import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { apiBaseUrl } from "./constants";
import { TokenManager } from "./TokenManager";
import { authenticate } from "./authenticate";
import { makeCodeSmellCommand } from "./commands/findcodesmell";
import { documentCodeCommand } from "./commands/documentCode";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;
  // private _isVisible: boolean = false;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "authenticate": {
          authenticate(() => {
            webviewView.webview.postMessage({
              type: "token",
              value: TokenManager.getToken(),
            });
          });
          break;
        }
        case "logout":{
          TokenManager.setToken("");
          break;
        }
        case "get-token": {
          webviewView.webview.postMessage({
            type: "token",
            value: TokenManager.getToken(),
          });
          break;
        }
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
        case "openChatPanel": {
          vscode.commands.executeCommand('O.newChat');
        }
        case "documentCode": {
          vscode.commands.executeCommand('O.documentCode');
        }
        case "openExplainPanel": {
          console.log("in openExplainPanel")
          vscode.commands.executeCommand('O.explainCode');
        }
        case "unitTest": {
          vscode.commands.executeCommand('O.unitTest');
        }
        case "codeSmell": {
          vscode.commands.executeCommand('O.findCodeSmell');
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }


  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.js")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content=" img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
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
