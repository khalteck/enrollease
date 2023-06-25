/* eslint-disable react/prop-types */
import { Table } from "flowbite-react";

export default function MyCoursesTable({ openMod, userData }) {
  const handleRowClick = (item) => {
    openMod(item?.name);
  };

  return (
    <Table hoverable className="border border-[#10b981]/30 rounded-lg">
      <Table.Head className="">
        <Table.HeadCell>Course name</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Prerequisites</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {userData?.selected_courses?.map((item, index) => {
          //   const isChecked = selectedCourses.includes(item);

          return (
            <Table.Row
              key={index}
              onClick={() => handleRowClick(item)}
              className="bg-white dark:border-[#10b981]/30 border-[#10b981]/30 dark:bg-gray-800 cursor-pointer"
            >
              {/* <Table.Cell className="p-4">
                <Checkbox
                  className="cursor-pointer"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(item)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Table.Cell> */}
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item?.name}
              </Table.Cell>
              <Table.Cell>
                <p className="w-[300px] truncate">{item?.description}</p>
              </Table.Cell>
              <Table.Cell>
                <p className="w-[300px] truncate">{item?.prerequisites}</p>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
