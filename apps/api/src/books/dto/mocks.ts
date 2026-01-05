import { randomUUID } from 'crypto';
import { BookDto } from './book.dto';

const cleanCodeBook: BookDto = {
  id: randomUUID(),
  title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  summary:
    'Clean Code explains how to write readable, maintainable, and expressive software. Through principles, patterns, and case studies, it shows how small design decisions accumulate into codebases that are either a joy or a burden to work with.',
  // author: {
  //   name: 'Robert C. Martin',
  //   bio: 'Robert C. Martin, also known as Uncle Bob, is a software engineer and author known for his work on agile practices, software craftsmanship, and clean architecture.',
  // },
  chapters: [
    {
      title: 'Clean Code',
      number: 1,
      content:
        'Introduces the idea that code is read far more often than it is written, and that cleanliness directly impacts long-term development speed and quality.',
    },
    {
      title: 'Meaningful Names',
      number: 2,
      content:
        'Explains how good names convey intent, avoid ambiguity, and reduce the need for comments or additional explanation.',
    },
    {
      title: 'Functions',
      number: 3,
      content:
        'Argues for small, focused functions that do one thing, use descriptive names, and minimize side effects.',
    },
    {
      title: 'Comments',
      number: 4,
      content:
        'Emphasizes that comments should explain why something exists, not what the code already makes clear.',
    },
    {
      title: 'Formatting',
      number: 5,
      content:
        'Shows how consistent formatting improves readability and communicates structure and intent to other developers.',
    },
    {
      title: 'Objects and Data Structures',
      number: 6,
      content:
        'Discusses the trade-offs between object-oriented designs and data-oriented approaches, and how to choose appropriately.',
    },
    {
      title: 'Error Handling',
      number: 7,
      content:
        'Encourages treating error handling as a first-class concern, using exceptions and clear intent rather than scattered checks.',
    },
    {
      title: 'Classes',
      number: 8,
      content:
        'Describes how well-designed classes are small, cohesive, and adhere to principles like the Single Responsibility Principle.',
    },
    {
      title: 'Systems',
      number: 9,
      content:
        'Explores how clean code principles scale from small components to entire systems and architectures.',
    },
  ],
};

const sixEasyPiecesBook: BookDto = {
  id: randomUUID(),
  title:
    'Six Easy Pieces: Essentials of Physics Explained by Its Most Brilliant Teacher',
  summary:
    'Six Easy Pieces is a concise introduction to fundamental concepts in physics, drawn from Richard Feynman’s celebrated lectures. The book emphasizes physical intuition, clarity of reasoning, and the deep principles underlying natural laws.',
  // author: {
  //   name: 'Richard P. Feynman',
  //   bio: 'Richard P. Feynman was a theoretical physicist known for his work in quantum electrodynamics, his Nobel Prize in Physics, and his exceptional ability to explain complex ideas with clarity and insight.',
  // },
  chapters: [
    {
      title: 'Preface',
      number: 1,
      content:
        'Explains the origin of the book from Feynman’s lectures and his goal of conveying the spirit of physics rather than formal derivations.',
    },
    {
      title: 'The Law of Gravitation',
      number: 2,
      content:
        'Introduces gravity as a universal interaction, highlighting Newton’s insight and the mystery behind why masses attract each other.',
    },
    {
      title: 'The Relation of Mathematics to Physics',
      number: 3,
      content:
        'Discusses mathematics as the language of nature, emphasizing its power to describe physical laws despite its abstract origins.',
    },
    {
      title: 'The Great Conservation Principles',
      number: 4,
      content:
        'Explores fundamental conservation laws, such as energy and momentum, as deep invariants that govern all physical processes.',
    },
    {
      title: 'Symmetry in Physical Laws',
      number: 5,
      content:
        'Shows how symmetry principles guide modern physics and reveal what remains unchanged when systems are transformed.',
    },
    {
      title: 'Quantum Behavior',
      number: 6,
      content:
        'Introduces the strange and counterintuitive nature of quantum mechanics, focusing on probability, uncertainty, and measurement.',
    },
  ],
};

export const mockLibrary: BookDto[] = [sixEasyPiecesBook, cleanCodeBook];
