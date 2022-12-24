import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    description: (
      <>
        CardanoSharp was built with one thing in mind: Be as frictionless as possible. Add Cardano support to your .NET app today!
      </>
    ),
  },
  {
    title: 'Manage Wallets',
    description: (
      <>
        Being able to work with Mnemonics, Keys, and Addresses, will give you the ability to build better experiences for your users.
      </>
    ),
  },
  {
    title: 'Build Transactions',
    description: (
      <>
        CardanoSharp allows you to build transactions in flexible ways. Build partial or whole transactions allowing you to accommodate many workflows.
      </>
    ),
  },
  {
    title: 'Utility',
    description: (
      <>
        CardanoSharp has many utilities to help you quickly parse and work with CBOR, Keys, Addresses, and Transactions.
      </>
    ),
  },
  {
    title: 'Mint and Burn',
    description: (
      <>
        You can use CardanoSharp to easily manage your NFT Collection with Minting and Burning using Native Scripts.
      </>
    ),
  },
  {
    title: 'Support',
    description: (
      <>
        CardanoSharp is community driven. Not only do we focus on bring Cardano to .NET, but we bring .NET to other Cardano Projects such as Koios and Blockfrost.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
