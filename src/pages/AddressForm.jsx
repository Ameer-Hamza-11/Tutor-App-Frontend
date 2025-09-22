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

  // ✅ Handle select change
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

  const { data: countries, isLoading: loadingCountries, error: errorCountries } =
    useQuery({
      queryKey: ["countries"],
      queryFn: fetchCountries,
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#1e1c2e] text-gray-900 dark:text-gray-200 
                 rounded-xl shadow-lg p-6 space-y-6 border border-gray-200 dark:border-orange-400/20"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-orange-500">
        Address
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Address Line 1 */}
        <input
          name="AddressLine1"
          placeholder="Address Line 1"
          value={form.AddressLine1}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />

        {/* Address Line 2 */}
        <input
          name="AddressLine2"
          placeholder="Address Line 2 (optional)"
          value={form.AddressLine2}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />

        {/* Country Dropdown */}
        <div>
          <label className="block text-sm text-orange-500 mb-1">
            Select Country
          </label>
          {loadingCountries && (
            <p className="text-gray-400">Loading countries...</p>
          )}
          {errorCountries && (
            <p className="text-red-500">Failed to load countries</p>
          )}

          <Listbox
            value={form.Country_Id}
            onChange={(value) => handleSelect("Country_Id", value)}
          >
            <div className="relative">
              <Listbox.Button className="w-full flex justify-between items-center p-3 rounded-lg 
                                          bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                                          focus:ring-2 focus:ring-orange-400 cursor-pointer hover:border-orange-400">
                <span>
                  {form.Country_Id
                    ? countries?.find((c) => c.Country_Id === form.Country_Id)
                        ?.Country_Name
                    : "-- Select Country --"}
                </span>
                <ChevronDown className="w-4 h-4 text-orange-500" />
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-[#2a273d] rounded-lg shadow-lg z-10 max-h-48 overflow-auto border border-gray-200 dark:border-gray-700">
                {countries?.map((country) => (
                  <Listbox.Option
                    key={country.Country_Id}
                    value={country.Country_Id}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active
                          ? "bg-orange-500 text-white"
                          : "text-gray-700 dark:text-gray-200"
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

        {/* City Dropdown */}
        <div>
          <label className="block text-sm text-orange-500 mb-1">Select City</label>
          {loadingCities && <p className="text-gray-400">Loading cities...</p>}
          {errorCities && <p className="text-red-500">Failed to load cities</p>}

          <Listbox
            value={form.City_Id}
            onChange={(value) => handleSelect("City_Id", value)}
          >
            <div className="relative">
              <Listbox.Button className="w-full flex justify-between items-center p-3 rounded-lg 
                                          bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                                          focus:ring-2 focus:ring-orange-400 cursor-pointer hover:border-orange-400">
                <span>
                  {form.City_Id
                    ? cities?.find((c) => c.City_Id === form.City_Id)?.City_Name
                    : "-- Select City --"}
                </span>
                <ChevronDown className="w-4 h-4 text-orange-500" />
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-[#2a273d] rounded-lg shadow-lg z-10 max-h-48 overflow-auto border border-gray-200 dark:border-gray-700">
                {cities?.map((city) => (
                  <Listbox.Option
                    key={city.City_Id}
                    value={city.City_Id}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active
                          ? "bg-orange-500 text-white"
                          : "text-gray-700 dark:text-gray-200"
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
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />

        {/* Latitude */}
        <input
          name="Latitude"
          placeholder="Latitude"
          value={form.Latitude}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />

        {/* Longitude */}
        <input
          name="Longitude"
          placeholder="Longitude"
          value={form.Longitude}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                     focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>
    </motion.div>
  );
};

export default AddressForm;
