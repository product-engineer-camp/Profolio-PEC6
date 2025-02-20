import { useSearchParams, useRouter } from "next/navigation";

export const useProfileCreateStep = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 1;

  const updateStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep.toString());
    router.push(`/profiles/create?${params.toString()}`);
  };

  return {
    currentStep,
    updateStep,
  };
};
