import mongoose, { Model } from 'mongoose';
import Job from '../models/job.js';
import Skill from '../models/skill.js';
import Contact from '../models/contact.js';  
import User from '../models/user.js';        

enum EntityType {
  Job = 'Job',
  Skill = 'Skill',
  Contact = 'Contact',
  User = 'User',
}

// validates the string ID is a valid MongoDB ObjectId and exists in the database
export async function validateId(id: string, entityType: EntityType) {
  
  // verify that the ID is present in the request
  if (!id){
    throw new Error('ID is missing in the URL');
  }

  // verify that the ID is a valid MongoDB ObjectId
  if (!mongoose.isValidObjectId(id)){
    throw new Error('Invalid MongoDB ID formatting');
  }

  // assign correct MongoDB model from input EntityType:
  let selectedModel: Model<any> | undefined;
  if (entityType === EntityType.Job) {
    selectedModel = Job; 
  } else if (entityType === EntityType.Skill) {
    selectedModel = Skill; 
  } else if (entityType === EntityType.Contact) {
    selectedModel = Contact; 
  } else if (entityType === EntityType.User) {
    selectedModel = User; 
  } else {
      // catch all for invalid EntityType
      throw new Error('Invalid EntityType provided');
  }

  // final validation - check if ID of selected entity exists in the database
  const entity = await selectedModel.findById(id); 
  if (!entity){
    throw new Error(`${entityType} ID not found in Database`);
  }
  return entity; 
}

export { EntityType }; 