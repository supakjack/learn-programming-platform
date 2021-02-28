export default [
  //Teacher menu
  {
    header: true,
    title: "อาจารย์",
    hiddenOnCollapse: true
  },
  {
    title: "หน้าหลัก",
    href: "/home",
    icon: "fas fa-home"
  },
  {
    active: true,
    child: [
      {
        title: "โจทย์ปัญหา",
        href: "/problem-tag/?tab=problems",
        icon: "fa fa-download"
      },
      {
        title: "แท็ก",
        href: "/problem-tag/?tab=tag",
        icon: "fas fa-tags"
      }
    ],
    title: "จัดการโจทย์ปัญหา",
    icon: "fa fa-download"
  },
  {
    title: "IDE",
    href: "/ide",
    icon: "fas fa-code"
  },
  {
    title: "Dashboard ",
    icon: "fa fa-download",
    href: "/teacher-dashboard"
  },
  {
    header: true,
    title: "นักเรียน",
    hiddenOnCollapse: true
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
    href: "/student-dashboard"
  }
];
