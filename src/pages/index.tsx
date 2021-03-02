import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";

import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import { signIn, signOut, useSession } from 'next-auth/client'

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | moveit </title>
        </Head>
    <div>
      {!session && <>
        Not signed in <br/>
        <button onClick={(): Promise<void> => signIn()}>Sign in</button>
      </>}
    </div>
    <div></div>
    <div>
      {session && <>
        Signed in as {session.user.email} <br/>
        <button onClick={(): Promise<void> => signOut()}>Sign out</button>
      </>}
    </div>
    

      <ExperienceBar />
      
      <CountdownProvider>
        <section>
          <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { level, currentExperience, challengesCompleted} = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}