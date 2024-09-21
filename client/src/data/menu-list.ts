import {
  User,
  UserCheck,
  Settings,
  Trophy,
  Rocket,
  CreditCard,
  Search,
  History,
  ChartLine,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/strona-glowna",
          label: "Strona główna",
          active: pathname.includes("/strona-glowna"),
          icon: User,
          submenus: [],
        },
      ],
    },
   
    {
      groupLabel: "Kontent",
      menus: [
        {
          href: "/Moje-subskrybcje",
          label: "Moje subskrybcje",
          active: pathname.includes("/Moje-subskrybcje"),
          icon: UserCheck,
          submenus: [],
        },
        {
          href: "/ulubione-oferty",
          label: "Ulubione oferty",
          active: pathname.includes("/Moje-subskrybcje"),
          icon: UserCheck,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Finanse",
      menus: [
        {
          href: "/dodaj-kartę",
          label: "Dodaj kartę",
          active: pathname.includes("/dodaj-kartę"),
          icon: CreditCard,
          submenus: [],
        },
        {
          href: "/Moje-statystyki",
          label: "Moje statystyki",
          active: pathname.includes("/moje-statystyki"),
          icon: ChartLine,
          submenus: [],
        },
        {
          href: "/Historia-zakupów",
          label: "Historia zakupów",
          active: pathname.includes("/historia-zakupów"),
          icon: History,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Zarządzanie",
      menus: [
        {
          href: "/ustawienia",
          label: "Ustawienia",
          active: pathname.includes("/ustawienia"),
          icon: Settings,
          submenus: [
            {
              href: "/panel-admina",
              label: "Panel Admina",
              active: pathname === "/panel-admina",
            },
            {
              href: "/posts/new",
              label: "New Post",
              active: pathname === "/posts/new",
            },
          ],
        },
      ],
    },
  ];
}
