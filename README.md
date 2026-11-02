# Ethereum JSON-RPC

_An interactive reference of the Ethereum node API._

## Shortcuts

- `Command + /`: focus the filter input
- `Up / Down`: navigate between methods (when the filter input is active)
- `Command + Enter`: execute


## Example: read token decimals

An [`eth_call`](https://ethereum-json-rpc.com/?method=eth_call) can read an ERC-20 contract without submitting a transaction. [Tokenform's Apple xStock record](https://tokenform.sh/stocks/instruments/apple-xstock) identifies AAPLx's Ethereum deployment (`eip155:1`) as `0x9d275685dc284c8eb1c79f6aba7a63dc75ec890a`. Send this request to an Ethereum mainnet JSON-RPC endpoint to call `decimals()` (`0x313ce567`):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_call",
  "params": [
    {
      "to": "0x9d275685dc284c8eb1c79f6aba7a63dc75ec890a",
      "data": "0x313ce567"
    },
    "latest"
  ]
}
```

Decode the returned ABI word as an unsigned integer. Tokenform records 18 decimals from an earlier observation at Ethereum block 26313083; that is not a live result for this example. A successful call does not establish the token's issuer, backing or redemption rights.

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

---

Made by [Destiner](https://destiner.io).

