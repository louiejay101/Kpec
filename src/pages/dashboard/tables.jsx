import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authorsTableData, projectsTableData } from "@/data";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export function Tables() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "pnl";
  const tableData = view === "recent" ? projectsTableData : authorsTableData;

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Now we check if the search term is not empty and filter accordingly
  const filteredOptions = searchTerm
    ? tableData.filter(
        ({ glaccount, name }) =>
          glaccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
          name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tableData; // Show all data if there's no search term

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-4 rounded-xl bg-gradient-to-tr from-gray-800 to-gray-900 text-white p-4 mt-5"
        >
          <div className="flex items-center gap-2 text-sm font-semibold">
            <button
              onClick={() => setSearchParams({ view: "pnl" })}
              className={`hover:underline ${view === "pnl" ? "underline" : ""}`}
            >
              PNL Statement
            </button>
            <span>/</span>
            <button
              onClick={() => setSearchParams({ view: "recent" })}
              className={`hover:underline ${view === "recent" ? "underline" : ""}`}
            >
              Recent Statements
            </button>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pb-2 pt-2">
          {/* 🔍 Search + Dropdown Input + Toggle Button */}
          <div className="relative w-full max-w-xs mb-4 px-5">
            <div className="flex items-center gap-1 w-96">
              <Input
                label="Search GL Account or Name"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                className="flex-1"
              />
              <Button
                size="sm"
                className="min-w-[40px] p-2"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </div>

            {isDropdownOpen && (
              <ul className="absolute z-[99] mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map(({ glaccount, name }, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onMouseDown={() => {
                        setSearchTerm(`${glaccount} - ${name}`);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {glaccount} - {name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* 📊 Table below */}
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["GL Account", "Name", "Value"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ glaccount, name, value }, key) => {
                const className = `py-3 px-5 ${
                  key === tableData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;
                return (
                  <tr key={key}>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {glaccount}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {value}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Edit
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
