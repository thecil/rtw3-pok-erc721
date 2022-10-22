import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import MintController from '../components/mint/MintController';
const Home: NextPage = () => {

  return (
    <>
    <MintController />
    </>
  );
};

export default Home;
