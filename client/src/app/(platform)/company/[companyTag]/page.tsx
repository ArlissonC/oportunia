"use client";

import {
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaUserCircle,
  FaWhatsapp,
} from "react-icons/fa";
import Bg from "@/assets/company-bg.png";
import { IoMdMail } from "react-icons/io";
import { useCompanyProfile } from "../../hooks/useCompanyProfile";
import Link from "next/link";

const Company = () => {
  const { companyProfile } = useCompanyProfile();

  return (
    <section className="text-white">
      <div
        className="flex justify-center flex-col items-center mb-10 h-96 rounded-xl"
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col gap-2 items-center mb-4">
          {!companyProfile?.logoUrl ? (
            <FaUserCircle className="mx-auto text-[11.25rem] text-brand-primary self-center" />
          ) : (
            <div className="w-[11.25rem] h-[11.25rem] rounded-full bg-brand-primary flex justify-center items-center overflow-hidden">
              <img src={companyProfile.logoUrl} alt="" />
            </div>
          )}
        </div>
        <p className="text-3xl font-semibold">{companyProfile?.companyName}</p>
        <div className="flex text-3xl gap-3 mt-4">
          {companyProfile?.linkedinUrl && (
            <a href={companyProfile.linkedinUrl} target="_blank">
              <FaLinkedin />
            </a>
          )}
          {companyProfile?.instagramUrl && (
            <a href={companyProfile.instagramUrl} target="_blank">
              <FaInstagram />
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="my-2">
          <h2 className="font-semibold text-2xl">Sobre a empresa:</h2>
          <p>{companyProfile?.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Contato:</h2>
          <div className="flex gap-2 items-center">
            <IoMdMail className="text-2xl" />
            <p>{companyProfile?.email}</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaWhatsapp className="text-2xl" />
            {companyProfile?.phoneNumber ? (
              <p>{companyProfile?.phoneNumber}</p>
            ) : (
              <p>Sem número cadastrado</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Vagas ativas:</h2>
          {companyProfile?.activeVacancies?.length! > 0 ? (
            <div className="flex flex-col gap-1">
              {companyProfile?.activeVacancies.map((av) => (
                <Link
                  href={`/vacancies?currentVacancy=${av.id}`}
                  key={av.id}
                  className="font-medium text-white flex items-center gap-2 text-lg"
                >
                  <FaLink />
                  <span>{av.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p>Sem experiências cadastradas</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Company;
