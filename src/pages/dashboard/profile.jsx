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

export function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstCategory, setFirstCategory] = useState("");
  const [secondCategory, setSecondCategory] = useState("");
  const [glAccount, setGlAccount] = useState("");
  const [name, setName] = useState("");

  const secondCategoryOptions = {
    "Turnover / Revenues": ["Sales Income", "Sales Discount"],
    "Cost of Sales": ["Cost of Goods Sold - Product Cost", "Freight Cost"],
    "Gross Profit": [],
    "Operating Profit": [],
  };

  const handleOpenModal = () => {
    // Reset all fields when opening the modal
    setFirstCategory("");
    setSecondCategory("");
    setGlAccount("");
    setName("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          <div className="max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Table goes here... */}
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
    key={firstCategory} // <-- THIS FORCES RE-RENDER WHEN CATEGORY CHANGES
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
          {/* Show these only when a subcategory is selected */}
          {secondCategory && (
            <>
              <input
                type="text"
                value={glAccount}
                onChange={(e) => setGlAccount(e.target.value)}
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
          <Button variant="text" color="red" onClick={handleCloseModal} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleCloseModal}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
