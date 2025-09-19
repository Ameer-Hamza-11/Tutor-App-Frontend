import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchCities, fetchCountries } from "../apis/fetchApi";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const AddressForm = ({ setAddress }) => {
  const [form, setForm] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City_Id: "",
    Country_Id: "",
    Postal_Code: "",
    Latitude: "",
    Longitude: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    setAddress(updated);
  };

  // ✅ Handle select change (Country / City)
  const handleSelect = (name, value) => {
    const updated = { ...form, [name]: value };
    setForm(updated);
    setAddress(updated);
  };

  // ✅ Fetch cities & countries
  const { data: cities, isLoading: loadingCities, error: errorCities } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  const { data: countries, isLoading: loadingCountries, error: errorCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-pink-400">Address</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Address Line 1 */}
        <input
          name="AddressLine1"
          placeholder="Address Line 1"
          value={form.AddressLine1}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Address Line 2 */}
        <input
          name="AddressLine2"
          placeholder="Address Line 2 (optional)"
          value={form.AddressLine2}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Country Dropdown with Listbox */}
        <div>
          <label className="block text-sm text-pink-300 mb-1">Select Country</label>
          {loadingCountries && <p className="text-gray-400">Loading countries...</p>}
          {errorCountries && <p className="text-red-400">Failed to load countries</p>}

          <Listbox
            value={form.Country_Id}
            onChange={(value) => handleSelect("Country_Id", value)}
          >
            <div className="relative">
              <Listbox.Button className="w-full flex justify-between items-center p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 cursor-pointer hover:border-pink-400 hover:bg-white/20">
                <span>
                  {form.Country_Id
                    ? countries?.find((c) => c.Country_Id === form.Country_Id)?.Country_Name
                    : "-- Select Country --"}
                </span>
                <ChevronDown className="w-4 h-4 text-pink-300" />
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 w-full bg-indigo-800 rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                {countries?.map((country) => (
                  <Listbox.Option
                    key={country.Country_Id}
                    value={country.Country_Id}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-pink-600 text-white" : "text-gray-200"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span>{country.Country_Name}</span>
                        {selected && <Check className="w-4 h-4 text-green-400" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* City Dropdown with Listbox */}
        <div>
          <label className="block text-sm text-pink-300 mb-1">Select City</label>
          {loadingCities && <p className="text-gray-400">Loading cities...</p>}
          {errorCities && <p className="text-red-400">Failed to load cities</p>}

          <Listbox
            value={form.City_Id}
            onChange={(value) => handleSelect("City_Id", value)}
          >
            <div className="relative">
              <Listbox.Button className="w-full flex justify-between items-center p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 cursor-pointer hover:border-pink-400 hover:bg-white/20">
                <span>
                  {form.City_Id
                    ? cities?.find((c) => c.City_Id === form.City_Id)?.City_Name
                    : "-- Select City --"}
                </span>
                <ChevronDown className="w-4 h-4 text-pink-300" />
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 w-full bg-indigo-800 rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                {cities?.map((city) => (
                  <Listbox.Option
                    key={city.City_Id}
                    value={city.City_Id}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-pink-600 text-white" : "text-gray-200"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center justify-between">
                        <span>{city.City_Name}</span>
                        {selected && <Check className="w-4 h-4 text-green-400" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Postal Code */}
        <input
          name="Postal_Code"
          placeholder="Postal Code"
          value={form.Postal_Code}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Latitude */}
        <input
          name="Latitude"
          placeholder="Latitude"
          value={form.Latitude}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />

        {/* Longitude */}
        <input
          name="Longitude"
          placeholder="Longitude"
          value={form.Longitude}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
        />
      </div>
    </motion.div>
  );
};

export default AddressForm;
