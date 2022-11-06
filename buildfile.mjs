import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as path from "path";
import glob from "glob";
import { fileURLToPath } from "url";
import { build } from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildArgs = yargs(hideBin(process.argv)).argv || {};
console.log(`starting build with:\n\targs: ${JSON.stringify(buildArgs)}`);

const buildConfig = ((args) => {
	const buildTypes = {
		pro: {
			entryPoints: [path.resolve(__dirname, 'src/extension.ts')],
			outdir: path.resolve(__dirname, 'dist'),
			platform: "node",
			external: [
				"vscode"
			],
			bundle: true,
			minify: true,
			treeShaking: true,
		},
		pack: {
			entryPoints: [path.resolve(__dirname, 'src/extension.ts')],
			outdir: path.resolve(__dirname, 'dist'),
			platform: "node",
			external: [
				"vscode"
			],
			bundle: true,
			metafile: true,
			treeShaking: true,
		},
		debug: {
			entryPoints: [path.resolve(__dirname, 'src/extension.ts')],
			outdir: path.resolve(__dirname, 'dist'),
			platform: "node",
			external: [
				"vscode"
			],
			bundle: true,
			metafile: true,
			watch: true,
			treeShaking: false,
		},
		test: {
			bundle: false,
			entryPoints: [path.resolve(__dirname, "src/test/runTest.ts")],
			outdir: path.resolve(__dirname, "out/test/.js"),
		},
	};

	if(args.build) {
		const buildType = args.build.toLowerCase();
		if(buildTypes[buildType]) {
			return buildTypes[buildType];
		}

		console.warn(`build type [${buildType}] unavailable. Please, choose one of: ${ Object.keys( buildTypes).join(', ')}`);
		process.exit();
	}
	return buildTypes.pro;
})(buildArgs);

let isMainBuildOk = true;
try	{
	let _buildResult = await build(buildConfig);
	console.log(`bundle step completed`);
} catch (ex) {
	isMainBuildOk = false;
	console.error(`there was on bundle step, aborting`, ex);
}


if(isMainBuildOk) {
	const srcPath = path.resolve(__dirname, "src/");
	const distPath = path.resolve(__dirname, "dist/");
	console.log(`searching runtime files in ${srcPath}`)
	const runtimeAccessFiles = [
		...glob.sync(path.resolve(__dirname, "src/**/*.runtime.@(ts|js)").replace(/\\/g,'/')),
		...glob.sync(path.resolve(__dirname, "src/**/*.@(css|scss)").replace(/\\/g,'/')),
	];
	console.log(`runtime files (${runtimeAccessFiles.length}):\n\t${runtimeAccessFiles.join("\n\t")}`);

	for (let i = 0; i < runtimeAccessFiles.length; i++) {
		const filePath = runtimeAccessFiles[i];

		const dir = path.dirname( filePath);
		const name = path.basename( filePath);
		const pathDiff = path.relative(srcPath, dir).replace(/\\/g,'/');
		const finalPath = path.resolve(distPath, pathDiff).replace(/\\/g,'/');
		console.log(`building [${name}] (${i+1} of ${runtimeAccessFiles.length})`);

		let configInstance = JSON.parse(JSON.stringify(buildConfig));

		configInstance.platform = "browser";
		configInstance.entryPoints = [filePath];
		configInstance.outdir = finalPath;
		configInstance.mainFields = ["svelte", "browser", "module", "main"];
		configInstance.plugins = [
			esbuildSvelte({
				compilerOptions: {
					css: true
				},
				preprocess: sveltePreprocess(),
			}),
		];
		//configInstance.logLevel = "verbose";
		//configInstance.outfile = finalPath;

		try {
			let _buildResult = await build(configInstance);
			console.log(`built [${name}]`);
		} catch(ex) {
			console.error(`there was an error on runtime transpilation step`, ex);
		}
	}

	console.log(`build completed`);
}