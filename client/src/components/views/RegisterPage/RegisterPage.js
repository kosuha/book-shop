import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function RegisterPage(props) {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                email: "",
                name: "",
                password: "",
                confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("이름을 입력해주세요."),
                email: Yup.string()
                    .email("유효하지 않은 이메일입니다.")
                    .required("이메일을 입력해주세요."),
                password: Yup.string()
                    .required("비밀번호를 입력해주세요.")
                    .matches(
                        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,31}$/,
                        "영문, 숫자, 특수문자 각각 포함하여 8~30자."
                    ),
                confirmPassword: Yup.string()
                    .oneOf(
                        [Yup.ref("password"), null],
                        "비밀번호가 일치해야 합니다."
                    )
                    .required("비밀번호가 일치해야합니다."),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                    };

                    dispatch(registerUser(dataToSubmit)).then((response) => {
                        if (response.payload.success) {
                            props.history.push("/login");
                        } else {
                            alert(response.payload.err.errmsg);
                        }
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
                return (
                    <div className="app">
                        <h2>회원가입</h2>
                        <Form
                            style={{ minWidth: "375px" }}
                            {...formItemLayout}
                            onSubmit={handleSubmit}
                        >
                            <Form.Item required label="이름">
                                <Input
                                    id="name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.name && touched.name
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item
                                required
                                label="이메일"
                                hasFeedback
                                validateStatus={
                                    errors.email && touched.email
                                        ? "error"
                                        : "success"
                                }
                            >
                                <Input
                                    id="email"
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

                            <Form.Item
                                required
                                label="비밀번호"
                                hasFeedback
                                validateStatus={
                                    errors.password && touched.password
                                        ? "error"
                                        : "success"
                                }
                            >
                                <Input
                                    id="password"
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

                            <Form.Item required label="비밀번호 확인" hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                />
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <div className="input-feedback">
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    onClick={handleSubmit}
                                    type="primary"
                                    disabled={isSubmitting}
                                >
                                    회원가입
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default RegisterPage;
