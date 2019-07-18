import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import mitch_kosowski from '../mitch_kosowski.jpg';

type EmptyType = {}

const About: FunctionComponent<EmptyType> = () => <div>
<h1>Mytchmatic™</h1>
<h2>The BEST GUI for Ethereum 2.0</h2>
<img src={mitch_kosowski} className="App-logo" alt="logo" />
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