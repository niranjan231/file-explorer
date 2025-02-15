// src/data.js
export const initialFileSystem = [
    {
      id: 1,
      name: "Documents",
      type: "folder",
      children: [
        {
          id: 2,
          name: "Resume.pdf",
          type: "file",
          content: "This is your resume content.",
        },
        {
          id: 3,
          name: "CoverLetter.docx",
          type: "file",
          content: "This is your cover letter content.",
        },
      ],
    },
    {
      id: 4,
      name: "Pictures",
      type: "folder",
      children: [
        {
          id: 5,
          name: "Vacation.png",
          type: "file",
          content: "Image content here.",
        },
      ],
    },
  ];
  