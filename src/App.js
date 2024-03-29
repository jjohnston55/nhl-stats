import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "antd";

import "./App.css";
import "antd/dist/antd.css";

import Home from "./components/pages/home";
import Team from "./components/pages/team";
import Player from "./components/pages/player";

import * as viewActions from "./actions/viewActions";
import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
	const [content, setContent] = useState(<Home />);
	const view = useSelector((state) => state.view);
	const dispatch = useDispatch();

	useEffect(() => {
		switch (view.page) {
			case "home":
				setContent(<Home />);
				break;
			case "team":
				setContent(<Team team={view.data} />);
				break;
			case "player":
				setContent(<Player playerID={view.data} />);
				break;
			default:
				setContent(<Home />);
				break;
		}
	}, [view]);

	const handleBack = () => dispatch(viewActions.backView());

	return (
		<>
			<BrowserView viewClassName="page">
				<Row className="backButtonRow" gutter={[16, 16]}>
					{view.page !== "home" && (
						<Col>
							<Button onClick={handleBack} type="primary" shape="round">
								Go Back
							</Button>
						</Col>
					)}
				</Row>
				<Row className="content">
					<Col span={24}>{content}</Col>
				</Row>
			</BrowserView>
			<MobileView viewClassName="page-mobile">
				<Row className="backButtonRow" gutter={[4, 4]}>
					{view.page !== "home" && (
						<Col>
							<Button onClick={handleBack} type="primary" shape="round">
								Go Back
							</Button>
						</Col>
					)}
				</Row>
				<Row className="content-mobile">
					<Col span={23}>{content}</Col>
				</Row>
			</MobileView>
		</>
	);
};

export default App;
