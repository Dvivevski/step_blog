export const tabs = [
  {
    to: "/admin/dashboard",
    label: "All Posts",
  },
  {
    to: "/admin/blog/new",
    label: "Create blog",
  },
  {
    to: "",
    label: "Logout",
  },
];

export const blogTableData = [
  {
    colName: "Title",
    key: "title",
  },
  //   {
  //     colName: "Author Name",
  //     key: "userName",
  //   },
  {
    colName: "Description",
    key: "description",
  },
  {
    colName: "Is-Active",
    key: "isActive",
  },
  {
    colName: "CreatedAt",
    key: "createdAt",
  },
  {
    colName: "UpdatedAt",
    key: "updatedAt",
  },
  {
    colName: "Actions",
    key: "",
  },
];

export const formatDate = (dte) => {
  const dt = new Date(dte);

  const date = dt.toDateString();
  let minutes = dt.getMinutes();
  let hours = dt.getHours();

  
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${date}, ${hours}:${minutes}`;
};
