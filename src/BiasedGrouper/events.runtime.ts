const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
	const howdyButton = document.getElementById("howdy");
	if(howdyButton) howdyButton.addEventListener("click", handleHowdyClick);
	else console.warn("Could not set howdyButton ev");
}

function handleHowdyClick() {
	vscode.postMessage({
		command: "hello",
		text: "Hey there partner! 🤠",
	});
}