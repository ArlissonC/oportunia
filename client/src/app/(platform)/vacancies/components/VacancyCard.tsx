import Link from "next/link";
import { FaCloud, FaDatabase } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { RiCodeView } from "react-icons/ri";
import { TbNetwork } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { LuBrainCog } from "react-icons/lu";
import {
  VacancyArea,
  VacancyModality,
  VacancyType,
} from "@/services/vacancy/types";
import { convertCurrency } from "@/constants/currency";
import { calculatePastTime } from "@/constants/date";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";

interface VacancyCardProps {
  vacancy: {
    id: string;
    type: number;
    createdAt: string;
    title: string;
    salary?: number | null;
    modality: number;
    location: string;
    area: number;
    companyName: string;
    userCreatedOrAppliedVacancy: boolean;
  };
}

const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  const {
    state: { isUserLogged, isCandidate },
  } = useAuthStore();
  const searchParams = useSearchParams();
  const vacancyId = searchParams.get("currentVacancy");

  return (
    <Link
      scroll={false}
      href={`/vacancies?currentVacancy=${vacancy.id}`}
      className={classNames({
        "max-w-full w-[26.25rem] py-2 px-4 bg-white rounded-xl border-l-4 border-brand-tertiary flex flex-col gap-2 text-slate-700 h-fit":
          true,
        "border-b-4": vacancyId === vacancy.id,
      })}
    >
      <div className="flex justify-between items-center text-xs font-medium">
        <span>Tipo: {VacancyType[vacancy.type]}</span>
        <span>{calculatePastTime(vacancy.createdAt)}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{vacancy.title}</h3>
      <div className="flex flex-col text-sm font-medium border-b pb-3">
        <span>{vacancy.companyName}</span>
        <span>
          {vacancy.salary !== null ? convertCurrency(vacancy.salary!) : null}
        </span>
        {isUserLogged && vacancy.userCreatedOrAppliedVacancy && (
          <span className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-brand-tertiary w-fit mt-1">
            {isCandidate ? "Inscrito" : "Sua vaga"}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <FaMapLocation />
          <span>
            {VacancyModality[vacancy.modality]}{" "}
            {vacancy.location && `- ${vacancy.location}`}
          </span>
        </div>
        <span>|</span>
        <div className="flex items-center gap-2">
          {vacancy.area === 0 && <RiCodeView />}
          {vacancy.area === 3 && <FaCloud />}
          {vacancy.area === 1 && <FaDatabase />}
          {vacancy.area === 2 && <TbNetwork />}
          {vacancy.area === 4 && <MdOutlineSupportAgent />}
          {vacancy.area === 5 && <LuBrainCog />}
          <span>{VacancyArea[vacancy.area]}</span>
        </div>
      </div>
    </Link>
  );
};

export default VacancyCard;
