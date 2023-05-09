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

  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${date}, ${hours}:${minutes} ${ampm.toUpperCase()}`;
};
