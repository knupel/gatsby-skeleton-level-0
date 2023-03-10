// REACT
import React from "react";
import {useContext} from "react";
// GATSBY
import { Link, navigate } from "gatsby";
// APP
import { get_css_value }  from "../utils/h";
// APP DROPDOWN
import { DropdownRadioContext } from "../context/context";

export function Box(props) {
	// don't use a strict aguality with === to be sure to catch the value.
	if(get_css_value("--box_default_design") === 1) {
		const style = Object.assign({}, props.style)
		style["border"] = "1px solid black";
		return <div className={props.className} style={style} onClick={props.onClick}>{props.children}</div>
	} else {
		return <div className={props.className} style={props.style} onClick={props.onClick}>{props.children}</div>
	}
}

export function Hamburger(props) {
	return <Box className={props.className_box} style={props.style_box}>
		{props.children}
	</Box>
}

/////////////////
// LINK
////////////////
export function LinkCell ({to, className, style, children}) {
	return <div className={className} style={style}>
		<Link to={to}>{children}</Link>	
	</div>
}

/////////////
// NAVIGATION
/////////////

export function NavCell({to, className, style, children}) {
	function mouse_click(event) {
		event.preventDefault();
		navigate(to);
	}
	return <div className={className} style={style} onClick={mouse_click}>{children}</div>
}

export function NavCellBox({to, className_box, style_box, className_cell, style_cell, children}) {
	return <Box className={className_box} style={style_box}>
			<NavCell to={to} className={className_cell} style={style_cell}>{children}</NavCell>
		</Box>
}



//////////////////
// DROPDOWN SIMPLE
//////////////////


export function Dropdown({name,
													className_box, style_box, className_cell, style_cell, offset,
													is, set_is,  
													children}) {
	const style_display = {
		display: "flex",
		flexDirection: "column",
		padding: offset + " 0",
	}

	function mouse_click(event) {
		event.preventDefault();
		is ? set_is(false) : set_is(true); // context
 	}

		// close the dropdown after use it
		function close(event) {
			event.preventDefault();
			set_is(false);
		}

	return <Box className={className_box} style={style_box}>
		<div className={className_cell} style={style_cell} onClick={mouse_click}>{name}</div>
		{is ? 
			<div style={style_display} onClick={close}>
				{children}
			</div> : <></>}
	</Box>
}


//////////////////
// DROPDOWN RADIO
//////////////////

export function DropdownRadio({	name,
																className_box, style_box, className_cell, style_cell, offset,
																value, 
																children}) {
	// context
	const [toggle_is, set_toggle_is] = useContext(DropdownRadioContext);
	const checked = value === toggle_is;


	const style_display = {
		display: "flex",
		flexDirection: "column",
		padding: offset + " 0",
	}

	const style_input = {
		height:"0px",
		width: "0px",
		zindex:"1",
		opacity: "0",
		cursor: "pointer",
	}

	// close the dropdown after use it
	function close(event) {
		event.preventDefault();
		set_toggle_is("");
	}


	return <Box className={className_box} style={style_box}>
			<label>
				<input
							style={style_input}
							// className="dropdown_input"
							id="radio_button"
							value={value}
							checked={checked}
							type="radio"
							onChange={({ target }) => {
								// some code if necessary
								set_toggle_is(target.value)}}
						/>
				<div className={className_cell} style={style_cell}>{name}</div>			
			</label>	
			{toggle_is === value ? <div onClick={close} style={style_display}>{children}</div> : <></>}
	</Box>
}

