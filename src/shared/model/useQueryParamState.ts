import { useSearchParams, useRouter } from "next/navigation";

export const useQueryParamState = (
  paramName: string,
  defaultValue: string | number,
  basePath?: string,
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get(paramName) || defaultValue;

  // 파라미터 값 업데이트 함수
  const updateValue = (newValue: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, newValue.toString());
    router.push(`${basePath || window.location.pathname}?${params.toString()}`);
  };

  return {
    value,
    updateValue,
  };
};
