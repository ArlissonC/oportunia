"use client";

import { ReactNode } from "react";
import { FaUser, FaUserCircle, FaUserShield } from "react-icons/fa";
import classNames from "classnames";
import Link from "next/link";
import { FaMapLocationDot } from "react-icons/fa6";
import { ImUserTie } from "react-icons/im";
import { IoIosBusiness } from "react-icons/io";
import { MdNoAccounts } from "react-icons/md";
import { useSelectedLayoutSegment } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { GoUpload } from "react-icons/go";
import { useProfilePhoto } from "../hooks/useProfilePhoto";

interface ProfileLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

const ProfileLayout = ({ children, imageUrl }: ProfileLayoutProps) => {
  const {
    state: { isCandidate },
  } = useAuthStore();
  const activeSegment = useSelectedLayoutSegment();
  const { handleUpdateProfilePhoto, handleUpdateProfileLogo } =
    useProfilePhoto();

  const menu = [
    {
      label: "Perfil",
      href: isCandidate ? "/candidate/profile" : "/company/profile",
      Icon: isCandidate ? FaUser : IoIosBusiness,
      targetSegment: null,
    },
    {
      label: "Endereço",
      href: isCandidate
        ? "/candidate/profile/address"
        : "/company/profile/address",
      Icon: FaMapLocationDot,
      targetSegment: "address",
    },
    {
      label: "Experiências Profissionais",
      href: "/candidate/profile/professional-experiences",
      Icon: ImUserTie,
      targetSegment: "professional-experiences",
      hidden: !isCandidate,
    },
    {
      label: "Dados de login",
      href: isCandidate
        ? "/candidate/profile/login-data"
        : "/company/profile/login-data",
      Icon: FaUserShield,
      targetSegment: "login-data",
    },
    // {
    //   label: "Encerrar conta",
    //   href: isCandidate
    //     ? "/candidate/profile/close-account"
    //     : "/company/profile/close-account",
    //   Icon: MdNoAccounts,
    //   targetSegment: "close-account",
    // },
  ];

  return (
    <section className="flex gap-4 text-white flex-col md:flex-row">
      <div className="py-8 bg-brand-primary rounded-2.5xl md:max-w-xs w-full">
        <label htmlFor="photo-input">
          {!imageUrl ? (
            <div className="group w-32 h-32 flex items-center justify-center relative mx-auto hover:border-brand-tertiary hover:border-2 rounded-full mb-10 cursor-pointer">
              <FaUserCircle className="text-9xl text-brand-secondary group-hover:opacity-40 z-10 absolute" />
              <GoUpload className="text-4xl text-brand-tertiary hidden group-hover:block z-20 absolute" />
            </div>
          ) : (
            <div className="group w-32 h-32 flex items-center justify-center relative mx-auto rounded-full mb-10 cursor-pointer">
              <img
                src={imageUrl}
                alt="Imagem perfil"
                className="group-hover:opacity-40 z-10 absolute w-32 h-32 rounded-full"
              />
              <GoUpload className="text-4xl text-white hidden group-hover:block z-20 absolute" />
            </div>
          )}
        </label>
        <input
          type="file"
          onChange={(e) =>
            isCandidate
              ? handleUpdateProfilePhoto(e.target.files![0])
              : handleUpdateProfileLogo(e.target.files![0])
          }
          accept="image/jpeg, image/png"
          id="photo-input"
          className="hidden"
        />

        <div className="flex flex-col gap-3 pl-14">
          {menu.map(({ Icon, href, label, targetSegment, hidden }) => (
            <Link
              key={label}
              href={href}
              className={classNames({
                "text-white p-3": true,
                "bg-brand-tertiary rounded-l-lg":
                  activeSegment === targetSegment,
                hidden: hidden,
              })}
            >
              <div className="flex items-center gap-4">
                <Icon className="text-lg" />
                <span className="text-sm">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="py-8 px-8 bg-brand-primary rounded-2.5xl w-full">
        {children}
      </div>
    </section>
  );
};

export default ProfileLayout;
