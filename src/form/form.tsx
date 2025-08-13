import React, { useState } from "react";
import { Copy, Plus } from "lucide-react";
import STATES from "../metadata/states.ts";
import ReactFlagsSelect from "react-flags-select";
import StateSelect from "../components/state-select.tsx";
import InfoWithTooltip from "../components/info-tooltip.tsx";

interface FormData {
  vanueTitle: string;
  altName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  parking_fee: boolean;
  parking_info: string;
}

function Form() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState({
    vanueTitle: "",
    altName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zip: "",
    parking_fee: false,
    parking_info: "",
  });

  const [forms, setForms] = useState<FormData[]>([formData]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = type === "checkbox" ? checked : value;
    setForms(updatedForms);
  };

  const validate = () => {
    const newErrors: FormData = {
      vanueTitle: "",
      altName: "",
      address: "",
      city: "",
      country: "",
      state: "",
      zip: "",
      parking_fee: false,
      parking_info: "",
    };
    if (!formData.vanueTitle.trim())
      newErrors.vanueTitle = "Venue Title is required.";
    if (!formData.address.trim()) newErrors.address = "Adress is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!selectedCountry.trim()) newErrors.country = "Country is required.";
    /* if (!selectedState ) newErrors.state = "State is required."; */
    if (!formData.zip.trim()) newErrors.zip = "Zip/Postal is required.";
    if (!formData.parking_info.trim())
      newErrors.parking_info = "Parking Info is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setErrors({});
  };

  const handleCopy = (index) => {
    const copiedForm = { ...forms[index] }; 
    setForms([...forms, copiedForm]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 select-none">
      {forms.map((cloned, index) => {
        return (
          <>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold mr-3">Locations</h2>
                  <InfoWithTooltip />
                </div>
                <div className="flex items-center gap-2 border-[1px] border-gray-300 rounded w-fit p-1 px-3 hover:bg-gray-200 transition cursor-pointer">
                  <Plus />
                  Add New Location
                </div>
              </div>
              {submitted && (
                <p className="mb-4 text-green-600 font-medium">
                  Form submitted!
                </p>
              )}

              <div className="bg-gray-50 p-5 rounded-lg border-[1px] border-gray-200">
                <div className="flex items-center gap-2 bg-white border-[1px] border-gray-300 rounded w-fit p-1 px-3 hover:bg-gray-200 transition cursor-pointer">
                  <button onClick={() => handleCopy(index)}>
                    <Copy /> Copy
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Venue Title</label>
                  <input
                    name="vanueTitle"
                    value={cloned.vanueTitle}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Test"
                  />
                  {errors.vanueTitle && (
                    <p className="text-red-500 text-sm">{errors.vanueTitle}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Alt Name</label>
                  <input
                    name="altName"
                    value={cloned.altName}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border px-3 py-2 rounded"
                  />

                  <label className="text-sm text-gray-500">
                    Example: Gym 1, Gym 2, Gym 3. Leave blank if not using.
                  </label>
                </div>
                <div className="w-full min-h-[1px] bg-gray-300 px-5 mb-5"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="mr-4 w-full">
                    <label className="block mb-1 font-medium">Adress</label>
                    <input
                      name="address"
                      value={cloned.address}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Jalija"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">City</label>
                    <input
                      name="city"
                      value={cloned.city}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="Zenica"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Country</label>
                  <ReactFlagsSelect
                    selected={cloned.country}
                    onSelect={(code) => {
                      const updatedForms = [...forms];
                      updatedForms[index].country = code;
                      setForms(updatedForms);
                    }}
                    placeholder="Select a country"
                  />
                  {!selectedCountry && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-full mr-4">
                    <StateSelect
                      selected={cloned.state}
                      setSelected={(state) => {
                        const updatedForms = [...forms];
                        updatedForms[index].state = state;
                        setForms(updatedForms);
                      }}
                      STATES={STATES}
                    />
                    {!selectedState && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Zip/Postal</label>
                    <input
                      type="number"
                      name="zip"
                      value={cloned.zip}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full border px-3 py-2 rounded"
                      placeholder="00000"
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-sm">{errors.zip}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Parking Fee</label>
                  <div
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        parkingFee: !prev.parkingFee,
                      }))
                    }
                  >
                    <input
                      type="checkbox"
                      checked={cloned.parkingFee}
                      onChange={() => {}}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 transition rounded-full ${
                        cloned.parkingFee ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        cloned.parkingFee ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></div>
                    <span className="ml-3 text-sm text-gray-700">
                      {cloned.parkingFee ? "On" : "Off"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Parking Info</label>
                  <textarea
                    name="parking_info"
                    value={cloned.parking_info}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Free parking"
                  />
                  {errors.parking_info && (
                    <p className="text-red-500 text-sm">
                      {errors.parking_info}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end mt-6 gap-5">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition w-36 border-[1px] border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition w-36"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </>
        );
      })}
    </div>
  );
}

export default Form;
