// src/app/signin/page.tsx
"use client";
import { Button, Typography, Form, Input } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import side_img from "../../assets/img5.jpg";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const { Title, Paragraph } = Typography;

interface SignInValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = (values: SignInValues) => {
    setLoading(true);

    // Retrieve stored credentials from localStorage
    const storedCredentials = localStorage.getItem("userCredentials");
    const parsedCredentials = storedCredentials
      ? JSON.parse(storedCredentials)
      : null;

    // Check if the credentials match,
    if (
      parsedCredentials?.email === values.email &&
      parsedCredentials?.password === values.password
    ) {
      setTimeout(() => {
        toast.success("Successfully logged in!");
        router.push("/dashboard");
      }, 1000);
    } else {
      toast.error("Invalid email or password")
    }

    setLoading(false);
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
            Let’s Get You In!
          </Title>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ email: "", password: "" }}
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
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
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Paragraph className="text-center text-sm text-gray-600 mt-4">
            Ready to join the crew?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-extrabold hover:underline"
            >
              Start here.
            </Link>
          </Paragraph>
        </motion.div>
      </div>
    </div>
  );
}
