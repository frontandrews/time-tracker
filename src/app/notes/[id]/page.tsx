"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Metadata, ResolvingMetadata } from "next";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {Card, CardBody} from "@nextui-org/card";
import { useDisclosure } from "@nextui-org/react";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";

import 'react-quill/dist/quill.snow.css';

type Props = {};

export async function generateMetadata({}: Props): Promise<Metadata> {
  return {
    title: "My Notes",
    description: "My Notes",
  };
}

export default function Notes(props: any) {
  const [value, setValue] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const notes = Array(5)
    .fill(0)
    .map((_, i) => ({ id: i, title: `Note ${i}`, content: `Note description ${i}` }));
  const router = useRouter();
  return (
    <div className="p-5">
      <label>Title</label>
      <Input isRequired />
      <label>Description</label>
      <div className="bg-neutral-100 rounded-xl">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
    
  );
}

export async function getServerSideProps(context) {
  // Fetch data from an external API or database
  // const data = await fetch('your API endpoint')
  // const jsonData = await data.json()
  const data = Array(5)
    .fill(0)
    .map((_, i) => ({ id: i, title: `Note ${i}`, description: `Note description ${i}` }));

  // Pass data to the page via props
  return {
    props: {
      data,
    },
  };
}
