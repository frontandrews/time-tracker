"use client";
import React, {useState, useRef, useEffect} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { useDisclosure } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { columns, tasks as taskData } from "./data";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import ReactQuill from 'react-quill';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { NextPage } from 'next';
import IsAuth from '@/components/IsAuth'
import {Spinner} from "@nextui-org/spinner";
import 'react-quill/dist/quill.snow.css';

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  completed: "primary",
};

const Index: NextPage = () => {
  const [tasks, setTasks] = useState<any>([])
  const [value, setValue] = useState('');

  useEffect(() => {
    setTasks(taskData)
  }, [])

  const renderCell = React.useCallback((task: any, columnKey: any) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
      case "project":
        return (
          <div>
            <div>
              {task.project.name}
            </div>
            <div>
              {task.description}
            </div>
            <div>
              <Chip
                className="capitalize"
                color={statusColorMap[task.status]}
                size="lg"
                variant="flat"
              >
                {cellValue}
              </Chip>
            </div>
          </div>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit task">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete task">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
            {task.startedAt ? (
              <Button>Stop</Button>
            ) : (
              <Button>Start</Button>
            )}
          </div>
          );
      default:
        return cellValue;
    }
  }, []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const workedTimes = [
    {
      name: "This month",
      hours: 244,
    },
    {
      name: "This week",
      hours: 40,
    },
    {
      name: "Today",
      hours: 8,
    },
  ];

  const exportData = (data: any, format: any) => {
    let content = "";

    if (format === "csv") {
      // Convert array of objects to CSV format
      const headers = Object.keys(data[0]);
      const headerRow = headers.join(",");
      content += headerRow + "\n";

      data.forEach((item: any) => {
        const values = headers.map((header) => item[header]);
        const row = values.join(",");
        content += row + "\n";
      });
    } else if (format === "txt") {
      // Convert array of objects to plain text format
      data.forEach((item: any) => {
        const itemText = JSON.stringify(item);
        content += itemText + "\n";
      });
    }

    // Create a Blob with the content
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element for downloading
    const a = document.createElement("a");
    a.href = url;
    a.download = `exported_data.${format}`;
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex px-8 w-full flex-col items-center">
      <div className="container">
        <div className="flex flex-row space-x-8 pt-6">
          {workedTimes.map((workedTime) => (
            <Card key={workedTime.name} className="flex-1">
              <CardHeader className="text-center">
                <h4>{workedTime.name}</h4>
              </CardHeader>
              <CardBody className="text-center">
                <h2>{workedTime.hours} hours</h2>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="flex flex-1 py-6">
          <div className="flex flex-1 space-x-4 items-center">
            <Button
              size="sm"
              onClick={() => exportData(tasks, "csv")}
              color="default"
            >
              Export as CSV
            </Button>
            <Button
              size="sm"
              onClick={() => exportData(tasks, "txt")}
              color="default"
            >
              Export as TXT
            </Button>
          </div>
          <div className="text-right">
            <Button onPress={onOpen} color="primary">
              Create New Task
            </Button>
          </div>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New Task
                </ModalHeader>
                <ModalBody>
                  <label>Project</label>
                  <Input isRequired />
                  <label>Description</label>
                  <div className=" bg-neutral-100 hover:bg-neutral-200/75 rounded-xl">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                  </div>
                  <label>Start Date</label>
                  <Input type="date" />
                  <label>Initial Time Spent</label>
                  <Input placeholder="1m 1w 1d 1h 1m" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button onPress={onClose}>Save & Start</Button>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {
          tasks.length ? (
            <Table 
              selectionMode="single" 
              isStriped 
              aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={tasks}>
                {(item: any) => (
                  <TableRow key={item.id} className="cursor-pointer">
                    {(columnKey: any) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-row justify-center items-center">
              <Spinner size="lg" />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default IsAuth(Index);