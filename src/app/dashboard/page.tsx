"use client";
import { Typography, Button, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by verifying if there's a token or credentials in localStorage,
    const userToken = localStorage.getItem("userCredentials");

    if (!userToken) {
      // If no user token, redirect to the signup page
      router.push("/signup");
    } else {
      // If user is logged in, stop the loading state
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    // Clear localStorage when logging out
    localStorage.clear();

    // Redirect to signin page
    router.push("/signin");
  };

  if (loading) {
    // Show a spinner while redirecting
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center">
        <Title level={1}>Welcome to Your Dashboard!</Title>
        <Paragraph className="text-lg text-gray-600 mt-4">
          You are logged in. Here, you can manage your profile, settings, and
          other features.
        </Paragraph>
        <Button type="primary" className="mt-6" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
