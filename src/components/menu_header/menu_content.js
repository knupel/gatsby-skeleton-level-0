//REACT
import React from "react";
import { useContext } from "react";
// APP
import { HeaderContext, RegionContext } from "../../context/context";
import { NavCellBox, Dropdown, DropdownRadio, Box} from "../gui";
import { MenuMarkdown } from "./menu_markdown";
import { MenuRegion } from "./menu_region";
import tree from "./../../../media/tree.json";
import { get_css_value, name_to_hex, hex_to_rgb, rgb_to_filter }  from "../../utils/h";

import { StaticImage } from "gatsby-plugin-image"

export function GoHome({className_box, style_box, className_cell, style_cell}) {
	let size = get_css_value("--height_header_cell");
	if(size === undefined) {
		size = 100;
	} else {
		size = size.slice(0,-2);
	}

	// a trick to change the color of svg
	let name = get_css_value("--color_2");
	let hex = name_to_hex(name);
	let rgb = hex_to_rgb(hex);
	let result = rgb_to_filter(rgb);
	const img_style = {
		filter: result.filter,
	}


	return <NavCellBox to="/" className_box={className_box} style_box={style_box} className_cell={className_cell} style_cell={style_cell}>
		<div style={{maxWidth: size+"px", maxHeight:size+"px"}}>
			<StaticImage 	src="./../../../media/images/home.png" alt="Home" 
										placeHolder="blurred" layout="constrained"
										imgStyle={img_style} />
		</div>
	</NavCellBox>
}

///////////////////
// DROPDOWN CLASSIC
///////////////////
export function Region({className_box, style_box, className_cell, style_cell, offset}) {
	const { lang_db_is, set_lang_db_is } = useContext(HeaderContext);
	const { lang } = useContext(RegionContext);

	return <Dropdown 	name={tree[lang].lang[lang]}
										style_box={style_box} style_cell={style_cell} 
										offset={offset}
										is={lang_db_is} set_is={set_lang_db_is}>
		<MenuRegion style_box={style_box} style_cell={style_cell} 
								values={Object.values(tree[lang].lang)} keys={Object.keys(tree[lang].lang)} />
	</Dropdown>
}


function Other({className_box, style_box, className_cell, style_cell, offset}) {
	const { other_db_is, set_other_db_is } = useContext(HeaderContext);

	return <Dropdown 	style_box={style_box} style_cell={style_cell} 
										offset={offset} name={tree.fr.other} 
										is={other_db_is} set_is={set_other_db_is}>
		<MenuMarkdown style_box={style_box} style_cell={style_cell}/>
	</Dropdown>
}


function DropdownClassic(props) {
	return <>
		<Other style_box={props.style_box} style_cell={props.style_cell} offset={props.offset}/> 
		
		{props.in_line !== false ? <Region style_box={props.style_box} style_cell={props.style_cell} offset={props.offset}/> : <></>}
	</>
}





///////////////////
// DROPDOWN RADIO
///////////////////

// REGION
///////////
function RegionRadio({className_box, style_box, className_cell, style_cell, offset}) {
	const { lang } = useContext(RegionContext);

	return <DropdownRadio style_box={style_box} style_cell={style_cell} 
												offset={offset} name={tree[lang].lang[lang]}
												value={"region"}>
		<MenuRegion style_box={style_box} style_cell={style_cell} 
								values={Object.values(tree[lang].lang)}
								keys={Object.keys(tree[lang].lang)} />
	</DropdownRadio>
}

// OTHER
//////////
function OtherRadio({className_box, style_box, className_cell, style_cell, offset}) {
	const { lang } = useContext(RegionContext);

	return <DropdownRadio style_box={style_box} style_cell={style_cell} 
												offset={offset} name={tree[lang].other}
												value={"other"}>
		<MenuMarkdown style_box={style_box} style_cell={style_cell}/>
	</DropdownRadio>
}

// GROUP
///////////
function DropdownRadioGroup(props) {
	return <>
		<OtherRadio style_box={props.style_box} style_cell={props.style_cell} offset={props.offset}/> 
		{props.in_line !== false ? <RegionRadio style_box={props.style_box} style_cell={props.style_cell} offset={props.offset}/> : <></>}
	</>
}







////////////////////////////
// MENU HIMSELF
////////////////////////////////

export function MenuContent({className_box, style_box, className_cell,  style_cell, in_line}) {
	// context part, import what you need
	const { other_db_is, num_item_bd } = useContext(HeaderContext);
	const { lang } = useContext(RegionContext);
	// Design part
	// maybe this value can be compute with useRef to be optimum ?
	let hh = get_css_value("--height_header");
	let hhc = get_css_value("--height_header_cell");
	let height_header = 0;
	let height_header_cell = 0;
	if(hh !== undefined && hhc !== undefined) {
		height_header = hh.slice(0,-2);
		height_header_cell = hhc.slice(0,-2);
	}
	
	const temp_box = {
		position: "relative",
		top: (height_header - height_header_cell) * 0.5+"px",
		background: get_css_value("--color_menu_big"),
	};
	

	// maybe this value can be compute with useRef to be optimum ?
	let offset_dropdown = get_css_value("--height_header_cell");
	if(in_line === false) {
		temp_box["left"] = "50%";
		temp_box["background"] = get_css_value("--color_menu_small");
		temp_box["top"] = 0;
		offset_dropdown = get_css_value("--height_header");
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

	// create the drowdown offset for the small menu
	const box_offset = Object.assign({}, box);
	// create offset only if all the menu is vertical dropdown and regular one
	if(other_db_is && in_line === false) {
		// here we profit than javascript is not typed, sometime is good !
		box_offset["padding"] = (height_header*num_item_bd)+"px" + " 0";
	}

	return <Box className={className_box} style={style_box}>
		{/* Display link to home or not */}
		{in_line !== false ? <GoHome className_box={"home_box"} style_box={box} style_cell={cell}/> : <></>}
		{/* Content */}
		<NavCellBox to="/main" style_box={box} style_cell={cell}>{tree[lang].main}</NavCellBox>
		<NavCellBox to="/about" style_box={box} style_cell={cell}>{tree[lang].about}</NavCellBox>
		<NavCellBox to="/contact" style_box={box} style_cell={cell}>{tree[lang].contact}</NavCellBox>
		{/* <DropdownClassic style_box={box} style_cell={cell} offset={offset_dropdown} in_line={in_line} /> */}
		{in_line === true ? 
			<DropdownRadioGroup style_box={box} style_cell={cell} offset={(height_header - height_header_cell) * 0.5+"px"} in_line={in_line} /> : 
			<DropdownClassic style_box={box} style_cell={cell} offset={offset_dropdown} in_line={in_line} />
		}
		{/* two ways to display the dynamic content, 
				one by extand the menu on line, one with a dropdown menu 
				We can add another one with a horizontal submenu */}
		{/* <MenuMarkdown style_box={box} style_cell={cell}/> */}

		{/* create a false account to give the opportunity to connect */}
		<NavCellBox to="/account" style_box={box_offset} style_cell={cell}>{tree[lang].login}</NavCellBox>
	</Box>
}

