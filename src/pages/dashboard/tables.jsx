import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authorsTableData, projectsTableData } from "@/data";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export function Tables() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "pnl";
  const initialTableData = view === "recent" ? projectsTableData : authorsTableData;

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showIntegerInput, setShowIntegerInput] = useState(false);
  const [integerInput, setIntegerInput] = useState("");
  const [selectedGLAccount, setSelectedGLAccount] = useState("");
  const [tableData, setTableData] = useState(initialTableData);

  // modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ index: null, glaccount: "", name: "", value: "" });

  const filteredOptions = initialTableData.filter(
    ({ glaccount, name }) =>
      glaccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNoResultsMessage = searchTerm && filteredOptions.length === 0;

  const handleAdd = () => {
    if (selectedGLAccount && integerInput) {
      const [glaccount, name] = selectedGLAccount.split(" - ");
      const newEntry = {
        glaccount: glaccount.trim(),
        name: name ? name.trim() : "",
        value: integerInput,
      };
      setTableData((prev) => [newEntry, ...prev]);
      setSearchTerm("");
      setIntegerInput("");
      setShowIntegerInput(false);
    }
  };

  const handleDelete = (index) => {
    const updated = [...tableData];
    updated.splice(index, 1);
    setTableData(updated);
  };

  const handleEditOpen = (index) => {
    const row = tableData[index];
    setEditData({ index, glaccount: row.glaccount, name: row.name, value: row.value });
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    const updated = [...tableData];
    updated[editData.index] = {
      glaccount: editData.glaccount,
      name: editData.name,
      value: editData.value,
    };
    setTableData(updated);
    setIsEditModalOpen(false);
  };

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
          <div className="relative w-full px-5 mb-4">
            <div className="flex items-center gap-4 w-full">
              <div className="relative w-96">
                <Input
                  label="Search GL Account or Name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                >
                  <ChevronDownIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {showIntegerInput && (
                <>
                  <div className="w-96">
                    <Input
                      label="Enter Value"
                      value={integerInput}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                        setIntegerInput(onlyNums);
                      }}
                    />
                  </div>

                  <Button
                    onClick={handleAdd}
                    disabled={!integerInput}
                    className="p-2 bg-gray-800 w-16"
                  >
                    Add
                  </Button>
                </>
              )}
            </div>

            {isDropdownOpen && (
              <ul className="absolute z-[99] mt-1 w-96 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map(({ glaccount, name }, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onMouseDown={() => {
                        const combined = `${glaccount} - ${name}`;
                        setSearchTerm(combined);
                        setSelectedGLAccount(combined);
                        setIsDropdownOpen(false);
                        setShowIntegerInput(true);
                      }}
                    >
                      {glaccount} - {name}
                    </li>
                  ))
                ) : (
                  showNoResultsMessage && (
                    <li className="px-4 py-2 text-gray-400">No results found</li>
                  )
                )}
              </ul>
            )}
          </div>

          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["GL Account", "Name", "Value", "Actions"].map((el) => (
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
                      <div className="flex gap-2">
                      <Button size="sm" className="bg-gray-500 p-1" onClick={() => handleDelete(key)}>
                          Delete
                        </Button>
                        <Button size="sm" className="bg-gray-800 p-2" onClick={() => handleEditOpen(key)}>
                          Edit
                        </Button>
                       
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* ✨ Edit Modal */}
      <Dialog open={isEditModalOpen} handler={() => setIsEditModalOpen(false)}>
        <DialogHeader>Edit Entry</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="GL Account"
            value={editData.glaccount}
            onChange={(e) => setEditData({ ...editData, glaccount: e.target.value })}
          />
          <Input
            label="Name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
          <Input
            label="Value"
            value={editData.value}
            onChange={(e) => setEditData({ ...editData, value: e.target.value.replace(/[^0-9]/g, "") })}
          />
        </DialogBody>
        <DialogFooter>
          <Button className="bg-gray-500 mr-4" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-gray-800" onClick={handleEditSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Tables;
