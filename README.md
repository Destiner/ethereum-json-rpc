# Ethereum JSON-RPC

_An interactive reference of the Ethereum node API._

## Shortcuts

- `Command + /`: focus the filter input
- `Up / Down`: navigate between methods (when the filter input is active)
- `Command + Enter`: execute


## Contribution guidelines

To contribute:

1. Fork this repository
2. Create an [issue](https://github.com/Destiner/ethereum-json-rpc/issues) detailing your proposed updates
3. Submit a pull request (PR) from your fork to the main branch of this repository 
> Reference the issue number in the details of your PR

## Build guidelines

To create a local build:

1. Install bun:
`curl -fsSL https://bun.sh/install | bash`
2. Ensure bun is added to PATH:
	2.1 `nano ~/.zshrc`
	2.2 If required, add `export PATH="$HOME/.bun/bin:$PATH"`
	> Verify bun with `bun --help`

Make your updates, then:

3. Run `bun install`
4. Build site locally with `bun run build`
5. Install an HTTP server with `bun add serve`
6. Serve the contents of the /dist folder with `bun run serve dist`
	> Navigate to the localhost URL detailed in your terminal

