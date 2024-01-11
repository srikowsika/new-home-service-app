"use client";
import React ,{Fragment, useState, useRef} from 'react'
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

const Location =  (props) => {
    const [selectedLocation, setLocation] = useState("Location");
    const [open, setOpen] = useState(true);
    const cityList=props.cityList;
    const cancelButtonRef= useRef(null)
    const handleLocationModal = () => {
        setOpen(!open);
    },
     selectCity = (selectedValue) => {
      setOpen(false)
      setLocation(selectedValue.city)
    };
  return (
    <div onClick={handleLocationModal} className="location-btn">
      <MapPinIcon className="h-6 w-6 text-blue-500" />
      <p>{selectedLocation}</p>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Select City
                        </Dialog.Title>
                        <div className="p-5">
                          <div className="flex flex-wrap">
                            {(cityList || []).map((city, index) => {
                              return (
                                <div
                                  className="flex flex-col items-center w-2/6 gap-1 py-5"
                                  onClick={() => selectCity(city)}
                                  key={index}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    width="50"
                                    height="50"
                                    src={city.imageURL}
                                    alt={city.city}
                                  ></img>
                                  <div>{city.city}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Location