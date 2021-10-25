import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item>
                <a href="/select-books">책고르기</a>
            </Menu.Item>
			<Menu.Item>
                <a href="/subscription">구독하기</a>
            </Menu.Item>
			<Menu.Item>
                <a href="/brand-story">글임이야기</a>
            </Menu.Item>
			<Menu.Item>
                <a href="/faq">고객센터</a>
            </Menu.Item>
            
        </Menu>
    );
}

export default LeftMenu;
