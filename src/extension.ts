import * as vscode from 'vscode';
import { Panel as BiasedGrouperPanel } from './BiasedGrouper/Panel';

export function activate(context: vscode.ExtensionContext) {
	console.log('Biased-grouper extension is now active!');

	let disposables = [
		vscode.commands.registerCommand('biased-grouper.openTab', () => {
			BiasedGrouperPanel.render(context.extensionUri);
		}),
		vscode.commands.registerCommand('biased-grouper.loadThisAsData', () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
					let document = editor.document;
					const text = document.getText();

					BiasedGrouperPanel.sendMessageToView({
						command: "adddata",
						value: text
					});
			} else {
				vscode.window.showInformationMessage("You don't seem to have an open editor");
			}
		}),
		vscode.commands.registerCommand('biased-grouper.loadThisAsGroups', () => {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
					let document = editor.document;
					const text = document.getText();

					BiasedGrouperPanel.sendMessageToView({
						command: "addgroups",
						value: text
					});
			} else {
				vscode.window.showInformationMessage("You don't seem to have an open editor");
			}
		})
	];

	context.subscriptions.push(...disposables);
}
export function deactivate() {
	console.log('Biased-grouper extension was deactivated');
}
