"use client";
import { Metadata, ResolvingMetadata } from "next";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

type Props = {};

export async function generateMetadata({}: Props): Promise<Metadata> {
  return {
    title: "FAQ",
    description: "Faq",
  };
}

export default function Faq(props: any) {
  const notes = Array(5)
    .fill(0)
    .map((_, i) => ({ id: i, title: `Note ${i}`, description: `Note description ${i}` }));

  return (
    <div className="p-5">
      <div className="flex flex-1 flex-col pb-8">
        <div className="flex flex-1 space-x-4 justify-center">
          <h2 className="">Frequently Asked Questions</h2>
        </div>
        <Input className="mt-8 pl-2 max-w-lg" placeholder="Search notes" />
      </div>
      <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-1">
        <Accordion variant="splitted">
          {notes.map((note: any) => (
            <AccordionItem
              key={note.id}
              aria-label={note.title}
              title={note.title}
              subtitle={
                <span>
                  {note.subtitle}
                </span>
              }
            >
              {note.description}
            </AccordionItem>
          ))}
        </Accordion>
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
