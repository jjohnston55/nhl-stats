import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Home from './components/pages/home';
import Team from './components/pages/team';
import Player from './components/pages/player';
import './App.css';
import 'antd/dist/antd.css';


const App = () => {
	const [content, setContent] = useState(<Home />);
	const page = useSelector(state => state.view.page);
	const data = useSelector(state => state.view.data);

	useEffect(() => {
		switch (page) {
			case 'home':
				setContent(<Home />);
				break;
			case 'team':
				setContent(<Team team={data}/>);
				break;
			case 'player':
				setContent(<Player player={data}/>);
				break;
			default:
				setContent(<Home />);
				break;
		}
	}, [page]);

	return (
		<div className='content'>
			{content}
		</div>
	)
}

export default App;
