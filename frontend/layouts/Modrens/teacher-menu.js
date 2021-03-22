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
    title: "ปีการศึกษา",
    href: "/year",
    icon: "fas fa-calendar"
  },
  {
    active: true,
    child: [
      {
        title: "โจทย์ปัญหา",
        href: "/problem-tag/?tab=problems",
        icon: "fa fa-tasks"
      },
      {
        title: "แท็ก",
        href: "/problem-tag/?tab=tag",
        icon: "fas fa-tags"
      }
    ],
    title: "จัดการโจทย์ปัญหา",
    icon: "fa fa-tasks"
  },
  {
    title: "IDE",
    href: "/ide",
    icon: "fas fa-code"
  },
  {
    title: "Dashboard ",
    icon: "fa fa-chart-line",
    href: "/teacher-dashboard"
  },
  {
    header: true,
    title: "นักเรียน",
    hiddenOnCollapse: true
  },
  {
    title: "หน้าหลัก",
    icon: "fas fa-home",
    href: "/student/home"
  },
  {
    title: "Dashboard",
    icon: "fa fa-chart-line",
    href: "/student-dashboard"
  }
];
