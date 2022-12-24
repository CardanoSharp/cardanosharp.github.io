---
sidebar_position: 4
---

# Create Addresses

Once you have your keys, you will want to generate addresses. There are a few different addresses you may want to create.

Supported Address Types: 
 - Delegation/Base
 - Enterprise
 - Rewards/Stake
 - Deletegation/Base Shared
 - Enterprised Shared

## Delegation/Base Address

This address type is the most common. Since this address type requires the Stake keys along side the External or Internal keys, funds sent to these addresses will automatically contribute to the wallets staking.

```csharp
using CardanoSharp.Wallet;
using CardanoSharp.Wallet.Enums;
using CardanoSharp.Wallet.Models.Keys;
using CardanoSharp.Wallet.Models.Addresses;
using CardanoSharp.Wallet.Extensions.Models;
using CardanoSharp.Wallet.Models.Derivations;

IAccountNodeDerivation accountNode = new MnemonicService()
    .Generate(24)
    .GetMasterNode()
    .Derive(PurposeType.Shelley)
    .Derive(CoinType.Ada)
    .Derive(0);

IIndexNodeDerivation paymentNode = accountNode
    .Derive(RoleType.ExternalChain)
    .Derive(0);
paymentNode.SetPublicKey();

IIndexNodeDerivation stakingNode = accountNode
    .Derive(RoleType.Staking)
    .Derive(0);
stakingNode.SetPublicKey();

Address delegationAddress = new AddressService()
    .GetBaseAddress(
        paymentNode.PublicKey,
        stakingNode.PublicKey,
        NetworkType.Testnet);
Console.WriteLine($"Delegation Address: {delegationAddress.ToString()}");
```

## Enterprise Address

The enterprise address utilizes only the External or Internal keys. Any funds sent here will not be able to be staked.

```csharp
// We are going to utilize the wallet created above

Address enterpriseAddress = new AddressService()
    .GetEnterpriseAddress(
        paymentNode.PublicKey,
        NetworkType.Testnet);
Console.WriteLine($"Enterprise Address: {enterpriseAddress.ToString()}");
```

## Staking Address

The staking address is also known as the reward address. 

```csharp
// Again utilizely the wallet created above

Address stakingAddress = new AddressService()
    .GetRewardAddress(
        stakingNode.PublicKey,
        NetworkType.Testnet);
Console.WriteLine($"Staking/Reward Address: {stakingAddress.ToString()}");
```

## Shared/Script Addresses

Shared/Script Addresses come out of CIP1845 (Multi-signature HD Wallets). These are the type of wallets that can have different rules among a collection of keys in order to spend funds. A good example would be a Treasury.

### Delegation Shared/Script Address

Lets start by creating a simple delegation script address that can be signed by one of two keys.

```csharp
using CardanoSharp.Wallet.Encoding;
using CardanoSharp.Wallet.Utilities;
using CardanoSharp.Wallet.Extensions;
using CardanoSharp.Wallet.Models.Transactions.Scripts;
using CardanoSharp.Wallet.TransactionBuilding;

// Lets setup some wallets
Mnemonic mnemonic1 =
new MnemonicService().Restore("scale fiction sadness render fun system hunt skull awake neither quick uncle grab grid credit");

Mnemonic mnemonic2 =
new MnemonicService().Restore("harsh absorb lazy resist elephant social carry roof remember picture merry enlist regret major practice");

// Derive all the needed keys
// First lets derive all the Payment Keys for both wallets
IIndexNodeDerivation paymentNode1 = mnemonic1.GetMasterNode()
    .Derive(PurposeType.MultiSig)
    .Derive(CoinType.Ada)
    .Derive(0)
    .Derive(RoleType.ExternalChain)
    .Derive(0);
paymentNode1.SetPublicKey();
IIndexNodeDerivation paymentNode2 = mnemonic2.GetMasterNode()
    .Derive(PurposeType.MultiSig)
    .Derive(CoinType.Ada)
    .Derive(0)
    .Derive(RoleType.ExternalChain)
    .Derive(0);
paymentNode2.SetPublicKey();

PublicKey paymentPub1 = paymentNode1.PublicKey;
PublicKey paymentPub2 = paymentNode2.PublicKey;
            
// Next lets derive all the Staking Keys for both wallets
IIndexNodeDerivation stakeNode1 = mnemonic1.GetMasterNode()
    .Derive(PurposeType.MultiSig)
    .Derive(CoinType.Ada)
    .Derive(0)
    .Derive(RoleType.Staking)
    .Derive(0);
stakeNode1.SetPublicKey();
IIndexNodeDerivation stakeNode2 = mnemonic2.GetMasterNode()
    .Derive(PurposeType.MultiSig)
    .Derive(CoinType.Ada)
    .Derive(0)
    .Derive(RoleType.Staking)
    .Derive(0);
stakeNode2.SetPublicKey();

PublicKey stakePub1 = stakeNode1.PublicKey;
PublicKey stakePub2 = stakeNode2.PublicKey;

// Generate payment hashes
byte[] paymentHash1 = HashUtility.Blake2b224(paymentPub1.Key);
byte[] paymentHash2 = HashUtility.Blake2b224(paymentPub2.Key);

// Generate stake hashes
byte[] stakeHash1 = HashUtility.Blake2b224(stakePub1.Key);
byte[] stakeHash2 = HashUtility.Blake2b224(stakePub2.Key);

// Create a Payment Policy Script with a type of Script Any
ScriptAny paymentPolicyScript = ScriptAnyBuilder.Create
    .SetScript(NativeScriptBuilder.Create.SetKeyHash(paymentHash1))
    .SetScript(NativeScriptBuilder.Create.SetKeyHash(paymentHash2))
    .Build();
    byte[] paymentPolicyId = paymentPolicyScript.GetPolicyId();
string bechPaymentPolicyId = Bech32.Encode(paymentPolicyId, "script");
Console.WriteLine($"Payment Policy Id: {bechPaymentPolicyId}");

// Create a Stake Policy Script with a type of Script Any
ScriptAny stakePolicyScript = ScriptAnyBuilder.Create
    .SetScript(NativeScriptBuilder.Create.SetKeyHash(stakeHash1))
    .SetScript(NativeScriptBuilder.Create.SetKeyHash(stakeHash2))
    .Build();
byte[] statkePolicyId = stakePolicyScript.GetPolicyId();
string bechStakePolicyId = Bech32.Encode(statkePolicyId, "script");
Console.WriteLine($"Stake Policy Id: {bechStakePolicyId}");
        
//Generate Address
Address delegationScriptAddress = new AddressService().GetBaseScriptAddress(paymentPolicyScript, stakePolicyScript, NetworkType.Testnet);
Console.WriteLine($"Shared/Script Address: {delegationScriptAddress.ToString()}");
```

### Enterprise Shared/Script Address

Just like a normal enterprise address, we just need to remove the staking piece to generate the address.

```csharp
//Generate Address
Address enterpriseScriptAddress = new AddressService().GetEnterpriseScriptAddress(stakePolicyScript, NetworkType.Testnet);
Console.WriteLine($"Shared/Script Address: {enterpriseScriptAddress.ToString()}");
```