import * as vscode from 'vscode';
import { Panel as BiasedGrouperPanel } from './BiasedGrouper/Panel';

export function activate(context: vscode.ExtensionContext) {
	console.log('Biased-grouper extension is now active!');

	let disposables = [
		vscode.commands.registerCommand('biased-grouper.openTab', () => {
			BiasedGrouperPanel.render(context.extensionUri);
		}),
		vscode.commands.registerCommand('biased-grouper.loadThisAsData', () => {
			// not implemented
		}),
		vscode.commands.registerCommand('biased-grouper.loadThisAsGroups', () => {
			// not implemented
		})
	];

	context.subscriptions.push(...disposables);
}
export function deactivate() {
	console.log('Biased-grouper extension was deactivated');
}
