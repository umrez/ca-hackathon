// src/app/signup/page.tsx
"use client";
import { Button, Typography, Form, Input } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import side_img from "../../assets/img4.jpg";
import toast from "react-hot-toast";

const { Title, Paragraph } = Typography;

interface SignUpValues {
  fullName: string;
  designation: string;
  email: string;
  department: string;
  employeeId: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: SignUpValues) => {
    setLoading(true);
    console.log("Received values: ", values);

    // Save credentials to localStorage
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({
        email: values.email,
        password: values.password,
      })
    );

    setTimeout(() => {
      toast.success("You're all set! Log in to access your account.");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 relative hidden md:block">
        <Image
          src={side_img}
          alt="Side visual"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#c8a982] px-4">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-[#FFFAF0] p-10 rounded-2xl shadow-md w-full max-w-md"
        >
          <Title level={2} className="text-center">
            Create Your Adventure!
          </Title>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              label="Designation"
              name="designation"
              rules={[
                { required: true, message: "Please enter your designation" },
              ]}
            >
              <Input placeholder="Software Developer" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "" },
                {
                  validator: (_, value) =>
                    value && value.endsWith("@cainc.com")
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Only @cainc.com emails are allowed")
                        ),
                },
              ]}
            >
              <Input placeholder="yourname@cainc.com" />
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
              rules={[
                { required: true, message: "Please select your department" },
              ]}
            >
              <Input placeholder="Engineering" />
            </Form.Item>

            <Form.Item
              label="Employee ID"
              name="employeeId"
              rules={[
                { required: true, message: "Please enter your employee ID" },
              ]}
            >
              <Input placeholder="EMP123456" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="********" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <Paragraph className="text-center text-sm text-gray-600 mt-4">
            Already part of the crew?{" "}
            <Link
              href="/signin"
              className="text-blue-600 font-extrabold hover:underline"
            >
              Jump back in.
            </Link>
          </Paragraph>
        </motion.div>
      </div>
    </div>
  );
}
