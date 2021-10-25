import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";

function LoginPage(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : "";

    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: "",
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email("가입한 이메일을 입력해주세요.")
                    .required("가입한 이메일을 입력해주세요."),
                password: Yup.string()
                    .required("비밀번호를 입력해주세요."),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                    };

                    dispatch(loginUser(dataToSubmit))
                        .then((response) => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem(
                                    "userEmail",
                                    response.payload.userEmail
                                );
                                if (rememberMe === true) {
                                    window.localStorage.setItem(
                                        "rememberMe",
                                        values.email
                                    );
                                } else {
                                    localStorage.removeItem("rememberMe");
                                }
                                props.history.push("/");
                            } else {
                                setFormErrorMessage(
                                    "회원정보가 일치하지 않습니다."
                                );
                            }
                        })
                        .catch((err) => {
                            setFormErrorMessage(
                                "회원정보가 일치하지 않습니다."
                            );
                            setTimeout(() => {
                                setFormErrorMessage("시간초과");
                            }, 3000);
                        });
                    setSubmitting(false);
                }, 500);
            }}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                if (!values.email) {
                    values.email = "";
                }
                return (
                    <div className="app">
                        <form
                            onSubmit={handleSubmit}
                            style={{ width: "350px" }}
                        >
                            <Form.Item required>
                                <Input
                                    id="email"
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="이메일"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required>
                                <Input
                                    id="password"
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="비밀번호"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </Form.Item>

                            {formErrorMessage && (
                                <label>
                                    <p
                                        style={{
                                            color: "#ff0000bf",
                                            fontSize: "0.7rem",
                                            border: "1px solid",
                                            padding: "1rem",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {formErrorMessage}
                                    </p>
                                </label>
                            )}

                            <Form.Item>
                                <Checkbox
                                    id="rememberMe"
                                    onChange={handleRememberMe}
                                    checked={rememberMe}
                                >
                                    이메일 기억하기
                                </Checkbox>
                                <a
                                    className="login-form-forgot"
                                    href="/reset_user"
                                    style={{ float: "right" }}
                                >
                                    비밀번호 찾기
                                </a>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        style={{ minWidth: "100%" }}
                                        disabled={isSubmitting}
                                        onSubmit={handleSubmit}
                                    >
                                        로그인
                                    </Button>
                                </div>
                                또는 <a href="/register">회원가입</a>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default withRouter(LoginPage);
