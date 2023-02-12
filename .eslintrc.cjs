module.exports = {
	extends: ["af-typescript"],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	ignorePatterns: [".eslintrc.js"],
}
