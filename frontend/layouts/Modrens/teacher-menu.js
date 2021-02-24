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

    // child: [{ title: "หน้าหลัก", href: "/home" }],
  },
  {
    child: [
      {
        title: "มอบหมาย",
        href: "/assignment?tab=assignment",
        icon: "fas fa-tasks"
      },
      {
        title: "ผู้ใช้งาน",
        href: "/assignment?tab=user",
        icon: "fas fa-id-card"
      }
    ],
    title: "มอบหมายงาน",
    icon: "fas fa-file-invoice"
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
    href: "/error"
  }
];
