import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import mitch_kosowski from '../mitch_kosowski.jpg';
import { Header } from 'semantic-ui-react';
import { Image } from 'semantic-ui-react'
import '../App.css';

type EmptyType = {}

const About: FunctionComponent<EmptyType> = () => <div className='white'>
<Header as='h1' className='white'>Mytchmatic™</Header>
<Header as='h2' className='white'>The BEST GUI for Ethereum 2.0</Header>
<div className="App-logo-div">
  <Image src={mitch_kosowski} className="App-logo" alt="logo" size='small' centered/>
</div>
<a
  className="App-link"
  href="https://twitter.com/Mitch_Kosowski"
  target="_blank"
  rel="noopener noreferrer"
>
  -@Mitch_Kosowski #GreatestTraderOfALLTIME
  <span role="img" aria-label="Flexed Biceps"> 💪</span>
  <span role="img" aria-label="Smiling Face With Sunglasses">😎</span>
  <span role="img" aria-label="Thumbs Up">👍</span>
</a>
</div>

export default About;