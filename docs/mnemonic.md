---
sidebar_position: 2
---

# Mnemonics

In this section, we're going to review how to:
 - Generate a New Mnemonic
 - Restore a Mnemonic

## Generate a New Mnemonic 

Lets start simple. Here were just going to generate a new mnemonic.

```csharp
using CardanoSharp.Wallet;
using CardanoSharp.Wallet.Words;
using CardanoSharp.Wallet.Enums;
using CardanoSharp.Wallet.Extensions;
using CardanoSharp.Wallet.Models.Keys;

IMnemonicService mnemonicService = new MnemonicService();
Mnemonic mnemonic = mnemonicService.Generate(24);
Console.WriteLine($"Words: {mnemonic.Words}");
Console.WriteLine($"Entropy: {mnemonic.Entropy.ToStringHex()}");
```

## Word Counts

In the first mnemonic example, we generated a 24 word Mnemonic. This is just 1 of 6 different lengths you can generate

Word Counts Available: 9, 12, 15, 18, 21, 24

```csharp
Mnemonic mnemonic9 = mnemonicService.Generate(9);
Console.WriteLine($"9 Words: {mnemonic9.Words}");

Mnemonic mnemonic12 = mnemonicService.Generate(12);
Console.WriteLine($"12 Words: {mnemonic12.Words}");

Mnemonic mnemonic15 = mnemonicService.Generate(15);
Console.WriteLine($"15 Words: {mnemonic15.Words}");

Mnemonic mnemonic18 = mnemonicService.Generate(18);
Console.WriteLine($"18 Words: {mnemonic18.Words}");

Mnemonic mnemonic21 = mnemonicService.Generate(21);
Console.WriteLine($"21 Words: {mnemonic21.Words}");

Mnemonic mnemonic24 = mnemonicService.Generate(24);
Console.WriteLine($"24 Words: {mnemonic24.Words}");
```

## Languages

By default, the mnemonic service will generate mnemonics using the English lanugage. You can override the language using our `WordList` enum. 

Here are the available lanugages: (English, ChineseSimplified, ChineseTraditional, French, Italian, Japanese, Korean, Spanish, Czech, Portuguese, German)

*Please Note: German was translated in house. If an officially supported German version comes available we will add it as German2*

```csharp
Mnemonic mnemonicEnglish = mnemonicService.Generate(12, WordLists.English);
Console.WriteLine($"English Words: {mnemonicEnglish.Words}");

Mnemonic mnemonicChineseSimplified = mnemonicService.Generate(12, WordLists.ChineseSimplified);
Console.WriteLine($"Chinese Simplified Words: {mnemonicChineseSimplified.Words}");

Mnemonic mnemonicChineseTraditional = mnemonicService.Generate(12, WordLists.ChineseTraditional);
Console.WriteLine($"Chinese Traditional Words: {mnemonicChineseTraditional.Words}");

Mnemonic mnemonicFrench = mnemonicService.Generate(12, WordLists.French);
Console.WriteLine($"French Words: {mnemonicFrench.Words}");

Mnemonic mnemonicItalian = mnemonicService.Generate(12, WordLists.Italian);
Console.WriteLine($"Italian Words: {mnemonicItalian.Words}");

Mnemonic mnemonicJapanese = mnemonicService.Generate(12, WordLists.Japanese);
Console.WriteLine($"Japanese Words: {mnemonicJapanese.Words}");

Mnemonic mnemonicKorean = mnemonicService.Generate(12, WordLists.Korean);
Console.WriteLine($"Korean Words: {mnemonicKorean.Words}");

Mnemonic mnemonicSpanish = mnemonicService.Generate(12, WordLists.Spanish);
Console.WriteLine($"Spanish Words: {mnemonicSpanish.Words}");

Mnemonic mnemonicCzech = mnemonicService.Generate(12, WordLists.Czech);
Console.WriteLine($"Czech Words: {mnemonicCzech.Words}");

Mnemonic mnemonicPortuguese = mnemonicService.Generate(12, WordLists.Portuguese);
Console.WriteLine($"Portuguese Words: {mnemonicPortuguese.Words}");

Mnemonic mnemonicGerman = mnemonicService.Generate(12, WordLists.German);
Console.WriteLine($"German Words: {mnemonicGerman.Words}");
```

## Restore a Mnemonic

Now that we have reviewed how to generate a new mnemonic, lets go over how to restore an existing mnemonic.

```csharp
Mnemonic restored = mnemonicService.Restore("episode around subway accuse confirm then disease stuff upgrade select barrel action priority carry silk awesome ability simple pupil frost run isolate behave fringe");
Console.WriteLine($"Words: {restored.Words}");
Console.WriteLine($"Entropy: {restored.Entropy.ToStringHex()}");
```

## Restoring with Different Languages

Again by default, we assume the language is english, but you can restore any mnemonic from the support lanugages listed above.

```csharp
Mnemonic restoredEnglish = mnemonicService.Restore("where require game dumb office police ahead cousin detail orchard toss inject", WordLists.English);
Console.WriteLine($"English Words: {mnemonicEnglish.Words}");
Console.WriteLine($"English Entropy: {mnemonicEnglish.Entropy.ToStringHex()}");

Mnemonic restoredChineseSimplified = mnemonicService.Restore("党 朝 证 拖 吉 杆 雕 厘 艰 忘 邮 吧", WordLists.ChineseSimplified);
Console.WriteLine($"Chinese Simplified Words: {restoredChineseSimplified.Words}");
Console.WriteLine($"Chinese Simplified Entropy: {restoredChineseSimplified.Entropy.ToStringHex()}");

Mnemonic restoredChineseTraditional = mnemonicService.Restore("溶 揭 富 怨 桂 黎 能 鹼 片 少 燃 株", WordLists.ChineseTraditional);
Console.WriteLine($"Chinese Traditional Words: {restoredChineseTraditional.Words}");
Console.WriteLine($"Chinese Traditional Entropy: {restoredChineseTraditional.Entropy.ToStringHex()}");

Mnemonic restoredFrench = mnemonicService.Restore("mandater poirier cravate artériel rigide cavalier coincer estrade crotale explorer menacer journal", WordLists.French);
Console.WriteLine($"French Words: {restoredFrench.Words}");
Console.WriteLine($"French Entropy: {restoredFrench.Entropy.ToStringHex()}");

Mnemonic restoredItalian = mnemonicService.Restore("nanometro intasato pimpante monile bilancia spronato ocra farinoso prudente zampogna statuto pensare", WordLists.Italian);
Console.WriteLine($"Italian Words: {restoredItalian.Words}");
Console.WriteLine($"Italian Entropy: {restoredItalian.Entropy.ToStringHex()}");

Mnemonic restoredJapanese = mnemonicService.Restore("くすりゆび ねんれい うわき ひほう はあく ないせん おじさん てんぷら いやす すもう てんけん ふじみ", WordLists.Japanese);
Console.WriteLine($"Japanese Words: {restoredJapanese.Words}");
Console.WriteLine($"Japanese Entropy: {restoredJapanese.Entropy.ToStringHex()}");

Mnemonic restoredKorean = mnemonicService.Restore("보람 종종 의논 도착 일요일 심리 아저씨 여직원 특별 참조 산길 열매", WordLists.Korean);
Console.WriteLine($"Korean Words: {restoredKorean.Words}");
Console.WriteLine($"Korean Entropy: {restoredKorean.Entropy.ToStringHex()}");

Mnemonic restoredSpanish = mnemonicService.Restore("huida alzar núcleo ola curso triste calor choque mapa hallar frágil cierto", WordLists.Spanish);
Console.WriteLine($"Spanish Words: {restoredSpanish.Words}");
Console.WriteLine($"Spanish Entropy: {restoredSpanish.Entropy.ToStringHex()}");

Mnemonic restoredCzech = mnemonicService.Restore("popisek gramofon krkavec borec odpustit tenor ulita setina praporek golfista svalstvo kometa", WordLists.Czech);
Console.WriteLine($"Czech Words: {restoredCzech.Words}");
Console.WriteLine($"Czech Entropy: {restoredCzech.Entropy.ToStringHex()}");

Mnemonic restoredPortuguese = mnemonicService.Restore("bolo afluente cedilha vigente riacho reinado meteoro proibido admirar xerife feriado vitral", WordLists.Portuguese);
Console.WriteLine($"Portuguese Words: {restoredPortuguese.Words}");
Console.WriteLine($"Portuguese Entropy: {restoredPortuguese.Entropy.ToStringHex()}");

Mnemonic restoredGerman = mnemonicService.Restore("rost korn empfang wetter sperling allianz jung kiste abseits faust urlaub enkel", WordLists.German);
Console.WriteLine($"German Words: {restoredGerman.Words}");
Console.WriteLine($"German Entropy: {restoredGerman.Entropy.ToStringHex()}");
```