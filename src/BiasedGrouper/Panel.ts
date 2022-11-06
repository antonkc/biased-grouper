import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";

export class Panel {
	public static currentPanel: Panel | null = null;
	private readonly _panel: vscode.WebviewPanel;
	private _disposables: vscode.Disposable[] = [];

	private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
		const toolkitUri = getUri(webview, extensionUri, [
			"node_modules",
			"@vscode",
			"webview-ui-toolkit",
			"dist",
			"toolkit.min.js",
		]);
		const eventsUri = getUri(webview, extensionUri, ["dist", "BiasedGrouper", "events.runtime.js"]);
		const cssUri = getUri(webview, extensionUri, ["dist", "BiasedGrouper", "Panel.css"]);
		// Tip: Install the es6-string-html VS Code extension to enable code highlighting below
		return /*html*/ `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<!-- <meta http-equiv="Content-Security-Policy"> -->
					<!-- <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https:; script-src ${webview.cspSource}; style-src ${webview.cspSource};"/> -->
					<script type="module" src="${toolkitUri}"></script>
					<script type="module" src="${eventsUri}"></script>
					<title>Hello from Biased Grouper!</title>
					<link rel="stylesheet" href="${cssUri}">
				</head>
				<body>
					<h1>Hello from Biased Grouper!</h1>
					<vscode-button id="howdy">Howdy!</vscode-button>
				</body>
			</html>
		`;
	}

	private _setWebviewMessageListener(webview: vscode.Webview) {
		webview.onDidReceiveMessage(
			(message: any) => {
				const command = message.command;
				const text = message.text;
				console.log("received message", message);

				switch (command) {
					case "hello":
						vscode.window.showInformationMessage(text);
						return;
				}
			},
			undefined,
			this._disposables
		);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._panel.onDidDispose(this.dispose, null, this._disposables);
		this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
		this._setWebviewMessageListener(this._panel.webview);
	}

	public static render(extensionUri: vscode.Uri) {
		if (Panel.currentPanel) {
			Panel.currentPanel._panel.reveal(vscode.ViewColumn.Active);
		} else {
			const panel = vscode.window.createWebviewPanel("biased-grouper", "Biased Grouper", vscode.ViewColumn.Active, {
				"enableScripts": true
			});

			Panel.currentPanel = new Panel(panel, extensionUri);
		}
	}

	public dispose() {
		Panel.currentPanel = null;

		this._panel.dispose();

		while (this._disposables.length) {
			const disposable = this._disposables.pop();
			if (disposable) {
				disposable.dispose();
			}
		}
	}
}