// REACT
import React from "react";
import { useState, useEffect} from "react";
// APP
import { get_css_value, width_higher_than }  from "../../utils/h";
import { MenuBig, MenuSmall } from "./../h";
import { HeaderContextProvider, DropdownContextProvider } from "../../context/context"

export function Header() {
	const [size, set_size] = useState(1);
	// need useEffect to avoid too much re-rendering
	let buf =  get_css_value("--screen_min");
	let value_is = false;
	if(buf !== undefined) {
		let min = buf.slice(0,-2);
		// assume min now is a number
		value_is = width_higher_than(min);
	}
	
	useEffect(() => {
		if(value_is) {
			set_size(1);
		} else {
			set_size(0);
		}
	})




	return <HeaderContextProvider>
		<DropdownContextProvider default_value="">
			<div className="header">
				{size > 0 ? <MenuBig/> : <MenuSmall/>}
			</div>
		</DropdownContextProvider>
	</HeaderContextProvider>
	
}

