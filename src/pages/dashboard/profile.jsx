import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Avatar,
  Typography,
  Chip,
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

  const secondCategoryOptions = {
    "Turnover / Revenues": ["Sales Income", "Sales Discount"],
    "Cost of Sales": ["Cost of Goods Sold - Product Cost", "Freight Cost"],
    "Gross Profit": [],
    "Operating Profit": [],
  };

  return (
    <>
      {/* Background Banner */}
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      {/* Main Card */}
      <Card className="relative mx-4 -mt-16 mb-6 border border-blue-gray-100">
        {/* Add Button */}
        <div className="absolute right-6 -top-5 z-10">
          <Button className="bg-gray-800" onClick={() => setIsModalOpen(true)}>
            Add GL Account
          </Button>
        </div>

        <CardBody className="space-y-8 p-6">
          {/* Search */}
          <div className="max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-blue-gray-200 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["GL Account", "Name", "Category", "SubCategory", ""].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {authorsTableData.map(({ img, name, email, job, online, date, glaccount }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;
                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography variant="small" className="font-semibold text-blue-gray-700">
                              {glaccount}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-700">{job[0]}</Typography>
                        <Typography className="text-xs text-blue-gray-500">{job[1]}</Typography>
                      </td>
                      <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-700">{date}</Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-700">{date}</Typography>
                      </td>
                      <td className={className}>
                        <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <DialogHeader>Add GL Account</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Select
            label="Select Category"
            value={firstCategory}
            onChange={(value) => {
              setFirstCategory(value);
              setSecondCategory("");
            }}
          >
            {Object.keys(secondCategoryOptions).map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>

          <Select
            label="Select Subcategory"
            value={secondCategory}
            onChange={(val) => setSecondCategory(val)}
            disabled={!firstCategory}
          >
            {(secondCategoryOptions[firstCategory] || []).length > 0 ? (
              secondCategoryOptions[firstCategory].map((item) => (
                <Option key={item}>{item}</Option>
              ))
            ) : (
              <Option disabled>No subcategories available</Option>
            )}
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setIsModalOpen(false)} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={() => setIsModalOpen(false)}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
