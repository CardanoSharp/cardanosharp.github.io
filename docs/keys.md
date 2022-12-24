---
sidebar_position: 3
---

# Derive and Create Keys

Once you have your Mnemonic generated or restored, we want to turn it into keys. This will help us generate addresses and sign transactions. 

In this section we will cover:
 - Methods to Derive Keys
 - Type of Purposes
 - Key Pairs

## Methods to Derive Keys

There are 3 different ways to derive keys: 
 - String
 - WalletPath
 - FluentApi

These are methods are specific to this library and all result in the same keys being derived.

```cs
using CardanoSharp.Wallet;
using CardanoSharp.Wallet.Models.Keys;
using CardanoSharp.Wallet.Models.Derivations;

// We need a mnemonic to work with
IMnemonicService mnemonicService = new MnemonicService();
Mnemonic mnemonic = mnemonicService.Generate(24);

// We will use this for String and WalletPath
PrivateKey rootKey = mnemonic.GetRootKey();

// we will use this for FluentApi
MasterNodeDerivation rootNode = mnemonic.GetMasterNode();
```

### Deriving Keys via String

This method requires knowledge of the Address Derivation paths. You will need to understand notation for Hardened and Soft Derivation. You will also need to know the different steps in the derivation path.

If you would like to learn more about this subject please refer to the Cardano Developer Portal: https://developers.cardano.org/docs/get-started/technical-concepts/#key-derivation

```cs
using CardanoSharp.Wallet.Extensions;
using CardanoSharp.Wallet.Models.Keys;
using CardanoSharp.Wallet.Extensions.Models;

// This path will give us our Payment Key on index 0
// Note this is also a Shelley style wallet, denoted by the 1852'
string paymentPath = $"m/1852'/1815'/0'/0/0";

// The paymentPrv is Private Key of the specified path.
PrivateKey paymentPrv = rootKey.Derive(paymentPath);
// Get the Public Key from the Private Key
PublicKey paymentPub = paymentPrv.GetPublicKey(false);
Console.WriteLine($"Payment Private Key: {paymentPrv.Key.ToStringHex()}");
Console.WriteLine($"Payment Public Key: {paymentPub.Key.ToStringHex()}");
Console.WriteLine($"Payment Chaincode: {paymentPrv.Chaincode.ToStringHex()}");

// This path will give us our Stake Key on index 0
string stakePath = $"m/1852'/1815'/0'/2/0";
// The stakePrv is Private Key of the specified path
PrivateKey stakePrv = rootKey.Derive(stakePath);
// Get the Public Key from the Stake Private Key
PublicKey stakePub = stakePrv.GetPublicKey(false);
Console.WriteLine($"Stake Private Key: {stakePrv.Key.ToStringHex()}");
Console.WriteLine($"Stake Public Key: {stakePub.Key.ToStringHex()}");
Console.WriteLine($"Stake Chaincode: {stakePrv.Chaincode.ToStringHex()}");
```

### Deriving Keys via WalletPath

`WalletPath` is really good for working with the different parts of the derivation path. You can break out and make decision based on the different pieces.

First we will create a `WalletPath` using a string.

```cs
using CardanoSharp.Wallet.Models;

// were going to utilize the above `paymentPath`
// This represents a full path
var walletPath = new WalletPath(paymentPath);
Console.WriteLine($"Path Purpose: {walletPath.Purpose}");
Console.WriteLine($"Path Coin Type: {walletPath.Coin}");
Console.WriteLine($"Path Account Index: {walletPath.AccountIndex}");
Console.WriteLine($"Path Role Type: {walletPath.Role}");
Console.WriteLine($"Path Address Index: {walletPath.Index}");
Console.WriteLine($"Path Is Valid: {walletPath.IsValid}");
Console.WriteLine($"Path Is Full: {walletPath.IsFull}");
Console.WriteLine($"Path Is Partial: {walletPath.IsPartial}");
Console.WriteLine($"Path Is Root: {walletPath.IsRoot}");
Console.WriteLine($"Path Master Node: {walletPath.MasterNode}");
Console.WriteLine($"Path Raw: {walletPath.ToString()}");
```

#### Create `WalletPath` with Parts

This time instead of using a string, we will pass the parts we want.

```cs
using CardanoSharp.Wallet.Enums;

PurposeType purpose = PurposeType.Shelley;
CoinType coin = CoinType.Ada;
int accountIndex = 0;
RoleType role = RoleType.ExternalChain; 
int addressIndex = 0;

var walletPathParts = new WalletPath(
    purpose,
    coin,
    accountIndex,
    role,
    addressIndex
);
Console.WriteLine($"Path Purpose: {walletPathParts.Purpose}");
Console.WriteLine($"Path Coin Type: {walletPathParts.Coin}");
Console.WriteLine($"Path Account Index: {walletPathParts.AccountIndex}");
Console.WriteLine($"Path Role Type: {walletPathParts.Role}");
Console.WriteLine($"Path Address Index: {walletPathParts.Index}");
Console.WriteLine($"Path Is Valid: {walletPathParts.IsValid}");
Console.WriteLine($"Path Is Full: {walletPathParts.IsFull}");
Console.WriteLine($"Path Is Partial: {walletPathParts.IsPartial}");
Console.WriteLine($"Path Is Root: {walletPathParts.IsRoot}");
Console.WriteLine($"Path Master Node: {walletPathParts.MasterNode}");
Console.WriteLine($"Path Raw: {walletPathParts.ToString()}");
```

### Deriving Keys via FluentApi

FluentApi is probably the easiest way to derive keys.

```cs
IIndexNodeDerivation paymentNode = rootNode
    .Derive(PurposeType.Shelley)
    .Derive(CoinType.Ada)
    .Derive(0) //Account Index
    .Derive(RoleType.ExternalChain)
    .Derive(0); //Address Index

//By default, we only derive the private key
//   this function will generate our public key
paymentNode.SetPublicKey();
Console.WriteLine($"Payment Private Key: {paymentNode.PrivateKey.Key.ToStringHex()}");
Console.WriteLine($"Payment Public Key: {paymentNode.PublicKey.Key.ToStringHex()}");
Console.WriteLine($"Payment Chaincode: {paymentNode.PrivateKey.Chaincode.ToStringHex()}");
```

## Purpose Types

CardanoSharp supports CIP1852 (Shelley), CIP1854 (MultiSig), and CIP1855 (Policy Keys). Using `WalletPath` or FluentApi, you can easily derive these different types.

```cs
// WalletPath
var shelleyWalletPath = new WalletPath($"m/{(int)PurposeType.Shelley}'/1815'/0'");
var multiSigWalletPath = new WalletPath($"m/{(int)PurposeType.MultiSig}'/1815'/0'");
var policyKeysWalletPath = new WalletPath($"m/{(int)PurposeType.PolicyKeys}'/1815'/0'");

// FluentApi
IAccountNodeDerivation shelleyFluent = rootNode
    .Derive(PurposeType.Shelley)
    .Derive(CoinType.Ada)
    .Derive(0);

IAccountNodeDerivation multiSigFluent = rootNode
    .Derive(PurposeType.MultiSig)
    .Derive(CoinType.Ada)
    .Derive(0);

IAccountNodeDerivation policyKeysFluent = rootNode
    .Derive(PurposeType.PolicyKeys)
    .Derive(CoinType.Ada)
    .Derive(0);
```

## Generate a Key Pair

All of our examples have used the Hierarchical Deterministic (BIP39) method for getting key pairs. You also can just generate a single key pair. 

```cs
using CardanoSharp.Wallet.Models.Keys;
using CardanoSharp.Wallet.Extensions;
using CardanoSharp.Wallet.Extensions.Models;

KeyPair keyPair = KeyPair.GenerateKeyPair();
```

Just like HD Key Pairs, you can sign and verify.

```cs
// A simple message to sign
string message = "CardanoSharp is awesome!";
// Convert message to a byte[]
byte[] messageByte = message.HexToByteArray();
Console.WriteLine($"Message String: '{message}'");
Console.WriteLine($"Message Hex: '{messageByte.ToStringHex()}'");

// Sign the message with our KeyPair's Private Key
byte[] signature = keyPair.PrivateKey.Sign(messageByte);
Console.WriteLine($"Message Signature: '{signature.ToStringHex()}'");

// Using the KeyPair's PublicKey, we can verify the Signature 
bool verified = keyPair.PublicKey.Verify(messageByte, signature);
Console.WriteLine($"Can we verify? '{(verified ? "Yes" : "No")}'");
```