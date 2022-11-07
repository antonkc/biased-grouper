<style global>
	vscode-button {
		padding: 2rem;
	}
	vscode-panel-view:not([hidden]) {
		display: block;
	}
</style>

<h1>Hello from Biased Grouper through Svelte!</h1>
<vscode-panels activeid="data-tab">
	<vscode-panel-tab id="data-tab">Data</vscode-panel-tab>
	<vscode-panel-tab id="groups-tab">Groups</vscode-panel-tab>
	<vscode-panel-tab id="results-tab">Results</vscode-panel-tab>
	<vscode-panel-view id="data-view">
		Data
	</vscode-panel-view>
	<vscode-panel-view id="groups-view">
		Groups
	</vscode-panel-view>
	<vscode-panel-view id="results-view">
		<div>
			Results
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<vscode-button id="howdy" on:click={handleHowdyClick}>Howdy!</vscode-button>
	</vscode-panel-view>
</vscode-panels>

<script lang="ts">
	import type { WebviewApi } from "vscode-webview";

	export let vscode: WebviewApi<unknown>;

	function handleHowdyClick() {
		vscode.postMessage({
			command: "hello",
			text: "Hey there partner! 🤠",
		});
	}

	window.addEventListener('message', event => {

		const message = event.data; // The JSON data the extension layer sent

		switch (message.command) {
			case 'refactor':
				break;
		}
	});
</script>