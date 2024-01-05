import ptBR from "date-fns/locale/pt-BR";
import { formatDistanceToNow } from "date-fns";

export const calculatePastTime = (date: string) => {
  const currentDate = new Date(date);

  const pastTimes = formatDistanceToNow(currentDate, {
    locale: ptBR,
    addSuffix: true,
  });

  return pastTimes;
};
