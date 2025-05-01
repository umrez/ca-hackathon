"use client";
import { Button, Typography } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import kids_pic from "../assets/school_kids.avif";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={kids_pic}
        alt="School Kids"
        fill
        priority
        className="object-cover"
      />

      {/* adds overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-md w-full max-w-md text-center"
        >
          {/* <Title level={1}>Welcome to <span className="text-[#1EBDC6]">CA Nexus</span> <span className="text-[#E86125]">Idea</span> <span className="text-[#07AB4C]">Stream</span></Title> */}
          <Title level={1}>
            Welcome to{" "}
            <span className="text-[#00528D]">CA Nexus Idea Stream </span>
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-6">
            Create an account or sign in to get started.
          </Paragraph>

          <div className="flex justify-center space-x-4">
            <Link href="/signin">
              <Button type="primary">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button type="default">Sign Up</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
