// useful people functions

import Person1Image from '../images/people/person1.png';
import Person2Image from '../images/people/person2.png';
import Person3Image from '../images/people/person3.png';
import Person4Image from '../images/people/person4.png';

import {
  PERSON_1,
  PERSON_2,
  PERSON_3,
  PERSON_4,
} from './constants';

// convert a person to their image
export const personToImage = (person) => {
  if (person === PERSON_1) return Person1Image;
  if (person === PERSON_2) return Person2Image;
  if (person === PERSON_3) return Person3Image;
  return Person4Image;
};

// create the people a solution
export const createSolutionPeople = () => [PERSON_2, PERSON_4, PERSON_1, PERSON_3];
