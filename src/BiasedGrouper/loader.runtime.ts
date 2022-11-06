import View from "./View.svelte";

const vscode = acquireVsCodeApi();

const app = new View({
	target: (document.getElementById('app') as HTMLElement)
});


// window.addEventListener("load", main);

// function main() {
// 	const howdyButton = document.getElementById("howdy");
// 	if(howdyButton) howdyButton.addEventListener("click", handleHowdyClick);
// 	else console.warn("Could not set howdyButton ev");
// }

// function handleHowdyClick() {
// 	vscode.postMessage({
// 		command: "hello",
// 		text: "Hey there partner! 🤠",
// 	});
// }
// window.addEventListener('message', event => {

// 	const message = event.data; // The JSON data our extension sent

// 	switch (message.command) {
// 		case 'refactor':
// 			break;
// 	}
// });