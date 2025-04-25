import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { PencilIcon } from "@heroicons/react/24/outline";


export function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstCategory, setFirstCategory] = useState("");
  const [secondCategory, setSecondCategory] = useState("");
  const [glAccount, setGlAccount] = useState("");
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);


  // ✅ Table state
  const [tableData, setTableData] = useState(authorsTableData);

  const secondCategoryOptions = {
    "TURNOVER / REVENUES": ["SALES INCOME", "SALES DISCOUNT"],
    "COST OF SALES": ["COST OF GOODS SOLD - PRODUCT COST", "FREIGHT COST"],
    "GROSS PROFIT": [],
    "OPERATING PROFIT": [],
  };

  const resetForm = () => {
    setFirstCategory("");
    setSecondCategory("");
    setGlAccount("");
    setName("");
  };

  const handleOpenModal = (entry = null, index = null) => {
    if (entry) {
      setFirstCategory(entry.category);
      setSecondCategory(entry.subcategory);
      setGlAccount(entry.glaccount);
      setName(entry.name);
      setEditIndex(index);
    } else {
      resetForm();
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (!glAccount || !name || !firstCategory || !secondCategory) return;

    const newEntry = {
      glaccount: glAccount,
      name,
      category: firstCategory,
      subcategory: secondCategory,
    };

    if (editIndex !== null) {
      // Update mode
      setTableData((prev) =>
        prev.map((item, idx) => (idx === editIndex ? newEntry : item))
      );
    } else {
      // Add mode
      setTableData((prev) => [newEntry, ...prev]);
    }

    handleCloseModal();
  };
  // ✅ Filtered from state, not static import
  const filteredData = tableData.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.glaccount.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.subcategory.toLowerCase().includes(search)
    );
    const handleOpenModal = (index = null) => {
      if (index !== null) {
        const item = tableData[index];
        setFirstCategory(item.category);
        setSecondCategory(item.subcategory);
        setGlAccount(item.glaccount);
        setName(item.name);
        setEditIndex(index);
      } else {
        resetForm();
        setEditIndex(null);
      }
      setIsModalOpen(true);
    };
    
  });

  return (
    <>
      {/* Banner */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      {/* Main Card */}
      <Card className="relative mx-4 -mt-16 mb-6 border border-blue-gray-100">
        <div className="absolute right-6 -top-5 z-10">
          <Button className="bg-gray-800" onClick={handleOpenModal}>
            Add GL Account
          </Button>
        </div>

        <CardBody className="space-y-8 p-6">
          {/* Search */}
          <div className="max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["GL Account", "Name", "Category", "SubCategory", ""].map((el) => (
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
                {filteredData.map(
                  ({ glaccount, name, category, subcategory }, key) => {
                    const className = `py-3 px-5 ${
                      key === filteredData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                      <tr key={`${glaccount}-${name}-${key}`}>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-semibold text-blue-gray-700"
                          >
                            {glaccount}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-700">
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-700">
                            {category}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-700">
                            {subcategory}
                          </Typography>
                        </td>
                        <td className={className}>
                        <Typography
                              as="button"
                              onClick={() => handleOpenModal({ glaccount, name, category, subcategory }, key)}
                              className="text-xs font-semibold text-blue-gray-600">
                              Edit
                        </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} handler={handleCloseModal}>
        <DialogHeader>Add GL Account</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          {/* Category Dropdown */}
          <Select
            label="Select Category"
            value={firstCategory}
            onChange={(val) => {
              setFirstCategory(val);
              setSecondCategory("");
              setGlAccount("");
              setName("");
            }}
          >
            {Object.keys(secondCategoryOptions).map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>

          {/* Subcategory Dropdown */}
          {firstCategory && (
            <Select
              key={firstCategory}
              label="Select Subcategory"
              value={secondCategory}
              onChange={(val) => setSecondCategory(val)}
              disabled={!firstCategory}
            >
              {(secondCategoryOptions[firstCategory] || []).length > 0 ? (
                secondCategoryOptions[firstCategory].map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))
              ) : (
                <Option disabled>No subcategories available</Option>
              )}
            </Select>
          )}

          {/* GL Account & Name */}
          {secondCategory && (
            <>
              <input
                type="text"
                value={glAccount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9-]*$/.test(value)) {
                    setGlAccount(value);
                  }
                }}
                placeholder="GL Account"
                className="w-full rounded-lg border border-blue-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-lg border border-blue-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleCloseModal} className="mr-1 bg-blue-gray-300">
            Cancel
          </Button>
          <Button className="bg-gray-800" onClick={handleSave}>
            Save
          </Button>
          
        </DialogFooter>
      </Dialog>
    </>
    
  );
  
}

export default Profile;
