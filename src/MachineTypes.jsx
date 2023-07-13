import React, { useState, useEffect } from "react";

const MachineTypes = () => {
  const [machineTypes, setMachineTypes] = useState(() => {
    const savedData = localStorage.getItem("machineTypes");
    return savedData
      ? JSON.parse(savedData)
      : [
          {
            id: 1,
            name: "Bull Dozers",
            sharedAttributes: ["Model", "Weight", "Manufacturing Date"],
            specificAttributes: [],
            titleAttribute: "Model",
            title: "Bull Dozers",
            machines: [
              { id: 1, brand: "Brand A", characteristics: "Characteristics A" },
              { id: 2, brand: "Brand B", characteristics: "Characteristics B" },
            ],
          },
          {
            id: 2,
            name: "Cranes",
            sharedAttributes: [
              "Model",
              "Weight",
              "Manufacturing Date",
              "Maximum Lift Weight",
            ],
            specificAttributes: [],
            titleAttribute: "Model",
            title: "Cranes",
            machines: [
              { id: 1, brand: "Brand X", characteristics: "Characteristics X" },
              { id: 2, brand: "Brand Y", characteristics: "Characteristics Y" },
            ],
          },
          {
            id: 3,
            name: "Chainsaws",
            sharedAttributes: ["Model", "Weight", "Manufacturing Date"],
            specificAttributes: ["Bar Length"],
            titleAttribute: "Model",
            title: "Chainsaws",
            machines: [
              { id: 1, brand: "Brand P", characteristics: "Characteristics P" },
              { id: 2, brand: "Brand Q", characteristics: "Characteristics Q" },
            ],
          },
        ];
  });

  const [newMachine, setNewMachine] = useState({
    brand: "",
    characteristics: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(() => {
    localStorage.setItem("machineTypes", JSON.stringify(machineTypes));
  }, [machineTypes]);

  const handleNewMachineChange = (e) => {
    setNewMachine((prevMachine) => ({
      ...prevMachine,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddMachine = (machineTypeIndex) => {
    const machineType = machineTypes[machineTypeIndex];
    const newMachineId = Date.now();
    const newMachineType = {
      ...machineType,
      machines: [...machineType.machines, { id: newMachineId, ...newMachine }],
    };
    const updatedMachineTypes = [...machineTypes];
    updatedMachineTypes[machineTypeIndex] = newMachineType;
    setMachineTypes(updatedMachineTypes);
    setNewMachine({ brand: "", characteristics: "" });
  };

  const handleEditMachine = (machineTypeIndex, machineIndex, machine) => {
    setSelectedMachine({ machineTypeIndex, machineIndex });
    setEditMode(true);
    setNewMachine(machine);
  };

  const handleUpdateMachine = () => {
    if (
      selectedMachine &&
      newMachine.brand.trim() !== "" &&
      newMachine.characteristics.trim() !== ""
    ) {
      const { machineTypeIndex, machineIndex } = selectedMachine;
      const updatedMachineTypes = [...machineTypes];
      const updatedMachineType = { ...updatedMachineTypes[machineTypeIndex] };
      const updatedMachines = [...updatedMachineType.machines];
      updatedMachines[machineIndex] = { ...newMachine };
      updatedMachineType.machines = updatedMachines;
      updatedMachineTypes[machineTypeIndex] = updatedMachineType;
      setMachineTypes(updatedMachineTypes);
      setNewMachine({ brand: "", characteristics: "" });
      setSelectedMachine(null);
      setEditMode(false);
    }
  };

  const handleDeleteMachine = (machineTypeIndex, machineIndex) => {
    const updatedMachineTypes = [...machineTypes];
    const updatedMachineType = { ...updatedMachineTypes[machineTypeIndex] };
    const updatedMachines = [...updatedMachineType.machines];
    updatedMachines.splice(machineIndex, 1);
    updatedMachineType.machines = updatedMachines;
    updatedMachineTypes[machineTypeIndex] = updatedMachineType;
    setMachineTypes(updatedMachineTypes);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">All Machines</h2>
      {machineTypes.map((type, typeIndex) => (
        <div
          key={type.id}
          className="w-full md:w-2/3 lg:w-1/2 bg-slate-50 rounded-xl shadow-2xl mb-10 p-2 border-2 border-gray-400/50"
        >
          <div className="p-6 mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center uppercase">{type.title}</h3>
            <div>
              <h4 className="font-medium mb-2 underline underline-offset-2">Shared Attributes</h4>
              <ul className="list-disc pl-6">
                {type.sharedAttributes.map((attribute, index) => (
                  <li key={index}>{attribute}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2 underline underline-offset-2">Specific Attributes</h4>
              <ul className="list-disc pl-6">
                {type.specificAttributes.map((attribute, index) => (
                  <li key={index}>{attribute}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2 underline underline-offset-2">Machines</h4>
              <ul className="pl-6 list-decimal">
                {type.machines.map((machine, machineIndex) => (
                  <li key={machine.id}>
                    <div>
                      <span className="font-medium">Brand: </span>
                      {machine.brand}
                    </div>
                    <div>
                      <span className="font-medium">Characteristics: </span>
                      {machine.characteristics}
                    </div>
                    <div className="flex items-center gap-10 p-3 mt-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 font-medium mr-2 shadow-md rounded-md hover:opacity-80"
                        onClick={() =>
                          handleEditMachine(typeIndex, machineIndex, machine)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 font-medium shadow-md rounded-md hover:opacity-80"
                        onClick={() =>
                          handleDeleteMachine(typeIndex, machineIndex)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {editMode &&
            selectedMachine &&
            selectedMachine.machineTypeIndex === typeIndex && (
              <div className="bg-gray-200 p-6">
                <h4 className="text-lg font-medium mb-4">Edit Machine:</h4>
                <div className="flex items-center mb-4">
                  <span className="font-medium mr-2">Brand:</span>
                  <input
                    type="text"
                    name="brand"
                    value={newMachine.brand}
                    onChange={handleNewMachineChange}
                    className="border rounded-md p-2"
                    placeholder="Brand"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <span className="font-medium mr-2">Characteristics:</span>
                  <input
                    type="text"
                    name="characteristics"
                    value={newMachine.characteristics}
                    onChange={handleNewMachineChange}
                    className="border rounded-md p-2"
                    placeholder="Characteristics"
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md mr-2"
                    onClick={handleUpdateMachine}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gray-400 text-white font-medium px-4 py-2 rounded-md"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          {!editMode && (
            <div className="bg-gray-200 p-6 outline-dashed outline-offset-1 outline-gray-500 rounded-lg">
              <h4 className="text-lg font-bold mb-4 text-center">Add New Machine</h4>
              <div className="flex items-center mb-4">
                <span className="font-medium mr-2">Brand:</span>
                <input
                  type="text"
                  name="brand"
                  value={newMachine.brand}
                  onChange={handleNewMachineChange}
                  className="border rounded-md p-2"
                  placeholder="Brand"
                />
              </div>
              <div className="flex items-center mb-4">
                <span className="font-medium mr-2">Characteristics:</span>
                <input
                  type="text"
                  name="characteristics"
                  value={newMachine.characteristics}
                  onChange={handleNewMachineChange}
                  className="border rounded-md p-2"
                  placeholder="Characteristics"
                />
              </div>
              <div className="flex justify-center items-center p-3">
                <button
                  className="bg-green-600 text-white font-medium px-4 py-2 rounded-md shadow-lg cursor-pointer hover:opacity-80 hover:shadow-xl"
                  onClick={() => handleAddMachine(typeIndex)}
                >
                  Add Machine
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MachineTypes;
