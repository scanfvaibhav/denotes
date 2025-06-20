import type { TreeNode } from "../types/tree"

export const menuData: TreeNode[] = [
  {
    id: "1",
    label: "Frontend Development",
    description:
      "Frontend development involves creating the user interface and user experience of web applications. It includes HTML, CSS, JavaScript, and modern frameworks.",
    children: [
      {
        id: "1-1",
        label: "React",
        description:
          "React is a JavaScript library for building user interfaces, particularly web applications. It uses a component-based architecture and virtual DOM.",
        children: [
          {
            id: "1-1-1",
            label: "Hooks",
            description:
              "React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, and useContext.",
          },
          {
            id: "1-1-2",
            label: "Components",
            description:
              "React components are reusable pieces of UI that can accept props and manage their own state. They can be functional or class-based.",
          },
          {
            id: "1-1-3",
            label: "State Management",
            description:
              "State management in React involves handling data that changes over time. Options include local state, Context API, Redux, and Zustand.",
            children: [
              {
                id: "1-1-3-1",
                label: "Redux",
                description:
                  "Redux is a predictable state container for JavaScript apps. It helps manage application state in a centralized store.",
              },
              {
                id: "1-1-3-2",
                label: "Context API",
                description:
                  "React Context API provides a way to pass data through the component tree without having to pass props down manually at every level.",
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        label: "Vue.js",
        description:
          "Vue.js is a progressive JavaScript framework for building user interfaces. It is designed to be incrementally adoptable and focuses on the view layer.",
      },
      {
        id: "1-3",
        label: "Angular",
        description:
          "Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It implements core and optional functionality as TypeScript libraries.",
      },
    ],
  },
  {
    id: "2",
    label: "Backend Development",
    description:
      "Backend development focuses on server-side logic, databases, APIs, and infrastructure that powers web applications.",
    children: [
      {
        id: "2-1",
        label: "Node.js",
        description:
          "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side.",
        children: [
          {
            id: "2-1-1",
            label: "Express.js",
            description:
              "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
          },
          {
            id: "2-1-2",
            label: "Fastify",
            description:
              "Fastify is a fast and low overhead web framework for Node.js. It provides excellent performance and developer experience.",
          },
        ],
      },
      {
        id: "2-2",
        label: "Python",
        description:
          "Python is a high-level programming language known for its simplicity and readability. It's widely used for web development, data science, and automation.",
        children: [
          {
            id: "2-2-1",
            label: "Django",
            description:
              "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.",
          },
          {
            id: "2-2-2",
            label: "FastAPI",
            description:
              "FastAPI is a modern, fast web framework for building APIs with Python 3.6+ based on standard Python type hints.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    label: "Database",
    description:
      "Databases are organized collections of data that can be easily accessed, managed, and updated. They are essential for storing and retrieving application data.",
    children: [
      {
        id: "3-1",
        label: "SQL Databases",
        description:
          "SQL databases use Structured Query Language and follow ACID properties. They are ideal for complex queries and transactions.",
        children: [
          {
            id: "3-1-1",
            label: "PostgreSQL",
            description:
              "PostgreSQL is a powerful, open-source object-relational database system with strong reputation for reliability and performance.",
          },
          {
            id: "3-1-2",
            label: "MySQL",
            description:
              "MySQL is an open-source relational database management system. It is widely used for web applications and online publishing.",
          },
        ],
      },
      {
        id: "3-2",
        label: "NoSQL Databases",
        description:
          "NoSQL databases provide flexible schemas and are designed to handle large volumes of unstructured data.",
        children: [
          {
            id: "3-2-1",
            label: "MongoDB",
            description:
              "MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents.",
          },
          {
            id: "3-2-2",
            label: "Redis",
            description: "Redis is an in-memory data structure store used as a database, cache, and message broker.",
          },
        ],
      },
    ],
  },
]
