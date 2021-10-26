/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const { SubMenu } = Menu;

function RightMenu(props) {
    const user = useSelector((state) => state.user);

    const logoutHandler = () => {
        axios.put(`${USER_SERVER}/logout`).then((response) => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert("Log Out Failed");
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">로그인</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">회원가입</a>
                </Menu.Item>
            </Menu>
        );
    } else if (user.userData && user.userData.isAdmin) {
        return (
            <Menu mode={props.mode}>
                <SubMenu key="admin" title="Admin">
                    <Menu.Item key="upload">
                        <a href="/admin/upload">Upload</a>
                    </Menu.Item>
                    <Menu.Item key="release">
                        <a href="/admin/release">Release</a>
                    </Menu.Item>
                    <Menu.Item key="mypage">
                        <a href="/my-page">내 정보</a>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>로그아웃</a>
                </Menu.Item>
            </Menu>
        );
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mypage">
                    <a href="/my-page">내 정보</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>로그아웃</a>
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(RightMenu);
