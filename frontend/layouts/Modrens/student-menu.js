export default [
  //Student menu
  {
    header: true,
    title: "นักเรียน",
    hiddenOnCollapse: true
  },
  {
    title: "หน้าหลัก",
    icon: "fa fa-download",
    href: "/student/homestu"
  },
  {
    child: [
      { title: "88824125", href: "/assignment", icon: "fa fa-download" },
      {
        title: "88824154",
        href: "/student/homework",
        icon: "fa fa-download"
      }
    ],
    title: "การบ้าน",
    icon: "fa fa-download"
  },
  {
    title: "Dashboard",
    icon: "fa fa-download",
    href: "/error"
  }
];
