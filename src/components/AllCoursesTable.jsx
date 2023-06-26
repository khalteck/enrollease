/* eslint-disable react/prop-types */
import { Table } from "flowbite-react";
import { useAppContext } from "../contexts/AppContext";

export default function AllCoursesTable({
  //   openMod,
  setSelectedCourse,
  setopenDeleteCourse,
}) {
  const { allCourses } = useAppContext();

  //   const filteredUsers = allCourses?.filter((item) => item?.role !== "admin");

  const handleRowClick = (item) => {
    setSelectedCourse(item);
    setopenDeleteCourse(true);
  };

  return (
    <Table hoverable className="border border-[#10b981]/30 rounded-lg">
      <Table.Head className="">
        <Table.HeadCell>S/N</Table.HeadCell>

        <Table.HeadCell>Course Title</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Prerequisites</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {allCourses?.map((item, index) => {
          return (
            <Table.Row
              key={index}
              onClick={() => handleRowClick(item)}
              className="bg-white dark:border-[#10b981]/30 border-[#10b981]/30 dark:bg-gray-800 cursor-pointer"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item?.name}
              </Table.Cell>
              <Table.Cell>
                <p className="w-[300px] truncate">{item?.description}</p>
              </Table.Cell>
              <Table.Cell>
                <p className={`w-[300px] font-medium`}>{item?.prerequisites}</p>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
