/* eslint-disable react/prop-types */
import { Checkbox, Table } from "flowbite-react";
import courseData from "../data/course.json";

export default function CourseTable({
  openMod,
  selectedCourses,
  setSelectedCourses,
}) {
  const handleCheckboxChange = (item) => {
    const isChecked = selectedCourses.includes(item);
    if (isChecked) {
      setSelectedCourses(selectedCourses.filter((course) => course !== item));
    } else {
      setSelectedCourses([...selectedCourses, item]);
    }
  };

  const handleRowClick = (item) => {
    openMod(item?.name);
  };

  return (
    <Table hoverable className="border border-[#10b981]/30 rounded-lg">
      <Table.Head className="">
        <Table.HeadCell className="p-4">{/* <Checkbox /> */}</Table.HeadCell>
        <Table.HeadCell>Course name</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Prerequisites</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {courseData?.map((item, index) => {
          const isChecked = selectedCourses.includes(item);

          return (
            <Table.Row
              key={index}
              onClick={() => handleRowClick(item)}
              className="bg-white dark:border-[#10b981]/30 border-[#10b981]/30 dark:bg-gray-800 cursor-pointer"
            >
              <Table.Cell className="p-4">
                <Checkbox
                  className="cursor-pointer"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(item)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Table.Cell>
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
