/* eslint-disable react/prop-types */
import { Table } from "flowbite-react";
import { useAppContext } from "../contexts/AppContext";

export default function AllSTudentTable({ openMod, setSelectedUser }) {
  const { allUsers } = useAppContext();

  const filteredUsers = allUsers?.filter(
    (item) => item?.first_name !== "Admin"
  );

  const handleRowClick = (item) => {
    setSelectedUser(item);
    openMod(item?.name);
  };

  return (
    <Table hoverable className="border border-[#10b981]/30 rounded-lg">
      <Table.Head className="">
        <Table.HeadCell>S/N</Table.HeadCell>

        <Table.HeadCell>Full name</Table.HeadCell>
        <Table.HeadCell>email</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {filteredUsers?.map((item, index) => {
          //   const isChecked = selectedUser.includes(item);

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
                {item?.first_name} {item?.last_name}
              </Table.Cell>
              <Table.Cell>
                <p className="w-[300px] truncate">{item?.email}</p>
              </Table.Cell>
              <Table.Cell>
                <p
                  className={`w-[300px] font-medium ${
                    item?.paid ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item?.paid ? "Enrolled" : "Not enrolled"}
                </p>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
