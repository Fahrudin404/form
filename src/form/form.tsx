import React, { useState } from "react";
import { Copy, Plus } from "lucide-react";
import STATES from "../metadata/states.ts";
import ReactFlagsSelect from "react-flags-select";
import StateSelect from "../components/state-select.tsx";
import InfoWithTooltip from "../components/info-tooltip.tsx";
import { FormData } from "../metadata/interfaces.ts";

function Form() {
  const emptyForm: FormData = {
    vanueTitle: "",
    altName: "",
    address: "",
    city: "",
    country: "",
    state: { id: "", name: "" },
    zip: "",
    parking_fee: false,
    parking_info: "",
  };

  const [forms, setForms] = useState<FormData[]>([emptyForm]);
  const [errors, setErrors] = useState<Partial<FormData>[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name as keyof FormData] =
      type === "checkbox" ? checked : value;
    setForms(updatedForms);
  };

  const handleCountryChange = (index: number, code: string) => {
    const updatedForms = [...forms];
    updatedForms[index].country = code;
    setForms(updatedForms);
  };

  const handleStateChange = (index: number, state: string) => {
    const updatedForms = [...forms];
    updatedForms[index].state = state;
    setForms(updatedForms);
  };

  type FormErrors = {
    [K in keyof FormData]?: string;
  };

  const validateAll = () => {
    const allErrors = forms.map((form) => {
      const newErrors: FormErrors = {};
      if (!form.vanueTitle.trim()) newErrors.vanueTitle = "Venue Title is required.";
      if (!form.address.trim()) newErrors.address = "Address is required.";
      if (!form.city.trim()) newErrors.city = "City is required.";
      if (!form.country.trim()) newErrors.country = "Country is required.";
      if (!form.state.name.trim()) newErrors.state = "State is required.";
      if (!form.zip.trim()) newErrors.zip = "Zip/Postal is required.";
      if (!form.parking_info.trim()) newErrors.parking_info = "Parking Info is required.";
      return newErrors;
    });
    return allErrors;
  };

  const handleSave = () => {
    const validationResults = validateAll();
    const hasErrors = validationResults.some(
      (errObj) => Object.keys(errObj).length > 0
    );

    if (hasErrors) {
      setErrors(validationResults);
    } else {
      setErrors([]);
      setShowSuccessPopup(true);
      console.log("All forms submitted:", forms);
    }
  };

  const handleCopy = (index: number) => {
    const copiedForm = { ...forms[index] };
    setForms([...forms, copiedForm]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 select-none">
      {
      forms.map((form, index) => (
        <form
          key={index}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-6 border border-gray-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold mr-3">Locations</h2>
              <InfoWithTooltip />
            </div>
            <div
              onClick={() => setForms([...forms, emptyForm])}
              className="flex items-center gap-2 border border-gray-300 bg-white rounded p-1 px-3 hover:bg-gray-200 transition cursor-pointer"
            >
              <Plus />
              Add New Location
            </div>
          </div>
          <div className="p-5 rounded-lg border border-gray-300">
            <div
              className="flex items-center gap-2 bg-white border border-gray-300 rounded p-1 px-3 hover:bg-gray-200 transition cursor-pointer w-fit"
              onClick={() => handleCopy(index)}
            >
              <Copy /> Copy
            </div>

            {/* Venue Title */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Venue Title</label>
              <input
                name="vanueTitle"
                value={form.vanueTitle}
                onChange={(e) => handleChange(index, e)}
                className={`w-full border border-gray-300 bg-white px-3 py-2 rounded p-[1px] ${
                  errors[index]?.vanueTitle ? "border-red-500" : " bg-gray-300 "
                }`}
                placeholder="Test"
              />
              {errors[index]?.vanueTitle && (
                <p className="text-red-500 text-sm">
                  {errors[index].vanueTitle}
                </p>
              )}
            </div>

            {/* Alt Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Alt Name</label>
              <input
                name="altName"
                value={form.altName}
                onChange={(e) => handleChange(index, e)}
                className={`w-full border border-gray-300 bg-white px-3 py-2 rounded p-[1px] ${
                  errors[index]?.altName ? "border-red-500" : " bg-gray-300 "
                }`}
                placeholder="Test"
              />
              <label className="text-gray-400">
                Example: Gym 1, Gym2, Gym3. Leave blank if not using.
              </label>
              {errors[index]?.altName && (
                <p className="text-red-500 text-sm">{errors[index].altName}</p>
              )}
            </div>

            {/* Address / City */}
            <div className="flex gap-4 mb-4">
              <div className="w-full">
                <label className="block mb-1 font-medium">Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={(e) => handleChange(index, e)}
                  className={`w-full border border-gray-300 bg-white px-3 py-2 rounded ${
                    errors[index]?.address ? "border-red-500" : " bg-gray-300 "
                  }`}
                  placeholder="Street name"
                />
                {errors[index]?.address && (
                  <p className="text-red-500 text-sm">
                    {errors[index].address}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-1 font-medium">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={(e) => handleChange(index, e)}
                  className={`w-full border border-gray-300 bg-white px-3 py-2 rounded ${
                    errors[index]?.city ? "border-red-500" : ""
                  }`}
                  placeholder="City name"
                />
                {errors[index]?.city && (
                  <p className="text-red-500 text-sm">{errors[index].city}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div className="mb-4">
              <label className="block font-medium">Country</label>
              <div
                className={`rounded border-[1px] ${
                  errors[index]?.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <ReactFlagsSelect
                  selected={form.country}
                  onSelect={(code) => handleCountryChange(index, code)}
                  placeholder="Select a country"
                  className={`my-flag-select w-full bg-white px-3 py-2 rounded `}
                  searchable
                />
              </div>
              {errors[index]?.country && (
                <p className="text-red-500 text-sm">{errors[index].country}</p>
              )}
            </div>

            {/* State / Zip */}
            <div className="flex gap-4 mb-4">
              <div className="w-full">
                <StateSelect
                  selected={form.state}
                  setSelected={(state) => handleStateChange(index, state)}
                  STATES={STATES}
                  className={`${errors[index]?.state ? "border-red-500" : ""}`}
                />
                {errors[index]?.state && (
                  <p className="text-red-500 text-sm">{errors[index].state}</p>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-1 font-medium">Zip/Postal</label>
                <input
                  type="number"
                  name="zip"
                  value={form.zip}
                  onChange={(e) => handleChange(index, e)}
                  className={`w-full border border-gray-300 bg-white px-3 py-2 rounded ${
                    errors[index]?.zip ? "border-red-500" : ""
                  }`}
                  placeholder="00000"
                />
                {errors[index]?.zip && (
                  <p className="text-red-500 text-sm">{errors[index].zip}</p>
                )}
              </div>
            </div>

            {/* Parking Fee */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Parking Fee</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={form.parking_fee}
                  onChange={(e) =>
                    handleChange(index, {
                      target: { name: "parking_fee", value: e.target.checked },
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-purple-600 peer-focus:ring-2 peer-focus:ring-purple-500 transition-all"></div>
                <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full"></div>
                <span className="ml-3 text-sm text-gray-700">
                  {form.parking_fee ? "Yes" : "No"}
                </span>
              </label>
            </div>

            {/* Parking Info */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Parking Info</label>
              <textarea
                name="parking_info"
                value={form.parking_info}
                onChange={(e) => handleChange(index, e)}
                className={`w-full border border-gray-300 bg-white px-3 py-2 rounded ${
                  errors[index]?.parking_info ? "border-red-500" : ""
                }`}
                placeholder="Free parking"
              />
              {errors[index]?.parking_info && (
                <p className="text-red-500 text-sm">
                  {errors[index].parking_info}
                </p>
              )}
            </div>
          </div>

          {showSuccessPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative text-center">
                {/* Exit Button */}
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                  ×
                </button>

                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Success!
                </h2>
                <p className="text-gray-700">All forms saved successfully!</p>

                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="mt-6 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
      ))}

      {/* Single Save Button */}
      <div className="flex gap-4 mt-4 justify-end w-full max-w-2xl">
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition w-36 border border-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition w-36"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Form;
