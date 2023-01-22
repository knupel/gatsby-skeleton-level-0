import React from "react";
import { NavCell, NavCellBox} from "../goto";
import { MenuMarkdown } from "./menu_markdown";

import home_logo from "./../../../media/images/home.png";

export function GoHome({className, style}) {
	return <NavCell to="/" className={className} style={style}>
		<img style={{maxWidth: "100%", maxHeight: "100%"}} alt="Home" src={home_logo}/>
	</NavCell>
}


export function MenuContent({className_box, style_box, className_cell,  style_cell, in_line}) {
	const temp_box = {
		position: "relative",
		top: 0,
	};
	if(in_line === false) {
		temp_box["left"] = "50%";
	}
	
	const temp_cell = {
		whiteSpace: "nowrap",
		position: "absolute",
		top: "50%",
		left: "50%",
		webkitTransform: "translate(-50%, -50%)",
		transform: "translate(-50%, -50%)",
	};

	const box = Object.assign({}, style_cell, temp_box);
	const cell = Object.assign({}, temp_cell);

	return <div className={className_box} style={style_box}>
		{in_line !== false ? <div style={box}><GoHome style={cell}/></div> : <></>}
		<NavCellBox to="/page-a" style_box={box} style_cell={cell}>PAGE A</NavCellBox>
		<NavCellBox to="/page-b" style_box={box} style_cell={cell}>PAGE B</NavCellBox>
		<NavCellBox to="/page-c" style_box={box} style_cell={cell}>PAGE C</NavCellBox>
		<MenuMarkdown style_box={box} style_cell={cell}/>
		<NavCellBox to="/404" style_box={box} style_cell={cell}>404</NavCellBox>
	</div>
}