import React from 'react';
import Home from './components/pages/home';
import Team from './components/pages/team';
import Player from './components/pages/player';
import './App.css';
import 'antd/dist/antd.css';


const App = () => {
	return (
		<div className='content'>
			<Home />
			<Team />
			<Player />
		</div>
	)
}

export default App;
