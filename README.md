# FoodScoop Frontend
A React frontend for FoodScoop: A new dining experience

## Build Application

### Dependencies:
- Node.js version ^19.x.x
- npm version ^9.x.x
- Other dependencies highlighted in `package.json`

### Build Script:

Note: make sure to clone this repository with `--recurse-submodules`.

```sh
$ npm i
$ npx ttsc
```

## Run Application
Note: At least on Linux 6.1.8-arch1-1, the environment variable `NODE_OPTIONS` must be `--openssl-legacy-provider` for it to run. This may be true for other operating systems. 
```sh
$ npm start
# Will prompt for device options, or scan QR code
(w)eb # for web
(i)os # for iOS (requires macOS ^13 and Xcode version ^13)
(a)ndroid # for Android (requires Android SDK)
```
