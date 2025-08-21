import FeaturesHeader from "@/components/features/FeaturesHeader";
import FeaturesTable from "@/components/features/FeaturesTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getFeatures, FeaturesResponse } from "@/api/featuresApp/getFeatures";
import Loading from "@/components/general/Loading";

const FeaturesPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const perPage = 15;

  const { data, isLoading, error, refetch } = useQuery<FeaturesResponse, Error>({
    queryKey: ["features", currentPage, perPage],
    queryFn: () => getFeatures(currentPage, perPage),
    placeholderData: keepPreviousData,
  });


  if (isLoading) return <Loading />;
  if (error) return <div>Error loading features: {String(error.message)}</div>;

  return (
    <div className="md:px-8 px-2">
      <FeaturesHeader />
      <FeaturesTable features={data?.data ?? []} refetch={refetch} />
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={data?.last_page ?? 1}
        totalItems={data?.total ?? 0}
        itemsPerPage={data?.per_page ?? perPage}
        from={data?.from ?? 0}
        to={data?.to ?? 0}
      />
    </div>
  );
};

export default FeaturesPage;
