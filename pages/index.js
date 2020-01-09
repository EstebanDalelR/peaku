import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const Home = () => {
  let [url, setURL] = useState('')
  let [finishedFetch, setFinishedFetch] = useState(false)
  let [startedFetch, setStartedFetch] = useState(false)
  let [newsTitle, setNewsTitle] = useState('')
  let [finishedSentiment, setFinishedSentiment] = useState(false)
  let [startedSentiment, setStartedSentiment] = useState(false)
  async function sendPage () {
    setStartedFetch(true)
    let resp = await fetch(
      '/api/fetchPage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
      }
    )
    const myJson = await resp.json()
    setFinishedFetch(true)
    console.log(myJson)
    setNewsTitle(myJson.title)
  }

  return (
    <div>
      <Head>
        <title>Analyze sentiments</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />

      <div className='hero'>
        <h1 className='title'>Welcome to the NewSentiment!</h1>
        <p className='description'>
        To get started, paste <a>a url in the textbox</a> and wait.
        </p>

        <div className='row'>
          {!startedFetch
            ? <>
              <input
                placeholder='Paste your news URL here'
                type='url'
                autoFocus
                value={url}
                onChange={(e) => setURL(e.target.value)}
              />
              <button onClick={sendPage}>Get page</button>
            </>
            : !finishedFetch
              ? <h5>loading...</h5>
              : <>
                <h5>Is the title of the news article: "{newsTitle}"?</h5>
                <button onClick={() => {
                  setStartedFetch(false)
                  setFinishedFetch(false)
                }}>Retry</button>
                <button onClick={() => setStartedSentiment(true)}>Confirm</button>
              </>
          }
        </div>
      </div>
      {startedSentiment
        ? <h3>Getting Sentiments</h3>
        : null
      }

      <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
    </div>
  )
}

export default Home
