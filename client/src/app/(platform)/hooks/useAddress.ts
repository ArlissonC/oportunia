import { removeSpecialCharacters } from "@/constants/string";
import { addressService } from "@/services/address";
import { Address } from "@/services/address/types";
import { addressSchema } from "@/validation/yup/profile";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export type AddressFormValues = {
  id: string;
  cep: string;
  state: string;
  street: string;
  city: string;
  neighborhood: string;
  number: string;
};

export const useAddress = () => {
  const updateAddressMutation = useMutation<string, Error, Address>(
    addressService.updateAddress,
  );
  const queryClient = useQueryClient();

  const formik = useFormik<AddressFormValues>({
    initialValues: {
      id: "",
      cep: "",
      city: "",
      neighborhood: "",
      number: "",
      state: "",
      street: "",
    },
    validationSchema: addressSchema,
    onSubmit: async (fields) => {
      const address = {
        id: fields.id,
        cep: removeSpecialCharacters(fields.cep),
        city: fields.city,
        neighborhood: fields.neighborhood,
        number: fields.number,
        state: fields.state,
        street: fields.street,
      };

      await handleUpdateAddress(address);
    },
  });

  const { data: address, isLoading: isLoadingCompanyAddress } = useQuery(
    "address",
    addressService.getAddressByUser,
    {
      refetchOnWindowFocus: false,
      staleTime: 600000,
    },
  );

  const handleUpdateAddress = async (params: Address) => {
    updateAddressMutation.mutate(params, {
      onSuccess: async (message) => {
        queryClient.invalidateQueries("address");
        toast.success(message);
      },
    });
  };

  useEffect(() => {
    if (address) {
      const { cep, city, neighborhood, number, state, street, id } = address;
      address;
      formik.setValues({
        cep,
        city,
        neighborhood,
        number,
        state,
        street,
        id,
      });
    }
  }, [address]);

  return { address, formik };
};
