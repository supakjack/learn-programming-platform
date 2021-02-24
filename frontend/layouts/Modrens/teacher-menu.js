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
    icon: "fa fa-download"

    // child: [{ title: "หน้าหลัก", href: "/home" }],
  },
  {
    child: [
      {
        title: "มอบหมาย",
        href: "/assignment?tab=assignment",
        icon: "fa fa-download"
      },
      {
        title: "ผู้ใช้งาน",
        href: "/assignment?tab=user",
        icon: "fa fa-download"
      }
    ],
    title: "มอบหมายงาน",
    icon: "fa fa-download"
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
        icon: "fa fa-download"
      }
    ],
    title: "จัดการโจทย์ปัญหา",
    icon: "fa fa-download"
  },
  {
    title: "IDE",
    href: "/ide",
    icon: "fa fa-download"
  },
  {
    title: "Dashboard ",
    icon: "fa fa-download",
    href: "/error"
  }
];
