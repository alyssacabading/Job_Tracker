"use client";

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

export interface Skills {
  id: number;
  name: string;
}

const defaultSkills: Skills[] = [
  { id: 1, name: "React"},
  { id: 2, name: "Node.js"},
  { id: 3, name: "TypeScript"},
  { id: 4, name: "GraphQL"}
];

export default function Skills() {
  const [skills, setSkills] = useState(defaultSkills);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>("");
  const [tempSkills, setTempSkills] = useState<Skills[]>([]);
  const [skillsToRemove, setSkillsToRemove] = useState<Set<number>>(new Set());

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Cancel editing
  const handleCancelClick = () => {
    setIsEditing(false);
    setNewSkill("");
    setTempSkills([]);
    setSkillsToRemove(new Set());
  };

  // Save changes
  const handleSaveClick = () => {
    const updatedSkills = skills.filter(skill => !skillsToRemove.has(skill.id));
    const updatedTempSkills = tempSkills.filter(skill => !skillsToRemove.has(skill.id));
    setSkills([...updatedSkills, ...updatedTempSkills]);
    setIsEditing(false);
    setNewSkill("");
    setTempSkills([]);
    setSkillsToRemove(new Set());
  };

  // Toggle skill removal
  const handleSkillClick = (id: number) => {
    const newSkillsToRemove = new Set(skillsToRemove);
    if (newSkillsToRemove.has(id)) {
      newSkillsToRemove.delete(id);
    } else {
      newSkillsToRemove.add(id);
    }
    setSkillsToRemove(newSkillsToRemove);
  };

  // Handle new skill input change
  const handleNewSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
  };

  // Handle new skill input key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      setTempSkills([...tempSkills, { id: Date.now(), name: newSkill }]);
      setNewSkill("");
    }
  };

  // Render skill pills
  const renderSkills = (skills: Skills[]) => {
    return skills.map(skill => (
      <div
        key={skill.id}
        onClick={() => isEditing && handleSkillClick(skill.id)}
        className={`px-4 py-1 rounded-xl text-sm font-bold cursor-pointer ${
          isEditing && skillsToRemove.has(skill.id)
            ? "bg-white text-black border-2 border-black"
            : "bg-customblue border-2 border-customblue text-white"
        }`}
      >
        {skill.name}
      </div>
    ));
  };

  return (
    <div className="max-w-screen-md mx-auto flex flex-col items-center pt-10">
      <div className="w-full bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between gap-2">
            <h2 className="text-customdarkgrey text-xl font-bold mb-2">Skills</h2>
            <button
              onClick={handleEditClick}
              className="text-customblue hover:text-custombluehover">
              <FaEdit
                className="cursor-pointer text-customdarkgrey text-xl hover:text-black transition ease-in-out"
              />
            </button>
          </div>

          {isEditing && (
            <div className="flex flex-col gap-2 mb-4">
              <p
                className="text-customdarkgrey font-bold text-md"
              >
                Click a skill if you want to remove that skill.
              </p>
              <input
                type="text"
                value={newSkill}
                onChange={handleNewSkillChange}
                onKeyPress={handleKeyPress}
                placeholder="Add a new skill"
                className="p-2 border rounded-lg bg-custombglightgrey border-custombglightgrey w-full placeholder-italic"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-6">
            {renderSkills(skills)}
            {isEditing && renderSkills(tempSkills)}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3 mt-4 mb-2">
              <button
                onClick={handleCancelClick}
                className="w-32 bg-white p-1 rounded-lg text-base font-bold transition ease-in-out text-black border-2 border-black p-2 rounded hover:border-customdarkgrey hover:text-customdarkgrey"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className="w-32 bg-customblue text-white text-base font-bold p-2 rounded-lg border-2 border-customblue transition ease-in-out hover:bg-custombluehover hover:border-custombluehover"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
