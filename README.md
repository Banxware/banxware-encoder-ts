# Banxware Merchant Info Encoder -- steps for tech people

This is an encoder library to build the encrypted merchant information needed to integrate platforms with Banxware loan application.

Please look at the encryption procedure [here](src/index.ts) and at the test endpoint invocation [here](test/index.test.ts).

## Build

while in project root:

```
yarn install && yarn build
```

## Test

while in project root:

```
yarn test
```

# Install the project -- steps for non-tech people

## Install Node.js
```
https://nodejs.org/en/download/
```
## Terminal steps
Open terminal
- in Mac by pressing: (CMD + Space) and write terminal and press enter
- For Windows: Windows button for Windows users and write 'cmd' and press enter
  Copy and paste those commands:

### Install brew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install Git
```
brew install git
```

### Clone the project
```
git clone https://github.com/Banxware/banxware-encoder-ts.git
```

### Install yarn
Check if npm is installed
```
npm
```
navigate to a directory of the project
```
cd banxware-encoder-ts
```
install yarn (You will be prompted to write your password)
```
npm install --save yarn-install
sudo npm install -g yarn
```

Check if yarn is installed
```
yarn
```
Install the modules in the root projects:
```
yarn install && yarn build
```

# Generate the blob (encrypted data received from the tenant)
This step enables us to create data and test different varieties of inputs in a realistic scenario.
With this data we can see what the output of custom input generates.

Ask developers for the updated 'testMerchant.ts' file and make changes in 'index.test.ts' file in the following lines depending on the tenant used:
- for TeleCash:

```
const testTenantPrivateKey = fs
.readFileSync('./resources/tlc-tenant-private-key-1.pem')
.toString()
```

```
const response = await fetch(
'https://panther-services-api-dev.pc-in.net/merchant-integration',
{
headers: {
'Tenant-Code': 'TLC',
},
method: 'PUT',
body: JSON.stringify({ merchantInfo: blob }),
},
)
```
- for Payone:

```
const testTenantPrivateKey = fs
.readFileSync('./resources/pay-tenant-private-key-1.pem')
.toString()
```

```
const response = await fetch(
'https://panther-services-api-dev.pc-in.net/merchant-integration',
{
headers: {
'Tenant-Code': 'PAY',
},
method: 'PUT',
body: JSON.stringify({ merchantInfo: blob }),
},
)
```
# Generate and use the blob

While in project root (the directory of the project):
```
yarn test
```

Add the blob in one of the following links depending on the chosen tenant:
- in dev:
```
https://app-payone-dev.pc-in.net/?merchantInfo=
https://app-telecash-dev.pc-in.net/?merchantInfo=
```
- local:
```
https://localhost-haendlerfinanzierung.pc-in.net:3000/?merchantInfo=
https://localhost-telecash.pc-in.net:3000/?merchantInfo=
```