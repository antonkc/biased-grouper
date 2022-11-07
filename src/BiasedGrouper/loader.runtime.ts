import type { WebviewApi } from "vscode-webview";

import View from "./View.svelte";

const vscode: WebviewApi<unknown> = acquireVsCodeApi();

const app = new View({
	target: (document.getElementById('app') as HTMLElement),
	props: {
		vscode: vscode
	}
});