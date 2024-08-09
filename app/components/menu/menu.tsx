"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./menu.module.scss";

const navItems = [
  { href: "/dashboard", defaultSrc: "/home-default.svg", altSrc: "/home-not-default.svg", label: "Home", width: 24, height: 24 },
  { href: "/briefs", defaultSrc: "/briefs-default.svg", altSrc: "/briefs-not-default.svg", label: "Briefs", width: 34, height: 34 },
  { href: "/copilot", src: "/assistant.svg", label: "Assistant", width: 24, height: 24 }
];

const Sidebar = () => {
  const currentRoute = usePathname();

  return (
    <div className={`relative z-50 ${styles.container}`}>
      <div className={`fixed ${styles.navbar}`}>
        <div className={styles.menuItems}>
          {navItems.map(({ href, defaultSrc, altSrc, src, label, width, height }) => {
            const imageSrc = currentRoute.startsWith(href)
              ? (defaultSrc || src) ?? ""
              : (altSrc || src) ?? "";

            return (
              <Link key={href} href={href} className={styles.navItem}>
                <div className={styles.iconContainer}>
                  <Image
                    src={imageSrc}
                    alt={label}
                    width={width}
                    height={height}
                    className={styles.icon}
                  />
                  <span
                    className={`${styles["nav-text"]} ${
                      currentRoute.startsWith(href)
                        ? styles.activeNavText
                        : styles.inactiveNavText
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.settingWrapper}>
          <Link href="/settings" className={styles.navItem}>
            <div className={styles.iconContainer}>
              <Image
                src="/setting.svg"
                alt="Settings"
                width={34}
                height={34}
                className={styles.icon}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
