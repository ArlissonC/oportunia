"use client";

import { FaUserCircle } from "react-icons/fa";
import { useCandidateProfile } from "../hooks/useCandidateProfile";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaLink,
  FaWhatsapp,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationPin, MdOutlineAttachMoney } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { convertCurrency } from "@/constants/currency";
import Bg from "@/assets/candidate-bg.png";
import { CandidateLevel } from "@/services/candidate/types";
import PdfIcon from "@/assets/pdf-icon.svg";
import Image from "next/image";
import { format } from "date-fns";
import CandidateProfileSkeleton from "@/components/skeletons/CandidateProfileSkeleton";

const Candidate = () => {
  const { candidateProfile, isLoadingCandidateProfile, error } =
    useCandidateProfile();

  if (isLoadingCandidateProfile) return <CandidateProfileSkeleton />;
  if (error)
    return (
      <p className="text-3xl text-center font-semibold text-white">
        Ops, parece que o candidato não foi encontrado desta vez. 🫣
      </p>
    );

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
          {!candidateProfile?.candidateData.photo ? (
            <FaUserCircle className="mx-auto text-[11.25rem] text-brand-primary self-center" />
          ) : (
            <div className="w-[11.25rem] h-[11.25rem] rounded-full bg-brand-primary flex justify-center items-center overflow-hidden">
              <img src={candidateProfile?.candidateData.photo} alt="" />
            </div>
          )}
        </div>
        <p className="text-3xl font-semibold">
          {candidateProfile?.candidate.name}
        </p>
        <p className="text-xl font-medium">
          {candidateProfile?.candidateData.jobPosition}
        </p>
        <div className="flex text-3xl gap-3 mt-4">
          {candidateProfile?.candidateData.linkedinUrl && (
            <a
              href={candidateProfile.candidateData.linkedinUrl}
              target="_blank"
            >
              <FaLinkedin />
            </a>
          )}
          {candidateProfile?.candidateData.instagramUrl && (
            <a
              href={candidateProfile.candidateData.instagramUrl}
              target="_blank"
            >
              <FaInstagram />
            </a>
          )}
          {candidateProfile?.candidateData.gitHubUrl && (
            <a href={candidateProfile.candidateData.gitHubUrl} target="_blank">
              <FaGithub />
            </a>
          )}
          {candidateProfile?.candidateData.portfolioUrl && (
            <a
              href={candidateProfile.candidateData.portfolioUrl}
              target="_blank"
            >
              <FaLink />
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="my-2">
          <h2 className="font-semibold text-2xl">Apresentação:</h2>
          <p>{candidateProfile?.candidateData.presentation}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Contato:</h2>
          <div className="flex gap-2 items-center">
            <IoMdMail className="text-2xl" />
            <p>{candidateProfile?.candidate.email}</p>
          </div>
          <div className="flex gap-2 items-center">
            <FaWhatsapp className="text-2xl" />
            {candidateProfile?.candidate.phoneNumber ? (
              <p>{candidateProfile?.candidate.phoneNumber}</p>
            ) : (
              <p>Sem número cadastrado</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Informações:</h2>
          <div className="flex gap-2 items-center">
            <MdOutlineAttachMoney className="text-2xl" />
            <p>
              <span className="font-semibold"> Pretensão salarial: </span>
              {candidateProfile?.candidateData.salaryExpectation ? (
                convertCurrency(
                  candidateProfile?.candidateData.salaryExpectation!,
                )
              ) : (
                <p>Não informado</p>
              )}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MdLocationPin className="text-2xl" />
            <p>
              <span className="font-semibold">Localização:</span>{" "}
              {candidateProfile?.address.city} -{" "}
              {candidateProfile?.address.state}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <FaUserTie className="text-xl" />
            <p>
              <span className="font-semibold">Senioridade: </span>
              {CandidateLevel[candidateProfile?.candidateData.level!]}
            </p>
          </div>
          {candidateProfile?.candidateData.curriculum && (
            <a
              href={candidateProfile?.candidateData.curriculum!}
              target="_blank"
              className="flex gap-2 items-center mt-4"
            >
              <Image src={PdfIcon} width={25} height={25} alt="PDF Icon" />
              <p>Clique para acessar currículo</p>
            </a>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-2xl">Experiência Profissional:</h2>
          {candidateProfile?.professionalExperiences.length! > 0 ? (
            candidateProfile?.professionalExperiences.map((pe) => (
              <div
                key={pe.id}
                className="py-8 px-7 bg-white rounded-lg border-l-4 border-brand-tertiary text-gray-800"
              >
                <ul className="leading-7">
                  <li>
                    <span className="font-semibold">Empresa: </span>{" "}
                    {pe.company}
                  </li>
                  <li>
                    <span className="font-semibold">Cargo: </span>
                    {pe.jobPosition}
                  </li>
                  <li>
                    <span className="font-semibold">Período: </span>
                    {format(new Date(pe.startDate), "dd/MM/yyyy")} -{" "}
                    {pe.endDate
                      ? format(new Date(pe.endDate), "dd/MM/yyyy")
                      : "Atual"}
                  </li>
                  <li>
                    <span className="font-semibold">
                      Descrição das atividades:{" "}
                    </span>
                    {pe.description}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>Sem experiências cadastradas</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Candidate;
