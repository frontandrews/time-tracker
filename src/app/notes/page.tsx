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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New Note
                </ModalHeader>
                <ModalBody>
                  <label>Title</label>
                  <Input isRequired />
                  <label>Description</label>
                  <div className="bg-neutral-100 hover:bg-neutral-200/75 rounded-xl">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      <div className="flex flex-1 flex-col pb-8 items-center">
        <div className="flex flex-1 space-x-4 justify-center">
          <h2 className="">Notes</h2>
          <div className="text-right">
            <Button onPress={onOpen} color="primary">
              New Note
            </Button>
          </div>
        </div>
        <Input className="mt-8 pl-2 max-w-lg" placeholder="Search notes" />
      </div>
      <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col flex-1 max-w-lg space-y-4">
          {notes.map((note: any) => (
            <div className="flex-1 min-w-2xl cursor-pointer" key={note.id} onClick={() => router.push(`/notes/${note.id}`)}>
              <Card className='hover:bg-neutral-100'>
                <CardBody>
                  <p className='font-medium'>{note.content}</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
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
